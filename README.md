# QR-Cafe Web Application — Modul 8 (Data Dinamis & Logika Aplikasi)

Aplikasi web pemesanan menu kafe berbasis QR Code dengan interaksi data dinamis, kustomisasi produk, status keranjang, dan penyimpanan state berbasis browser.

---

## 🌐 Link Live Web (Produksi)
👉 **[Aplikasi QR-Cafe Live Web](https://bigboyzo6.github.io/WEB-QR-Cafe/)**

---

## 📱 Fitur Utama & Halaman

- **Welcome Page** (`index.html`) — Halaman penyambutan pengguna (halaman utama).
- **Verifikasi Login** (`login.html`) — Autentikasi/verifikasi data diri (Nama, Email) dan nomor meja pengguna.
- **Home Landing** (`homelanding.html`) — Halaman navigasi utama setelah verifikasi meja.
- **Katalog Menu** (`menucatalog.html`) — Daftar menu lengkap beserta filter kategori (Vegetarian, Dairy-Free, dll).
- **Kustomisasi Produk** (`productcustom.html`) — Opsi penyesuaian porsi, varian susu, tingkat gula, dan catatan khusus.
- **Ringkasan Pesanan** (`checkout.html`) — Ringkasan item pesanan dinamis, klaim kode promo, dan empty state.
- **Konfirmasi Pesanan** (`orderconfirmation.html`) — Bukti struk pesanan beserta estimasi waktu penyiapan.

## 🛠️ Teknologi & Sumber Data

- **HTML5 & CSS3** (Layout kustom & gaya responsif *fit-to-screen* di Android maupun Desktop)
- **JavaScript (ES6)** (Logika interaksi & pengolahan data dinamis)
- **Web Storage API (`localStorage`)**:
  - Menyimpan state data verifikasi pelanggan (`userName`, `userMeja`).
  - Menyimpan item keranjang aktif (`userCart`) dan kustomisasi opsi (Gula & Susu).
  - Menyimpan rincian pesanan terakhir (`lastOrder`) untuk struk konfirmasi.

---

## 🗺️ Panduan Singkat Alur Uji Coba untuk Mentor

1. **Halaman Welcome (`index.html`)**: Klik tombol **Pesan** untuk memulai alur.
2. **Halaman Verifikasi (`login.html`)**: Masukkan **Email**, **Nama**, dan **Nomor Meja**, lalu klik **Verifikasi Saya**.
3. **Halaman Landing (`homelanding.html`)**: Klik kartu **Jelajahi Menu** atau tombol navigasi bawah.
4. **Halaman Katalog Menu (`menucatalog.html`)**: 
   - Klik tombol **+ Add** untuk langsung memasukkan produk default ke keranjang.
   - Atau klik **Kartu Produk** (misal: *Flat White*) untuk melakukan kustomisasi.
5. **Halaman Kustomisasi Produk (`productcustom.html`)**: Pilih tingkat kemanisan (Sugar) dan jenis susu (Milk). Total harga akan terhitung secara otomatis. Klik **Masukkan ke keranjang**.
6. **Halaman Checkout / Keranjang (`checkout.html`)**: 
   - Menampilkan **Empty State** jika belum ada produk.
   - Menampilkan rincian pesanan, nama pemesan, dan total harga secara dinamis. Klik tombol **Remove** untuk menghapus item.
7. **Halaman Konfirmasi Pesanan (`orderconfirmation.html`)**: Menampilkan bukti struk pesanan dan estimasi waktu penyiapan.

---

## 📁 Struktur Folder

```text
WEB-QR-Cafe/
├── index.html
├── login.html
├── homelanding.html
├── menucatalog.html
├── productcustom.html
├── checkout.html
├── orderconfirmation.html
├── seatoutlet.html
├── style.css
├── script.js
└── README.md

---

## 🤖 Log Prompt AI & Catatan Perbaikan Manual

### Log Prompt AI Utama:
- *"Buatkan file terpisah HTML, CSS, dan JS berdasarkan alur QR-Cafe (Welcome -> Verifikasi -> Landing -> Catalog -> Custom -> Checkout -> Confirmation)."*
- *"Ubah alur agar input nama dan nomor meja dari pengguna tersimpan secara dinamis dan tampil di halaman checkout serta konfirmasi."*
- *"Buat tampilan keranjang menampilkan empty state ketika belum ada produk yang dimasukkan."*
- *"Perbaiki layout CSS agar fit to screen (responsif) di layar Android maupun Desktop."*

### Catatan Perbaikan Manual:
1. **Penyesuaian Struktur File Root:** Menjadikan tampilan Welcome sebagai file `index.html` agar saat GitHub Pages dibuka pertama kali langsung mengarah ke halaman utama.
2. **Navigasi Link Direct:** Mengubah logika pencegatan navigasi JS menjadi sintaks `window.location.href` dan event handling `stopPropagation()` agar aksi tombol `+ Add` dan klik kartu produk berjalan lancar tanpa error `Cannot GET`.
3. **Optimasi CSS Mobile Container:** Menyesuaikan `max-width: 480px` dan `margin: auto` agar tampilan tetap rapi, tidak mampat, dan responsif di semua ukuran perangkat.
