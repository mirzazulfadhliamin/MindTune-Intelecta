# Panduan Deployment MindTune ke VPS Hostinger

Dokumen ini berisi panduan lengkap untuk men-deploy aplikasi MindTune (Vue.js + Vite) ke VPS Hostinger dari awal hingga akhir.

## Daftar Isi

1. [Persiapan](#persiapan)
2. [Mengakses VPS Hostinger](#mengakses-vps-hostinger)
3. [Menyiapkan Server](#menyiapkan-server)
4. [Mengupload Kode Aplikasi](#mengupload-kode-aplikasi)
5. [Membangun Aplikasi](#membangun-aplikasi)
6. [Mengkonfigurasi Web Server](#mengkonfigurasi-web-server)
7. [Mengkonfigurasi Domain](#mengkonfigurasi-domain)
8. [Mengamankan Aplikasi dengan SSL](#mengamankan-aplikasi-dengan-ssl)
9. [Pemeliharaan dan Update](#pemeliharaan-dan-update)

## Persiapan

### Prasyarat

Sebelum memulai, pastikan Anda memiliki:

- Akun Hostinger dengan VPS yang sudah aktif
- Akses SSH ke VPS (username, password/key, dan IP address)
- Domain yang sudah terdaftar (opsional)
- Git terinstal di komputer lokal Anda
- Node.js dan npm terinstal di komputer lokal Anda

### Mempersiapkan Aplikasi untuk Production

1. Pastikan aplikasi sudah berjalan dengan baik di lingkungan pengembangan lokal
2. Update file `.env` (jika ada) dengan konfigurasi production
3. Pastikan semua dependensi tercatat dengan benar di `package.json`

## Mengakses VPS Hostinger

### Login ke VPS via SSH

```bash
ssh username@your_vps_ip
```

Ganti `username` dengan username VPS Anda dan `your_vps_ip` dengan alamat IP VPS Anda.

### Mengakses Panel Kontrol Hostinger

1. Login ke akun Hostinger Anda
2. Navigasi ke bagian VPS
3. Pilih VPS yang akan digunakan untuk deployment
4. Catat informasi penting seperti IP address, username, dan password

## Menyiapkan Server

### Update Sistem

```bash
sudo apt update
sudo apt upgrade -y
```

### Instal Dependensi yang Diperlukan

```bash
# Instal Node.js dan npm (versi 20.x diperlukan untuk Vite 7.x dan plugin Vue 6.x)
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verifikasi instalasi
node -v  # Pastikan versi minimal 20.19.0
npm -v

# Instal Git
sudo apt install -y git

# Instal Nginx sebagai web server
sudo apt install -y nginx
```

### Mengkonfigurasi Firewall

```bash
# Mengaktifkan UFW (Uncomplicated Firewall)
sudo apt install -y ufw

# Mengizinkan SSH, HTTP, dan HTTPS
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# Mengaktifkan firewall
sudo ufw enable

# Memeriksa status firewall
sudo ufw status
```

## Mengupload Kode Aplikasi

1. Buat repository Git untuk proyek Anda (jika belum ada)
2. Push kode ke repository (GitHub, GitLab, dll)
3. Clone repository ke VPS:

```bash
# Buat direktori untuk aplikasi
sudo mkdir -p /var/www/mindtune
sudo chown -R $USER:$USER /var/www/mindtune

# Clone repository
cd /var/www/mindtune
git clone https://github.com/username/mindtune-intelecta.git .
```

## Membangun Aplikasi

### Instal Dependensi dan Build Aplikasi

```bash
cd /var/www/mindtune

# Instal dependensi
npm install

# Build aplikasi untuk production
npm run build
```

Proses build akan menghasilkan folder `dist` yang berisi file statis yang siap di-deploy.

## Mengkonfigurasi Web Server

### Konfigurasi Nginx

1. Buat file konfigurasi Nginx untuk aplikasi:

```bash
sudo nano /etc/nginx/sites-available/mindtune
```

2. Tambahkan konfigurasi berikut:

```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com; # Ganti dengan domain Anda atau gunakan IP VPS jika tidak memiliki domain
    
    root /var/www/mindtune/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Konfigurasi caching untuk file statis
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
    
    # Konfigurasi untuk mencegah akses ke file .git dan file tersembunyi
    location ~ /\.(?!well-known) {
        deny all;
    }
}
```

3. Aktifkan konfigurasi dengan membuat symlink:

```bash
sudo ln -s /etc/nginx/sites-available/mindtune /etc/nginx/sites-enabled/
```

4. Verifikasi konfigurasi Nginx:

```bash
sudo nginx -t
```

5. Restart Nginx:

```bash
sudo systemctl restart nginx
```

## Mengkonfigurasi Domain

### Mengarahkan Domain ke VPS

1. Login ke panel kontrol domain Anda (di Hostinger atau registrar domain lainnya)
2. Buat atau update record A untuk mengarahkan domain ke IP VPS:
   - Type: A
   - Name: @ (atau subdomain yang diinginkan)
   - Value: IP address VPS Anda
   - TTL: 3600 (atau sesuai rekomendasi)

3. Jika ingin menggunakan www, tambahkan record CNAME:
   - Type: CNAME
   - Name: www
   - Value: your_domain.com (domain utama Anda)
   - TTL: 3600

4. Tunggu propagasi DNS (bisa memakan waktu hingga 24-48 jam)

## Mengamankan Aplikasi dengan SSL

### Menginstal Certbot untuk SSL Gratis

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Mendapatkan dan Mengkonfigurasi SSL

```bash
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

Ikuti petunjuk yang muncul untuk menyelesaikan proses. Certbot akan secara otomatis memperbarui konfigurasi Nginx Anda.

### Verifikasi Auto-Renewal

Certbot secara otomatis menambahkan cron job untuk memperbarui sertifikat. Anda dapat menguji proses renewal dengan:

```bash
sudo certbot renew --dry-run
```

## Pemeliharaan dan Update

### Memperbarui Aplikasi

Untuk memperbarui aplikasi ke versi terbaru:

```bash
cd /var/www/mindtune

# Jika menggunakan Git
git pull

# Pastikan Node.js versi sesuai kebutuhan
node -v  # Pastikan versi minimal 20.19.0

# Instal dependensi baru (jika ada)
npm install

# Build ulang aplikasi
npm run build
```

### Monitoring Aplikasi

Untuk memonitor log Nginx:

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Backup Reguler

Lakukan backup reguler untuk file konfigurasi dan data aplikasi:

```bash
# Contoh script backup sederhana
sudo mkdir -p /backup
sudo tar -czf /backup/mindtune-$(date +%Y%m%d).tar.gz /var/www/mindtune /etc/nginx/sites-available/mindtune
```

## Troubleshooting

### Masalah Umum dan Solusi

1. **Aplikasi tidak dapat diakses**:
   - Periksa status Nginx: `sudo systemctl status nginx`
   - Periksa konfigurasi Nginx: `sudo nginx -t`
   - Periksa firewall: `sudo ufw status`

2. **Error 502 Bad Gateway**:
   - Periksa apakah aplikasi sudah di-build dengan benar
   - Periksa permission folder: `sudo chown -R www-data:www-data /var/www/mindtune/dist`

3. **Masalah dengan routing Vue**:
   - Pastikan konfigurasi Nginx memiliki `try_files $uri $uri/ /index.html;`

4. **Sertifikat SSL tidak berfungsi**:
   - Jalankan: `sudo certbot --nginx`
   - Periksa tanggal kedaluwarsa: `sudo certbot certificates`

5. **Peringatan EBADENGINE saat npm install**:
   - Ini terjadi karena ketidakcocokan versi Node.js dengan yang dibutuhkan oleh Vite dan plugin Vue
   - Solusi: Upgrade Node.js ke versi 20.x atau lebih baru dengan perintah:
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
     sudo apt install -y nodejs
     ```
   - Alternatif: Downgrade Vite dan plugin Vue di package.json ke versi yang kompatibel dengan Node.js 18.x

## Kesimpulan

Selamat! Anda telah berhasil men-deploy aplikasi MindTune ke VPS Hostinger. Aplikasi Anda sekarang dapat diakses melalui domain yang telah dikonfigurasi dengan koneksi aman (HTTPS).

Untuk bantuan lebih lanjut, Anda dapat menghubungi dukungan Hostinger atau merujuk ke dokumentasi resmi Vue.js dan Nginx.