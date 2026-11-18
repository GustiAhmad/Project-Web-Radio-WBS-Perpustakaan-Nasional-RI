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
          peran?: Database['public']['Enums']['peran_pengguna']
          status_aktif?: boolean
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
          status?: Database['public']['Enums']['status_publikasi']
          buka_sesi?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      sesi_onair: {
        Row: {
          id: string
          tanggal: string
          nama_program: string
          jadwal_id: string | null
          acara_id: string | null
          jam_mulai: string
          jam_selesai: string
          status: Database['public']['Enums']['status_sesi']
          dibuka_oleh: string | null
          ditutup_oleh: string | null
          catatan_internal: string | null
          dibuka_pada: string
          ditutup_pada: string | null
        }
        Insert: {
          id?: string
          tanggal?: string
          nama_program: string
          jadwal_id?: string | null
          acara_id?: string | null
          jam_mulai: string
          jam_selesai: string
          status?: Database['public']['Enums']['status_sesi']
          dibuka_oleh?: string | null
          ditutup_oleh?: string | null
          catatan_internal?: string | null
          dibuka_pada?: string
          ditutup_pada?: string | null
        }
        Update: {
          id?: string
          tanggal?: string
          nama_program?: string
          jadwal_id?: string | null
          acara_id?: string | null
          jam_mulai?: string
          jam_selesai?: string
          status?: Database['public']['Enums']['status_sesi']
          dibuka_oleh?: string | null
          ditutup_oleh?: string | null
          catatan_internal?: string | null
          dibuka_pada?: string
          ditutup_pada?: string | null
        }
        Relationships: []
      }
      pertanyaan: {
        Row: {
          id: string
          sesi_id: string
          nama_pengirim: string
          isi_pertanyaan: string
          status: Database['public']['Enums']['status_pertanyaan']
          catatan_petugas: string | null
          ditandai_oleh: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sesi_id: string
          nama_pengirim?: string
          isi_pertanyaan: string
          status?: Database['public']['Enums']['status_pertanyaan']
          catatan_petugas?: string | null
          ditandai_oleh?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sesi_id?: string
          nama_pengirim?: string
          isi_pertanyaan?: string
          status?: Database['public']['Enums']['status_pertanyaan']
          catatan_petugas?: string | null
          ditandai_oleh?: string | null
          created_at?: string
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
      status_sesi: 'terbuka' | 'tertutup'
      status_pertanyaan: 'baru' | 'dibacakan' | 'disembunyikan'
      kanal_acara: 'youtube' | 'zoom' | 'instagram' | 'tatap_muka' | 'lainnya'
    }
    CompositeTypes: Record<string, never>
  }
}

export type Seri = Database['public']['Tables']['seri']['Row']
export type Episode = Database['public']['Tables']['episode']['Row']
export type JadwalTetap = Database['public']['Tables']['jadwal_tetap']['Row']
export type SesiOnAir = Database['public']['Tables']['sesi_onair']['Row']
export type AcaraMendatang = Database['public']['Tables']['acara_mendatang']['Row']
export type HalamanStatis = Database['public']['Tables']['halaman_statis']['Row']
