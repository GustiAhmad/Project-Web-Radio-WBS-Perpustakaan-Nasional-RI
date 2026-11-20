-- Tahap 9 — Perbaikan hasil Review Gate 8.
-- Dijalankan sekali pada proyek produksi lewat Supabase CLI.

-- 1. Detail acara mendatang disiapkan untuk konversi ke episode.
alter table public.acara_mendatang
  add column if not exists moderator text not null default 'Belum tercatat',
  add column if not exists narasumber text not null default 'Belum tercatat',
  add column if not exists topik text not null default 'Siaran WBS',
  add column if not exists seri_id uuid references public.seri(id) on delete set null,
  add column if not exists durasi_detik integer not null default 0;

-- 2. Satu aturan unggah gambar untuk seluruh fitur: JPG/PNG, maksimal 2 MB.
update storage.buckets
set file_size_limit = 2097152,
    allowed_mime_types = array['image/jpeg', 'image/png']::text[]
where id in ('aset-wbs', 'laporan-error');

-- 3. Verifikasi ringkas.
select id, file_size_limit, allowed_mime_types
from storage.buckets
where id in ('aset-wbs', 'laporan-error')
order by id;
