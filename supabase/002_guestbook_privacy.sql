-- =====================================================================
-- SebikaOS guestbook, change #2: keep notes private, make names optional.
--
-- After this:
--   • notes (message) are only visible to you, in the dashboard
--   • the name is optional
--   • a name is shown on the wall only if the visitor ticks
--     "show my name" (it's then copied into public_name)
-- =====================================================================


-- 1) Name becomes optional (but if given, still 1–40 characters) -------

alter table public.guestbook_entries
  alter column name drop not null;

-- Swap the old "name is required" check for "name is optional".
-- (guestbook_entries_name_check is the name Postgres gave the old check.)
alter table public.guestbook_entries
  drop constraint guestbook_entries_name_check;

alter table public.guestbook_entries
  add constraint guestbook_entries_name_check
  check (name is null or char_length(trim(name)) between 1 and 40);


-- 2) public_name: filled in ONLY when the visitor chooses to show it ----
-- The check makes sure it can only ever be a copy of their own name.

alter table public.guestbook_entries
  add column public_name text
  check (public_name is null or public_name = name);


-- 3) Visitors may only read the "wall-safe" columns ---------------------
-- Before: visitors could read every column of approved rows (incl. message).
-- Now: they can read only these four. Asking for `message` or `name`
-- gets "permission denied" — enforced by the database, not the website.

revoke select on public.guestbook_entries from anon;
grant select (id, created_at, public_name, doodle_path)
  on public.guestbook_entries to anon;


-- 4) Visitors may also fill in public_name when adding an entry ---------

revoke insert on public.guestbook_entries from anon;
grant insert (name, message, doodle_path, public_name)
  on public.guestbook_entries to anon;

-- (The "only approved rows" and "new rows start unapproved" policies from
-- 001 stay exactly as they were.)
