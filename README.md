# Kuala Kos

Aplikasi pencarian kamar kos untuk Banda Aceh dan Aceh Besar, menggunakan Next.js, React, dan TypeScript.

## Menjalankan aplikasi

```powershell
npm ci
$env:NODE_USE_SYSTEM_CA = '1'
npm run dev
```

Buka http://localhost:3000. Pengaturan sertifikat sistem diperlukan pada lingkungan pengembangan saat ini untuk pengambilan font.

## Pemeriksaan

```powershell
npm run typecheck
npm run lint
npm run build
```

Server pengembangan menyimpan keluaran di `.next-dev`, sedangkan build produksi memakai `.next`. Keduanya dipisahkan agar build tidak mengganti chunk yang sedang dilayani server dev. Untuk menjalankan hasil build, hentikan server dev atau pilih port lain, lalu gunakan `npm start`.

Animasi global dimuat khusus di browser melalui `ClientScriptsLoader`. Pada mode development saja, layout juga melepas service worker lama dengan script `/sw.js` pada origin yang sama dan menghapus entri cache `/_next/` miliknya. Kuala Kos tidak mendaftarkan service worker. Cookie, local storage, dan entri cache lain tidak dihapus. Bila nantinya menambahkan PWA, tinjau kembali mekanisme pemulihan development ini.

## Dokumentasi

Lihat [indeks dokumentasi](../docs/README.md) untuk riwayat pengembangan, keputusan, rancangan backend, dan usulan alur peran.

Panduan folder dan penamaan tersedia di [struktur proyek](../docs/struktur-proyek.md).

Komponen berada di `src/components/{about,auth,contact,home,kos,layout,maps,ui}`. CSS global dan SCSS berada di `src/styles`; CSS Module berada di samping komponennya. Tipe kos bersama berada di `src/types/property.ts`.

Skrip pemeriksaan browser lokal berada di `scripts/`. Setelah server berjalan di port 3000, gunakan `python scripts/responsive_audit.py` atau `python scripts/responsive_interactions.py` (memerlukan Python Playwright). Hasilnya disimpan di `artifacts/` yang diabaikan Git.

Untuk meninjau kandidat file yang tidak terhubung ke aplikasi, jalankan `python scripts/audit_unused_files.py`. Periksa hasilnya sebelum menghapus, terutama bila menambahkan URL aset yang dirangkai secara dinamis. Skrip tidak menganggap dokumentasi, referensi, konfigurasi, atau dependensi terpasang sebagai kode mati.

Foto adalah ilustrasi yang disimpan lokal. Nama, tarif, fasilitas, serta titik kos masih data contoh. Autentikasi, pengiriman pesan, dan database belum diaktifkan.
