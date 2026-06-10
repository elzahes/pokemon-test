# Pokemon Pokedex Automation Test 🧪

Automation test untuk Portal Pokemon Pokedex menggunakan Playwright dengan fitur laporan profesional.

## 📋 Requirements

- Node.js v16 atau lebih tinggi
- npm atau yarn
- Browser Chrome/Chromium

## 🚀 Setup & Running

### Step 1: Clone Repository
```bash
git clone https://github.com/elzahes/pokemon-test.git
cd pokemon-test
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Install Playwright Browsers
```bash
npx playwright install
```

### Step 4: Jalankan Test

#### Mode Biasa (Headless - Browser tidak terlihat)
```bash
npm test
```

#### Mode Headed (Lihat browser berjalan)
```bash
npm run test:headed
```

#### Mode Debug (Interactive)
```bash
npm run test:debug
```

#### Lihat Laporan HTML
Setelah test selesai:
```bash
npm run report
```

## 📂 Output Struktur

Setelah test selesai, hasil akan disimpan di folder `Results_[timestamp]`:

```
Results_2024-01-15T10-30-45-123Z/
├── PDF/
│   └── Laporan_Pengujian_2024-01-15T10-30-45-123Z.pdf
├── Screenshots/
│   ├── Akses_Portal_Pokedex_ID_2024-01-15T10-30-45-123Z.png
│   ├── Input_Kata_Kunci_2024-01-15T10-30-45-123Z.png
│   ├── Submit_Pencarian_2024-01-15T10-30-45-123Z.png
│   ├── Pilih_Hasil_Pokemon_2024-01-15T10-30-45-123Z.png
│   └── Kembali_ke_Daftar_2024-01-15T10-30-45-123Z.png
└── Videos/
    └── Video_Execution_2024-01-15T10-30-45-123Z.webm
```

## 📝 Test Case Details

| Field | Value |
|-------|-------|
| **Tester** | Elzah |
| **Role** | Engineer |
| **Instansi** | QA Automation Dept |
| **Project** | Pokemon Web & Pokedex |
| **Test Case** | Search Pikachu Testcase |

## 🔍 Test Steps yang Dijalankan

1. **Akses Portal Pokedex ID**
   - URL: https://id.portal-pokemon.com/play/pokedex
   - Screenshot otomatis diambil

2. **Input Pencarian**
   - Mengisi kolom search dengan "pikachu"
   - Elemen di-highlight dengan outline merah

3. **Submit Pencarian**
   - Klik tombol cari (ikon kaca pembesar)
   - Tunggu hasil loading

4. **Pilih Pikachu Listrik**
   - Klik hasil Pikachu dari daftar
   - Screenshot diambil

5. **Kembali ke Pokedex**
   - Klik link "Kembali ke pokedex"
   - Screenshot akhir diambil

6. **Generate Laporan**
   - PDF dibuat dengan semua screenshots
   - Video execution disimpan

## 🎥 Fitur

✨ **Screenshot Automation**
- Automatic capture setiap step
- Highlight elemen yang diklik (outline merah)
- Base64 embedded dalam PDF

✨ **Video Recording**
- Automatic video recording selama execution
- Format WebM

✨ **PDF Report**
- Professional HTML to PDF conversion
- Metadata lengkap (tester, tanggal, waktu)
- Semua screenshots embedded
- Deskripsi setiap step

✨ **Error Handling**
- Try-catch untuk error management
- Console logging yang detail
- Timeout handling

✨ **Timezone Support**
- Automatic timezone Asia/Jakarta
- Timestamp akurat

## 🛠️ Troubleshooting

### Error: "npm: command not found"
✅ **Solusi**: Install Node.js dari https://nodejs.org/

### Error: "Element not found"
✅ **Solusi**: 
- Jalankan dengan `npm run test:headed` untuk lihat browser
- Check apakah selector masih valid
- Periksa website https://id.portal-pokemon.com/play/pokedex

### Error: "Navigation timeout"
✅ **Solusi**:
- Website mungkin down/lambat
- Check koneksi internet
- Coba jalankan lagi

### Error: "Cannot find module"
✅ **Solusi**:
```bash
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

### Video/Screenshot tidak tersimpan
✅ **Solusi**:
- Periksa folder permissions
- Check disk space
- Pastikan folder writable

## 📊 Lihat Hasil Test

### 1. Buka PDF Report
```bash
# Windows
start Results_*/PDF/*.pdf

# macOS
open Results_*/PDF/*.pdf

# Linux
xdg-open Results_*/PDF/*.pdf
```

### 2. Lihat Screenshots
```bash
open Results_*/Screenshots/
```

### 3. Lihat Video
```bash
open Results_*/Videos/
```

### 4. Lihat Playwright Report
```bash
npm run report
```

## 📝 Konfigurasi

### playwright.config.ts
- Timeout: 30 detik
- Browser: Chromium
- Reporter: HTML + List + JSON
- Video: on failure

### Ubah Timeout
Edit di `playwright.config.ts`:
```typescript
timeout: 30000, // milliseconds
```

## 🔐 Security Tips

- Jangan commit folder `Results_` atau `node_modules`
- File `.gitignore` sudah dikonfigurasi
- Jangan share hasil test dengan data sensitif

## 📞 Support

**Tester:** Elzah Sentiawati  
**Role:** QA Automation Engineer  
**Project:** Pokemon Web & Pokedex Automation

## 📄 License

MIT

---

### Quick Reference

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npx playwright install` | Install browsers |
| `npm test` | Run test (headless) |
| `npm run test:headed` | Run test with browser |
| `npm run test:debug` | Debug mode |
| `npm run report` | View report |

**Selamat mencoba! 🚀**
