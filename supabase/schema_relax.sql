-- Run this in Supabase: SQL Editor > New query > paste > Run
-- This allows both Hotel Shyadri (id = 1) and Hotel Relax (id = 2) to store their configs.

alter table public.site_config drop constraint if exists site_config_id_check;

-- Optional: If you prefer a check constraint for only id 1 and 2:
-- alter table public.site_config add constraint site_config_id_check check (id in (1, 2));
