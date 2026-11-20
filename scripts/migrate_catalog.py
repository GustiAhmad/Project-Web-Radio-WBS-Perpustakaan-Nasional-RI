#!/usr/bin/env python3
"""Migrasi katalog YouTube WBS menjadi berkas SQL INSERT untuk Supabase.

Sumber:
  - metadata_youtube.csv (507 baris mentah, 337 publik, 331 unik)
  - docs/02-peta-konten-dan-taksonomi.md (judul baku, tanggal, durasi, topik)

Output:
  - supabase/migrations/001-catalog-insert.sql

Tidak memerlukan service_role key. SQL dijalankan manual di Supabase SQL Editor.
"""

import csv
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "scripts" / "data" / "metadata_youtube.csv"
DOC_PATH = ROOT / "docs" / "02-peta-konten-dan-taksonomi.md"
OUT_PATH = ROOT / "supabase/migrations/001-catalog-insert.sql"

BULAN = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "Mei": 5, "Jun": 6,
    "Jul": 7, "Agu": 8, "Sep": 9, "Okt": 10, "Nov": 11, "Des": 12,
}

SERI = [
    ("LibTalk", "libtalk", "layanan_perpustakaan"),
    ("SUPER MORNING", "super-morning", "layanan_perpustakaan"),
    ("Bimbingan Pemustaka & Literasi Informasi", "bimbingan-pemustaka-literasi-informasi", "layanan_perpustakaan"),
    ("Sosialisasi Program & Layanan Perpusnas", "sosialisasi-program-layanan-perpusnas", "layanan_perpustakaan"),
    ("LibTalk Reference Series", "libtalk-reference-series", "layanan_perpustakaan"),
    ("Kunjungan Virtual ke Perpusnas", "kunjungan-virtual-ke-perpusnas", "layanan_perpustakaan"),
    ("AP PASTI Menyapa", "ap-pasti-menyapa", "layanan_perpustakaan"),
    ("SUDUT INSPIRASI", "sudut-inspirasi", "layanan_perpustakaan"),
    ("DP on Podcast", "dp-on-podcast", "layanan_perpustakaan"),
    ("Seri Pengantar Teori Ilmu Perpustakaan, Arsip, dan Museum", "pengantar-teori-ilmu-perpustakaan-arsip-museum", "layanan_perpustakaan"),
    ("Diskusi Naskah Nusantara", "diskusi-naskah-nusantara", "naskah_nusantara"),
    ("FGD IKON", "fgd-ikon", "naskah_nusantara"),
    ("Penggalian Potensi Naskah Kuno Nusantara", "penggalian-potensi-naskah-kuno-nusantara", "naskah_nusantara"),
    ("Kelas Literasi Naskah Nusantara", "kelas-literasi-naskah-nusantara", "naskah_nusantara"),
    ("PESONA NUSANTARA", "pesona-nusantara", "naskah_nusantara"),
    ("Naskah Kuno Indonesia Menuju Ingatan Dunia", "naskah-kuno-indonesia-menuju-ingatan-dunia", "naskah_nusantara"),
    ("Kelas Literasi Siniar", "kelas-literasi-siniar", "literasi_keluarga"),
    ("CERITA BUKI", "cerita-buki", "literasi_keluarga"),
    ("NGOPI SENSASI", "ngopi-sensasi", "literasi_keluarga"),
    ("Diskusi JASMERAH", "diskusi-jasmerah", "sejarah_kebudayaan"),
    ("Gelarwicara", "gelarwicara", "sejarah_kebudayaan"),
    ("Lainnya", "lainnya", "semua_kategori"),
]

SLUG_SERI = {nama: slug for nama, slug, _ in SERI}
KATEGORI_SERI = {nama: kat for nama, _, kat in SERI}

LABEL_KATEGORI = {
    "layanan_perpustakaan": "Layanan Perpustakaan",
    "naskah_nusantara": "Naskah Nusantara",
    "literasi_keluarga": "Literasi dan Keluarga",
    "sejarah_kebudayaan": "Sejarah dan Kebudayaan",
    "semua_kategori": "Lainnya",
}

ENUM_TOPIK_LAINNYA = {
    "Layanan": "layanan_perpustakaan",
    "Naskah": "naskah_nusantara",
    "Literasi": "literasi_keluarga",
    "Sejarah": "sejarah_kebudayaan",
}


def tanggal_doc(nilai):
    m = re.match(r"(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})", nilai.strip())
    if not m:
        return None
    hari, bulan, tahun = int(m.group(1)), BULAN.get(m.group(2).title()), int(m.group(3))
    if not bulan:
        return None
    return f"{tahun:04d}-{bulan:02d}-{hari:02d}"


def durasi_doc_ke_detik(nilai):
    s = nilai.strip().lower()
    jam = re.search(r"(\d+)\s*j", s)
    menit = re.search(r"(\d+)\s*m", s)
    hari = re.search(r"(\d+)\s*d", s)
    return (
        (int(jam.group(1)) if jam else 0) * 3600
        + (int(menit.group(1)) if menit else 0) * 60
        + (int(hari.group(1)) if hari else 0)
    )


def durasi_iso_ke_detik(nilai):
    m = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", nilai or "")
    if not m:
        return 0
    return int(m.group(1) or 0) * 3600 + int(m.group(2) or 0) * 60 + int(m.group(3) or 0)


def sql_str(nilai):
    return "'" + str(nilai).replace("'", "''") + "'"


def slugify(nilai):
    s = nilai.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:200] or "video"


def bersihkan_deskripsi(nilai):
    s = (nilai or "").strip()
    s = re.sub(r"https?://\S+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s[:800]


def baca_csv():
    with CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        baris = list(csv.DictReader(f))

    terlihat = set()
    hasil = []
    for r in baris:
        if r["status_privasi"].strip().lower() != "public":
            continue
        vid = r["video_id"].strip()
        if not vid or vid in terlihat:
            continue
        terlihat.add(vid)
        hasil.append(r)
    return hasil


def baca_peta_dokumen():
    peta = defaultdict(list)
    seri_saat_ini = None
    with DOC_PATH.open(encoding="utf-8") as f:
        for baris in f:
            m = re.match(r"### 6\.\d+\s+(.+?)\s*\(", baris)
            if m:
                seri_saat_ini = m.group(1).strip()
                continue
            if baris.startswith("## 7."):
                seri_saat_ini = "Lainnya"
                continue
            if baris.startswith("## 8."):
                seri_saat_ini = None
                continue
            if not seri_saat_ini or not baris.startswith("|"):
                continue
            sel = [c.strip() for c in baris.strip().strip("|").split("|")]
            if len(sel) < 4 or not sel[0].isdigit():
                continue
            tgl = tanggal_doc(sel[1])
            dur = durasi_doc_ke_detik(sel[-1])
            judul = sel[2]
            topik = sel[3] if seri_saat_ini == "Lainnya" and len(sel) >= 5 else None
            peta[seri_saat_ini].append((tgl, dur // 60, judul, topik))
    return peta


def main():
    video = baca_csv()
    peta = baca_peta_dokumen()

    fp = defaultdict(list)
    for nama, daftar in peta.items():
        for tgl, menit, judul, topik in daftar:
            fp[(tgl, menit)].append((nama, judul, topik))

    hasil = []
    taketemu = []
    ambig_lintas = []
    for r in video:
        tgl = r["tanggal_publish"].strip()[:10]
        menit = durasi_iso_ke_detik(r["durasi_iso"].strip()) // 60
        kandidat = fp.get((tgl, menit), [])
        if not kandidat:
            taketemu.append(r["video_id"])
            continue
        if len({k[0] for k in kandidat}) > 1:
            ambig_lintas.append(r["video_id"])
        nama, judul, topik = kandidat[0]
        hasil.append({
            "video_id": r["video_id"].strip(),
            "seri": nama,
            "judul": judul,
            "tanggal": tgl,
            "durasi": durasi_iso_ke_detik(r["durasi_iso"].strip()),
            "deskripsi": bersihkan_deskripsi(r["deskripsi"]),
            "topik_doc": topik,
        })

    assert len(video) == 331, f"Harus 331 video unik, didapat {len(video)}"
    assert not taketemu, f"Ada {len(taketemu)} video taketemu: {taketemu[:5]}"
    assert not ambig_lintas, f"Ada {len(ambig_lintas)} video ambigu lintas seri"

    # Nomor episode kronologis per seri resmi; Lainnya tidak bernomor.
    untuk_seri = [h for h in hasil if h["seri"] != "Lainnya"]
    untuk_lainnya = [h for h in hasil if h["seri"] == "Lainnya"]
    grup = defaultdict(list)
    for h in untuk_seri:
        grup[h["seri"]].append(h)
    for nama, daftar in grup.items():
        daftar.sort(key=lambda x: (x["tanggal"], x["judul"]))
        for i, h in enumerate(daftar, start=1):
            h["nomor"] = i

    assert len(grup) == 21, f"Harus 21 seri resmi, didapat {len(grup)}"
    assert len(untuk_seri) == 249, f"Harus 249 episode, didapat {len(untuk_seri)}"
    assert len(untuk_lainnya) == 82, f"Harus 82 video Lainnya, didapat {len(untuk_lainnya)}"

    semua = sorted(hasil, key=lambda x: (x["seri"], x.get("nomor", 9999), x["video_id"]))
    baris_sql = [
        "-- ============================================================================",
        "-- KATALOG 331 VIDEO UNIK WBS (HASIL MIGRASI OTOMATIS)",
        "-- Sumber: metadata_youtube.csv + docs/02-peta-konten-dan-taksonomi.md",
        "-- Jalankan setelah supabase/schema.sql. Aman dijalankan ulang.",
        "-- ============================================================================",
        "",
        "INSERT INTO episode (",
        "  seri_id, judul, slug, nomor_episode, tanggal_tayang, durasi_detik,",
        "  narasumber, moderator, topik, kategori_khusus, tautan_youtube, video_id,",
        "  deskripsi, status",
        ") VALUES",
    ]

    isi = []
    for h in semua:
        slug_seri = SLUG_SERI[h["seri"]]
        kategori = KATEGORI_SERI[h["seri"]]
        if h["seri"] == "Lainnya":
            nomor_sql = "NULL"
            slug = f"{slugify(h['judul'])}-{h['video_id'][:6].lower()}"
            enum_topik = ENUM_TOPIK_LAINNYA.get(h["topik_doc"] or "", "layanan_perpustakaan")
            kategori_khusus = sql_str(enum_topik)
            topik = LABEL_KATEGORI.get(enum_topik, "Lainnya")
        else:
            nomor_sql = str(h["nomor"])
            slug = f"{slugify(h['judul'])}-{h['nomor']:02d}"
            kategori_khusus = "NULL"
            topik = LABEL_KATEGORI[kategori]
        slug = slug[:280]
        tautan = f"https://www.youtube.com/watch?v={h['video_id']}"
        isi.append(
            "("
            + f"(SELECT id FROM seri WHERE slug = {sql_str(slug_seri)}), "
            + sql_str(h["judul"]) + ", " + sql_str(slug) + ", " + nomor_sql + ", "
            + sql_str(h["tanggal"]) + ", " + str(h["durasi"]) + ", "
            + sql_str("Belum tercatat") + ", " + sql_str("Belum tercatat") + ", "
            + sql_str(topik) + ", " + kategori_khusus + ", "
            + sql_str(tautan) + ", " + sql_str(h["video_id"]) + ", "
            + sql_str(h["deskripsi"]) + ", 'tayang'"
            + ")"
        )

    baris_sql.append(",\n".join(isi) + ";")
    baris_sql.append("")
    OUT_PATH.write_text("\n".join(baris_sql), encoding="utf-8")

    dist = Counter(h["seri"] for h in hasil)
    print(f"Video unik public : {len(video)}")
    print(f"Seri resmi terpakai: {len(grup)}")
    print(f"Episode resmi      : {len(untuk_seri)}")
    print(f"Keranjang Lainnya  : {len(untuk_lainnya)}")
    print(f"Total tersimpan    : {len(semua)}")
    print(f"Ambiguitas lintas seri: {len(ambig_lintas)}")
    print("Distribusi per seri:")
    for nama, slug, _ in SERI:
        print(f"  {dist[nama]:3d}  {nama}")
    print(f"Output: {OUT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
