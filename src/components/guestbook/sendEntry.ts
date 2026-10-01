import { supabase } from "../../lib/supabase";

// Sends one guestbook entry to Supabase:
//   1. if there's a doodle, upload the image to the "doodles" storage bucket
//   2. add a row to the guestbook_entries table (it starts unapproved)
// Throws an Error if anything fails, so the form can show a message.
export async function sendEntry(entry: {
  name: string;
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

  // Only these three columns: the database fills in id, created_at, and
  // approved = false by itself (visitors aren't allowed to set those).
  const { error: insertError } = await supabase
    .from("guestbook_entries")
    .insert({
      name: entry.name.trim(),
      message: entry.message.trim(),
      doodle_path: doodlePath,
    });
  if (insertError) throw new Error(`Saving entry failed: ${insertError.message}`);
}
