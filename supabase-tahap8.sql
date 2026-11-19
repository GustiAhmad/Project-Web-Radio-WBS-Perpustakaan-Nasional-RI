-- =====================================================================
-- TAHAP 8 — Identitas pengelola, On-Air Personalities, dan aset gambar
-- =====================================================================
-- Dijalankan pada proyek Supabase produksi menggunakan Supabase CLI:
--   supabase db query --remote --file supabase-tahap8.sql --yes
--
-- Fokus: login nama pengguna/surel, foto profil, poster acara, gambar seri,
-- foto penyiar, bucket Storage publik, dan RPC pencarian akun untuk login.

-- ---------------------------------------------------------------------
-- 1. Kolom identitas tambahan pada tabel pengguna
-- ---------------------------------------------------------------------
alter table public.pengguna
  add column if not exists nama_pengguna text,
  add column if not exists foto_url text;

-- Backfill dari bagian lokal surel. Dua akun existing punya bagian lokal unik.
update public.pengguna
set nama_pengguna = regexp_replace(split_part(email, '@', 1), '[^a-zA-Z0-9._]', '', 'g')
where nama_pengguna is null or btrim(nama_pengguna) = '';

-- Jika masih kosong (misal surel aneh), pakai turunan id agar tetap unik.
update public.pengguna
set nama_pengguna = 'pengguna-' || replace(left(id::text, 8), '-', '')
where nama_pengguna is null or btrim(nama_pengguna) = '';

alter table public.pengguna
  alter column nama_pengguna set not null;

create unique index if not exists pengguna_nama_pengguna_unik
  on public.pengguna (lower(nama_pengguna));

-- ---------------------------------------------------------------------
-- 2. Tabel On-Air Personalities
-- ---------------------------------------------------------------------
create table if not exists public.penyiar (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  slug text not null unique,
  foto_url text,
  bio text,
  urutan integer not null default 0,
  aktif boolean not null default true,
  dibuat_oleh uuid references public.pengguna (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists penyiar_aktif_urutan_idx
  on public.penyiar (aktif, urutan);

alter table public.penyiar enable row level security;

drop policy if exists "Publik dapat melihat penyiar aktif" on public.penyiar;
create policy "Publik dapat melihat penyiar aktif"
  on public.penyiar for select
  to anon, authenticated
  using (aktif = true);

drop policy if exists "Staf dapat mengelola penyiar" on public.penyiar;
create policy "Staf dapat mengelola penyiar"
  on public.penyiar for all
  to authenticated
  using (
    exists (
      select 1 from public.pengguna p
      where p.auth_user_id = auth.uid() and p.status_aktif = true
    )
  )
  with check (
    exists (
      select 1 from public.pengguna p
      where p.auth_user_id = auth.uid() and p.status_aktif = true
    )
  );

-- ---------------------------------------------------------------------
-- 3. RPC resolusi identitas login (nama pengguna -> surel)
--    Hanya mengembalikan surel akun pengelola yang masih aktif.
-- ---------------------------------------------------------------------
create or replace function public.cari_email_pengguna(p_identifikator text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select email
  from public.pengguna
  where status_aktif = true
    and (
      lower(btrim(nama_pengguna)) = lower(btrim(p_identifikator))
      or lower(btrim(email)) = lower(btrim(p_identifikator))
    )
  order by case when lower(btrim(nama_pengguna)) = lower(btrim(p_identifikator)) then 0 else 1 end
  limit 1;
$$;

revoke all on function public.cari_email_pengguna(text) from public;
grant execute on function public.cari_email_pengguna(text) to anon, authenticated;

-- ---------------------------------------------------------------------
-- 4. Bucket Storage publik untuk poster, sampul, foto, dan lampiran profil
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'aset-wbs',
  'aset-wbs',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Publik dapat melihat aset WBS" on storage.objects;
create policy "Publik dapat melihat aset WBS"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'aset-wbs');

drop policy if exists "Staf dapat mengunggah aset WBS" on storage.objects;
create policy "Staf dapat mengunggah aset WBS"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'aset-wbs'
    and exists (
      select 1 from public.pengguna p
      where p.auth_user_id = auth.uid() and p.status_aktif = true
    )
  );

drop policy if exists "Staf dapat memperbarui aset WBS" on storage.objects;
create policy "Staf dapat memperbarui aset WBS"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'aset-wbs'
    and exists (
      select 1 from public.pengguna p
      where p.auth_user_id = auth.uid() and p.status_aktif = true
    )
  )
  with check (
    bucket_id = 'aset-wbs'
    and exists (
      select 1 from public.pengguna p
      where p.auth_user_id = auth.uid() and p.status_aktif = true
    )
  );

drop policy if exists "Staf dapat menghapus aset WBS" on storage.objects;
create policy "Staf dapat menghapus aset WBS"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'aset-wbs'
    and exists (
      select 1 from public.pengguna p
      where p.auth_user_id = auth.uid() and p.status_aktif = true
    )
  );

-- ---------------------------------------------------------------------
-- 5. Verifikasi ringkas
-- ---------------------------------------------------------------------
-- select column_name from information_schema.columns
-- where table_schema='public' and table_name='pengguna'
--   and column_name in ('nama_pengguna','foto_url');
-- select id, public from storage.buckets where id='aset-wbs';
-- select cari_email_pengguna('nama-penggunaexisting');
