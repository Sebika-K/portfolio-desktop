import { supabase } from "../../lib/supabase";

// Sends one guestbook entry to Supabase:
//   1. if there's a doodle, upload the image to the "doodles" storage bucket
//   2. add a row to the guestbook_entries table (it starts unapproved)
// Throws an Error if anything fails, so the form can show a message.
export async function sendEntry(entry: {
  name: string; // may be empty: names are optional
  showName: boolean; // did they tick "show my name with my doodle"?
  message: string;
  doodle: Blob | null;
}) {
  let doodlePath: string | null = null;

  if (entry.doodle) {
    // A random, unguessable file name. It must match the pattern the
    // storage policy allows: <36-character id>.png
    doodlePath = `${crypto.randomUUID()}.png`;

    const { error: uploadError } = await supabase.storage
      .from("doodles")
      .upload(doodlePath, entry.doodle, {
        contentType: "image/png",
        upsert: false, // never overwrite an existing file
      });
    if (uploadError) throw new Error(`Doodle upload failed: ${uploadError.message}`);
  }

  // Empty name → store nothing (null) instead of "".
  const name = entry.name.trim() || null;

  // The database fills in id, created_at, and approved = false by itself
  // (visitors aren't allowed to set those).
  // public_name is the ONLY name the wall can ever read, so it's only
  // filled in when the visitor chose to show it, and there's a doodle to show.
  const { error: insertError } = await supabase
    .from("guestbook_entries")
    .insert({
      name,
      public_name: entry.showName && name && doodlePath ? name : null,
      message: entry.message.trim(),
      doodle_path: doodlePath,
    });
  if (insertError) throw new Error(`Saving entry failed: ${insertError.message}`);
}
