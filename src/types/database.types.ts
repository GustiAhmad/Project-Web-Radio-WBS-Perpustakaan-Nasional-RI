export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      pengguna: {
        Row: {
          id: string
          auth_user_id: string | null
          email: string
          nama_lengkap: string
          nama_pengguna: string
          foto_url: string | null
          peran: Database['public']['Enums']['peran_pengguna']
          status_aktif: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_user_id?: string | null
          email: string
          nama_lengkap: string
          nama_pengguna: string
          foto_url?: string | null
          peran?: Database['public']['Enums']['peran_pengguna']
          status_aktif?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_user_id?: string | null
          email?: string
          nama_lengkap?: string
          nama_pengguna?: string
          foto_url?: string | null
          peran?: Database['public']['Enums']['peran_pengguna']
          status_aktif?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      penyiar: {
        Row: {
          id: string
          nama: string
          slug: string
          foto_url: string | null
          bio: string | null
          urutan: number
          aktif: boolean
          dibuat_oleh: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nama: string
          slug: string
          foto_url?: string | null
          bio?: string | null
          urutan?: number
          aktif?: boolean
          dibuat_oleh?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          slug?: string
          foto_url?: string | null
          bio?: string | null
          urutan?: number
          aktif?: boolean
          dibuat_oleh?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      seri: {
        Row: {
          id: string
          nama: string
          slug: string
          kategori: Database['public']['Enums']['kategori_topik']
          jenis: Database['public']['Enums']['jenis_seri']
          deskripsi: string
          gambar_url: string | null
          teks_alternatif: string | null
          urutan: number
          unggulan: boolean
          dibuat_oleh: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nama: string
          slug: string
          kategori: Database['public']['Enums']['kategori_topik']
          jenis?: Database['public']['Enums']['jenis_seri']
          deskripsi: string
          gambar_url?: string | null
          teks_alternatif?: string | null
          urutan?: number
          unggulan?: boolean
          dibuat_oleh?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          slug?: string
          kategori?: Database['public']['Enums']['kategori_topik']
          jenis?: Database['public']['Enums']['jenis_seri']
          deskripsi?: string
          gambar_url?: string | null
          teks_alternatif?: string | null
          urutan?: number
          unggulan?: boolean
          dibuat_oleh?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      episode: {
        Row: {
          id: string
          seri_id: string
          judul: string
          slug: string
          nomor_episode: number | null
          tanggal_tayang: string
          durasi_detik: number
          narasumber: string
          moderator: string
          topik: string
          kategori_khusus: Database['public']['Enums']['kategori_topik'] | null
          tautan_youtube: string
          video_id: string
          deskripsi: string | null
          status: Database['public']['Enums']['status_episode']
          dibuat_oleh: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seri_id: string
          judul: string
          slug: string
          nomor_episode?: number | null
          tanggal_tayang: string
          durasi_detik?: number
          narasumber?: string
          moderator?: string
          topik: string
          kategori_khusus?: Database['public']['Enums']['kategori_topik'] | null
          tautan_youtube: string
          video_id: string
          deskripsi?: string | null
          status?: Database['public']['Enums']['status_episode']
          dibuat_oleh?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          seri_id?: string
          judul?: string
          slug?: string
          nomor_episode?: number | null
          tanggal_tayang?: string
          durasi_detik?: number
          narasumber?: string
          moderator?: string
          topik?: string
          kategori_khusus?: Database['public']['Enums']['kategori_topik'] | null
          tautan_youtube?: string
          video_id?: string
          deskripsi?: string | null
          status?: Database['public']['Enums']['status_episode']
          dibuat_oleh?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      jadwal_tetap: {
        Row: {
          id: string
          jam_mulai: string
          jam_selesai: string
          nama_program: string
          nama_penyiar: string | null
          hari: Database['public']['Enums']['jenis_hari']
          interaktif: boolean
          deskripsi: string | null
          status: Database['public']['Enums']['status_publikasi']
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          jam_mulai: string
          jam_selesai: string
          nama_program: string
          nama_penyiar?: string | null
          hari: Database['public']['Enums']['jenis_hari']
          interaktif?: boolean
          deskripsi?: string | null
          status?: Database['public']['Enums']['status_publikasi']
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          jam_mulai?: string
          jam_selesai?: string
          nama_program?: string
          nama_penyiar?: string | null
          hari?: Database['public']['Enums']['jenis_hari']
          interaktif?: boolean
          deskripsi?: string | null
          status?: Database['public']['Enums']['status_publikasi']
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      acara_mendatang: {
        Row: {
          id: string
          judul: string
          tanggal: string
          jam_mulai: string
          jam_selesai: string | null
          kanal: Database['public']['Enums']['kanal_acara']
          tautan_acara: string | null
          gambar_url: string | null
          deskripsi: string | null
          moderator: string
          narasumber: string
          topik: string
          seri_id: string | null
          durasi_detik: number
          status: Database['public']['Enums']['status_publikasi']
          buka_sesi: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          judul: string
          tanggal: string
          jam_mulai: string
          jam_selesai?: string | null
          kanal?: Database['public']['Enums']['kanal_acara']
          tautan_acara?: string | null
          gambar_url?: string | null
          deskripsi?: string | null
          moderator?: string
          narasumber?: string
          topik?: string
          seri_id?: string | null
          durasi_detik?: number
          status?: Database['public']['Enums']['status_publikasi']
          buka_sesi?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          judul?: string
          tanggal?: string
          jam_mulai?: string
          jam_selesai?: string | null
          kanal?: Database['public']['Enums']['kanal_acara']
          tautan_acara?: string | null
          gambar_url?: string | null
          deskripsi?: string | null
          moderator?: string
          narasumber?: string
          topik?: string
          seri_id?: string | null
          durasi_detik?: number
          status?: Database['public']['Enums']['status_publikasi']
          buka_sesi?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      sesi_chat: {
        Row: {
          id: string
          nama_sesi: string
          status: Database['public']['Enums']['status_sesi_chat']
          dibuka_oleh_id: string | null
          dibuka_oleh: string
          dibuka_pada: string
          ditutup_oleh_id: string | null
          ditutup_oleh: string | null
          ditutup_pada: string | null
        }
        Insert: {
          id?: string
          nama_sesi: string
          status?: Database['public']['Enums']['status_sesi_chat']
          dibuka_oleh_id?: string | null
          dibuka_oleh: string
          dibuka_pada?: string
          ditutup_oleh_id?: string | null
          ditutup_oleh?: string | null
          ditutup_pada?: string | null
        }
        Update: {
          id?: string
          nama_sesi?: string
          status?: Database['public']['Enums']['status_sesi_chat']
          dibuka_oleh_id?: string | null
          dibuka_oleh?: string
          dibuka_pada?: string
          ditutup_oleh_id?: string | null
          ditutup_oleh?: string | null
          ditutup_pada?: string | null
        }
        Relationships: []
      }
      chat_pesan: {
        Row: {
          id: string
          sesi_id: string
          nama: string
          isi: string
          status: Database['public']['Enums']['status_chat_pesan']
          disembunyikan_oleh: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sesi_id: string
          nama?: string
          isi: string
          status?: Database['public']['Enums']['status_chat_pesan']
          disembunyikan_oleh?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sesi_id?: string
          nama?: string
          isi?: string
          status?: Database['public']['Enums']['status_chat_pesan']
          disembunyikan_oleh?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      laporan_error: {
        Row: {
          id: string
          judul: string
          deskripsi: string
          langkah_reproduksi: string | null
          url_halaman: string | null
          perangkat: string | null
          tingkat_keparahan: Database['public']['Enums']['tingkat_keparahan']
          status: Database['public']['Enums']['status_laporan']
          screenshot_path: string | null
          dilaporkan_oleh: string | null
          nama_pelapor: string
          email_pelapor: string
          catatan_internal: string | null
          ditangani_oleh: string | null
          dibuat_pada: string
          diproses_pada: string | null
          selesai_pada: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          judul: string
          deskripsi: string
          langkah_reproduksi?: string | null
          url_halaman?: string | null
          perangkat?: string | null
          tingkat_keparahan?: Database['public']['Enums']['tingkat_keparahan']
          status?: Database['public']['Enums']['status_laporan']
          screenshot_path?: string | null
          dilaporkan_oleh?: string | null
          nama_pelapor: string
          email_pelapor: string
          catatan_internal?: string | null
          ditangani_oleh?: string | null
          dibuat_pada?: string
          diproses_pada?: string | null
          selesai_pada?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          judul?: string
          deskripsi?: string
          langkah_reproduksi?: string | null
          url_halaman?: string | null
          perangkat?: string | null
          tingkat_keparahan?: Database['public']['Enums']['tingkat_keparahan']
          status?: Database['public']['Enums']['status_laporan']
          screenshot_path?: string | null
          dilaporkan_oleh?: string | null
          nama_pelapor?: string
          email_pelapor?: string
          catatan_internal?: string | null
          ditangani_oleh?: string | null
          dibuat_pada?: string
          diproses_pada?: string | null
          selesai_pada?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      halaman_statis: {
        Row: {
          id: string
          slug: string
          judul: string
          ringkasan: string | null
          konten_markdown: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          judul: string
          ringkasan?: string | null
          konten_markdown: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          judul?: string
          ringkasan?: string | null
          konten_markdown?: string
          updated_at?: string
        }
        Relationships: []
      }
      artikel: {
        Row: {
          id: string
          judul: string
          slug: string
          kategori: Database['public']['Enums']['kategori_artikel']
          ringkasan: string
          isi: string
          gambar_path: string | null
          gambar_url: string | null
          teks_alternatif: string | null
          status: Database['public']['Enums']['status_publikasi']
          penulis: string
          diterbitkan_pada: string | null
          dibuat_pada: string
          dibuat_oleh: string | null
          diubah_pada: string
          diubah_oleh: string | null
        }
        Insert: {
          id?: string
          judul: string
          slug: string
          kategori?: Database['public']['Enums']['kategori_artikel']
          ringkasan: string
          isi: string
          gambar_path?: string | null
          gambar_url?: string | null
          teks_alternatif?: string | null
          status?: Database['public']['Enums']['status_publikasi']
          penulis: string
          diterbitkan_pada?: string | null
          dibuat_pada?: string
          dibuat_oleh?: string | null
          diubah_pada?: string
          diubah_oleh?: string | null
        }
        Update: {
          id?: string
          judul?: string
          slug?: string
          kategori?: Database['public']['Enums']['kategori_artikel']
          ringkasan?: string
          isi?: string
          gambar_path?: string | null
          gambar_url?: string | null
          teks_alternatif?: string | null
          status?: Database['public']['Enums']['status_publikasi']
          penulis?: string
          diterbitkan_pada?: string | null
          dibuat_pada?: string
          dibuat_oleh?: string | null
          diubah_pada?: string
          diubah_oleh?: string | null
        }
        Relationships: []
      }
      pengaturan_situs: {
        Row: {
          kunci: string
          nilai: Json
          deskripsi: string | null
          updated_at: string
        }
        Insert: {
          kunci: string
          nilai: Json
          deskripsi?: string | null
          updated_at?: string
        }
        Update: {
          kunci?: string
          nilai?: Json
          deskripsi?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      cari_email_pengguna: {
        Args: { p_identifikator: string }
        Returns: string
      }
      auth_is_superadmin: {
        Args: Record<string, never>
        Returns: boolean
      }
      auth_is_staf: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: {
      peran_pengguna: 'superadmin' | 'admin'
      kategori_topik:
        | 'layanan_perpustakaan'
        | 'naskah_nusantara'
        | 'literasi_keluarga'
        | 'sejarah_kebudayaan'
        | 'semua_kategori'
      jenis_seri: 'resmi' | 'keranjang'
      status_episode: 'draf' | 'tayang' | 'arsip_internal'
      jenis_hari: 'hari_kerja' | 'sabtu' | 'minggu'
      status_publikasi: 'draf' | 'terbit'
      status_sesi_chat: 'terbuka' | 'tertutup'
      status_chat_pesan: 'terlihat' | 'disembunyikan'
      kategori_artikel: 'berita' | 'artikel' | 'pengumuman'
      kanal_acara: 'youtube' | 'zoom' | 'instagram' | 'tatap_muka' | 'lainnya'
      status_laporan: 'baru' | 'diproses' | 'selesai' | 'ditolak'
      tingkat_keparahan: 'rendah' | 'sedang' | 'tinggi' | 'kritis'
    }
    CompositeTypes: Record<string, never>
  }
}

export type Seri = Database['public']['Tables']['seri']['Row']
export type Episode = Database['public']['Tables']['episode']['Row']
export type JadwalTetap = Database['public']['Tables']['jadwal_tetap']['Row']
export type SesiChat = Database['public']['Tables']['sesi_chat']['Row']
export type AcaraMendatang = Database['public']['Tables']['acara_mendatang']['Row']
export type HalamanStatis = Database['public']['Tables']['halaman_statis']['Row']
export type Artikel = Database['public']['Tables']['artikel']['Row']
export type KategoriArtikel = Database['public']['Enums']['kategori_artikel']
export type StatusPublikasi = Database['public']['Enums']['status_publikasi']
export type ChatPesan = Database['public']['Tables']['chat_pesan']['Row']
export type Pengguna = Database['public']['Tables']['pengguna']['Row']
export type Penyiar = Database['public']['Tables']['penyiar']['Row']
export type LaporanError = Database['public']['Tables']['laporan_error']['Row']
export type StatusLaporan = Database['public']['Enums']['status_laporan']
export type TingkatKeparahan = Database['public']['Enums']['tingkat_keparahan']
