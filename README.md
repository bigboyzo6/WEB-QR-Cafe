# QR-Cafe Web Application — Modul 8 (Data Dinamis & Logika Aplikasi)

Aplikasi web pemesanan menu kafe berbasis QR Code dengan interaksi data dinamis, kustomisasi produk, status keranjang, dan penyimpanan state berbasis browser.

---

## 🌐 Link Live Web (Produksi)
👉 **[Aplikasi QR-Cafe Live Web](https://bigboyzo6.github.io/WEB-QR-Cafe/)**

---

## 🛠️ Penjelasan Sumber Data & Layanan Form
1. **Penyimpanan State & Data (Web Storage API):**
   - **`localStorage`**: Digunakan untuk menyimpan state data verifikasi pengguna (`userName`, `userMeja`), item keranjang aktif (`userCart`), kustomisasi opsi (Gula & Susu), serta rincian pesanan terakhir (`lastOrder`).
2. **Pengelolaan Form & Validasi:**
   - Form verifikasi pelanggan di `login.html` menggunakan validasi HTML5 (`required`) dan pemrosesan `submit` via JavaScript untuk memastikan input Nama, Email, dan Nomor Meja terisi dengan benar sebelum pengguna melanjutkan ke katalog menu.

---

## 🗺️ Panduan Singkat Alur Uji Coba untuk Mentor
Untuk menguji seluruh fungsi fungsionalitas dan UX States aplikasi:

1. **Halaman Welcome (`index.html`)**
   - Klik tombol **Pesan** untuk memulai alur.
2. **Halaman Verifikasi (`login.html`)**
   - Masukkan **Email**, **Nama**, dan **Nomor Meja**, lalu klik **Verifikasi Saya**.
3. **Halaman Landing (`homelanding.html`)**
   - Perhatikan badge verifikasi meja, lalu klik **Jelajahi Menu** atau pilih menu navigasi bawah.
4. **Halaman Katalog Menu (`menucatalog.html`)**
   - Klik langsung tombol **+ Add** untuk memasukkan produk default ke keranjang.
   - Atau klik pada **Kartu Produk** (misal: *Flat White*) untuk membuka halaman kustomisasi.
5. **Halaman Kustomisasi Produk (`productcustom.html`)**
   - Pilih tingkat kemanisan (Sugar) dan jenis susu (Milk). Total harga akan bertambah secara dinamis. Klik **Masukkan ke keranjang**.
6. **Halaman Checkout / Keranjang (`checkout.html`)**
   - Jika keranjang kosong, sistem akan menampilkan **Empty State** (*"Keranjang Anda Kosong"*).
   - Jika ada item, rincian pesanan, nama pemesan, nomor meja, dan subtotal harga akan dihitung secara dinamis. Uji tombol **Remove** untuk menghapus item.
   - Klik tombol **Checkout** untuk memproses pesanan.
7. **Halaman Konfirmasi Pesanan (`orderconfirmation.html`)**
   - Menampilkan struk ringkasan pesanan dinamis dan estimasi waktu penyiapan pesanan.

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
