-- =====================================================================
-- SebikaOS guestbook: table, doodle storage, and security rules.
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- (Kept in the repo so you always have a record of how the database is set up.)
-- =====================================================================


-- 1) THE TABLE: one row per guestbook entry ---------------------------

create table public.guestbook_entries (
  -- A random unique ID for each entry, made by the database.
  id          uuid primary key default gen_random_uuid(),

  -- When it was sent, filled in automatically.
  created_at  timestamptz not null default now(),

  -- The visitor's name: 1–40 characters (spaces alone don't count).
  name        text not null
              check (char_length(trim(name)) between 1 and 40),

  -- Their note: 1–280 characters, like a tweet.
  message     text not null
              check (char_length(trim(message)) between 1 and 280),

  -- Optional: the file name of their doodle in storage, e.g.
  -- "3f2a…-….png". Must look exactly like <random id>.png, so nobody can
  -- point it at some other file.
  doodle_path text
              check (doodle_path is null
                     or doodle_path ~ '^[0-9a-f-]{36}\.png$'),

  -- Hidden until YOU flip this to true in the Table Editor.
  approved    boolean not null default false
);


-- 2) WHO CAN TOUCH THE TABLE ------------------------------------------
-- "anon" = any visitor to your website (they use the public anon key).

-- Turn on Row Level Security: from now on, every read/write must pass a policy.
alter table public.guestbook_entries enable row level security;

-- Visitors may READ rows (the policy below limits which ones)...
grant select on public.guestbook_entries to anon;

-- ...and ADD rows, but only these three columns. They can't choose the id,
-- the date, or — most importantly — `approved`, so it always starts false.
grant insert (name, message, doodle_path) on public.guestbook_entries to anon;

-- No update or delete grants at all → visitors can never edit or remove entries.


-- 3) THE POLICIES (row-by-row rules) ----------------------------------

-- Visitors only ever see approved entries.
create policy "Visitors can read approved entries"
  on public.guestbook_entries
  for select
  to anon
  using (approved = true);

-- Visitors can add entries, and new entries must be unapproved.
create policy "Visitors can add unapproved entries"
  on public.guestbook_entries
  for insert
  to anon
  with check (approved = false);


-- 4) DOODLE STORAGE ---------------------------------------------------
-- A storage "bucket" is like a folder for files.
--   public = true            → approved doodles can be shown with a plain link
--   file_size_limit = 512 KB → no huge uploads
--   allowed_mime_types       → PNG images only

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('doodles', 'doodles', true, 524288, array['image/png']);

-- Visitors may upload into the doodles bucket only, and only files named
-- <random id>.png. They can't overwrite, edit, or delete anything.
create policy "Visitors can upload doodles"
  on storage.objects
  for insert
  to anon
  with check (
    bucket_id = 'doodles'
    and name ~ '^[0-9a-f-]{36}\.png$'
  );
