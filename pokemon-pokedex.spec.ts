import { test, expect, Locator } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Konfigurasi bypass dan pengumpulan artifact
test.use({ 
  ignoreHTTPSErrors: true, 
  video: 'on', 
  screenshot: 'on' 
});

test('Pokemon Pokedex Automation Test - Laporan Profesional', async ({ page, context }) => {
  // 1. Metadata Laporan
  const metadata = {
    tester: "Elzah", 
    role: "Engineer",
    instansi: "QA Automation Dept", 
    project: "Pokemon Web & Pokedex",
    testCase: "Search Pikachu Testcase",
    waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
  };

  // 2. Setup Folder Hasil Test
  const fileTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseDir = path.join(process.cwd(), `Results_${fileTimestamp}`);
  const pdfDir = path.join(baseDir, 'PDF');
  const imgDir = path.join(baseDir, 'Screenshots');
  const videoDir = path.join(baseDir, 'Videos');
  
  [pdfDir, imgDir, videoDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const steps: { name: string; description: string; file: string }[] = [];

  // --- FUNGSI HELPER VISUAL ---
  const highlight = async (locator: Locator) => {
    await locator.evaluate(el => {
      (el as HTMLElement).style.outline = '3px solid red';
      (el as HTMLElement).style.outlineOffset = '2px';
    });
  };

  const captureStep = async (name: string, description: string, locator?: Locator) => {
    if (locator) {
      await locator.scrollIntoViewIfNeeded();
      await highlight(locator);
    }
    await page.waitForTimeout(500); // Tunggu highlight terlihat
    const fileName = `${name.replace(/\s+/g, '_')}_${fileTimestamp}.png`;
    const filePath = path.join(imgDir, fileName);
    await page.screenshot({ path: filePath });
    steps.push({ name, description, file: fileName });
  };

  // --- ALUR PENGUJIAN ---
  try {
    // Langkah 1: Akses Portal Pokedex ID
    await page.goto('https://id.portal-pokemon.com/play/pokedex', { waitUntil: 'networkidle' });
    await captureStep('Akses Portal Pokedex ID', 'Membuka URL Portal Pokemon regional Indonesia.');

    // Langkah 2: Input Pencarian
    const searchInput = page.locator('#search_input');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.click();
    await searchInput.fill('pikachu');
    await captureStep('Input Kata Kunci', 'Memasukkan nama pokemon (Pikachu) ke kolom pencarian.', searchInput);

    // Langkah 3: Klik Tombol Cari
    const searchBtn = page.locator('.pokemon-search__form--button > img');
    await captureStep('Submit Pencarian', 'Menekan tombol cari (ikon kaca pembesar).', searchBtn);
    await searchBtn.click();
    await page.waitForTimeout(2000); // Tunggu hasil loading

    // Langkah 4: Klik Hasil Pencarian (Pikachu Listrik)
    const pikachuLink = page.getByRole('link', { name: 'Pikachu Listrik' });
    await pikachuLink.waitFor({ state: 'visible', timeout: 10000 });
    await captureStep('Pilih Hasil Pokemon', 'Mengklik kartu pokemon Pikachu Listrik dari daftar hasil.', pikachuLink);
    await pikachuLink.click();
    await page.waitForTimeout(2000);

    // Langkah 5: Kembali ke Pokedex
    const backBtn = page.getByRole('link', { name: 'Kembali ke pokedex' });
    await backBtn.waitFor({ state: 'visible', timeout: 10000 });
    await captureStep('Kembali ke Daftar', 'Mengklik link kembali untuk kembali ke halaman daftar Pokedex.', backBtn);
    await backBtn.click();

    // --- PEMBUATAN LAPORAN PDF ---
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>E-Report Automation Test</title>
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, sans-serif; 
              padding: 40px; 
              color: #333; 
              line-height: 1.6; 
            }
            .header { 
              border-bottom: 4px solid #004d40; 
              margin-bottom: 30px; 
              padding-bottom: 10px; 
            }
            .header h1 { 
              margin: 0 0 10px 0; 
              color: #004d40; 
            }
            .meta-table { 
              width: 100%; 
              margin-bottom: 40px; 
              background: #f9f9f9; 
              padding: 15px; 
              border-radius: 8px; 
              border-collapse: collapse;
            }
            .meta-table td { 
              padding: 8px 10px; 
              border-bottom: 1px solid #ddd;
            }
            .label { 
              font-weight: bold; 
              width: 180px; 
              color: #004d40; 
            }
            .step-box { 
              margin-bottom: 50px; 
              page-break-after: always; 
              border: 1px solid #eee; 
              padding: 20px; 
              border-radius: 10px; 
            }
            .step-title { 
              font-size: 20px; 
              color: #004d40; 
              font-weight: bold; 
              margin-bottom: 10px; 
              border-bottom: 1px solid #eee; 
              padding-bottom: 5px; 
            }
            .step-desc { 
              font-style: italic; 
              color: #666; 
              margin-bottom: 15px; 
              background: #fffde7; 
              padding: 10px; 
              border-left: 4px solid #fbc02d; 
            }
            img { 
              width: 100%; 
              border-radius: 5px; 
              border: 1px solid #ddd; 
              margin-top: 10px;
            }
            .footer { 
              text-align: center; 
              font-size: 12px; 
              color: #999; 
              margin-top: 30px; 
              border-top: 1px solid #eee;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>E-REPORT AUTOMATION TEST</h1>
            <p>Laporan Resmi Pengujian Sistem - ${metadata.project}</p>
          </div>
          <table class="meta-table">
            <tr><td class="label">Nama Test Case</td><td>: ${metadata.testCase}</td></tr>
            <tr><td class="label">Tester</td><td>: ${metadata.tester} (${metadata.role})</td></tr>
            <tr><td class="label">Instansi</td><td>: ${metadata.instansi}</td></tr>
            <tr><td class="label">Waktu Eksekusi</td><td>: ${metadata.waktu} WIB</td></tr>
          </table>
          
          ${steps.map((s, i) => `
            <div class="step-box">
              <div class="step-title">Langkah ${i + 1}: ${s.name}</div>
              <div class="step-desc"><strong>Deskripsi:</strong> ${s.description}</div>
              <img src="data:image/png;base64,${fs.readFileSync(path.join(imgDir, s.file)).toString('base64')}">
            </div>
          `).join('')}
          
          <div class="footer">
            Dokumen ini dibuat secara otomatis oleh sistem Playwright Automation.
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
    const pdfPath = path.join(pdfDir, `Laporan_Pengujian_${fileTimestamp}.pdf`);
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }
    });

    // Capture video
    const videoPath = await page.video()?.path();
    if (videoPath) {
      fs.copyFileSync(videoPath, path.join(videoDir, `Video_Execution_${fileTimestamp}.webm`));
    }
    
    console.log(`✅ Pengujian selesai Elzah! Hasil tersimpan di: ${baseDir}`);
    console.log(`📊 PDF Report: ${pdfPath}`);
    console.log(`📸 Screenshots: ${imgDir}`);
    console.log(`🎥 Videos: ${videoDir}`);

  } catch (error) {
    console.error(`❌ Error dalam pengujian:`, error);
    throw error;
  } finally {
    await context.close();
  }
});
