import { supabase } from "../../lib/supabase";

// One doodle on the wall: only "wall-safe" info (never the private note).
export type WallDoodle = {
  id: string;
  createdAt: string;
  name: string | null; // null = the visitor chose not to show their name
  imageUrl: string;
};

// Loads approved doodles, newest first.
// We never have to filter by `approved` here: the database's security
// policy already hides everything that isn't approved.
export async function fetchWall(): Promise<WallDoodle[]> {
  const { data, error } = await supabase
    .from("guestbook_entries")
    // Only the columns visitors are allowed to read (see 002_guestbook_privacy.sql).
    .select("id, created_at, public_name, doodle_path")
    .not("doodle_path", "is", null) // skip note-only entries
    .order("created_at", { ascending: false })
    .limit(60);

  if (error) throw new Error(`Loading the wall failed: ${error.message}`);

  // Turn each row into what the wall needs, including the image's public link.
  return (data ?? []).map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    name: row.public_name,
    imageUrl: supabase.storage.from("doodles").getPublicUrl(row.doodle_path)
      .data.publicUrl,
  }));
}
