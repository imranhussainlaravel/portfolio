const { chromium } = require('playwright');
const path = require('path');

async function generateCover() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 1,
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1600px;
      height: 900px;
      overflow: hidden;
      background: #0c0f18;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .card {
      width: 1600px;
      height: 900px;
      position: relative;
      background: linear-gradient(135deg, #0c0f18 0%, #171836 40%, #2a2862 75%, #3e3e96 100%);
    }
    .dots {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px);
      background-size: 32px 32px;
      pointer-events: none;
    }
    .glow {
      position: absolute;
      right: 4%;
      bottom: 4%;
      width: 650px;
      height: 650px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(120, 110, 245, 0.22) 0%, transparent 70%);
      pointer-events: none;
      filter: blur(50px);
    }
    .accent-bar {
      position: absolute;
      left: 115px;
      top: 320px;
      width: 5px;
      height: 86px;
      background: #868be7;
      border-radius: 3px;
    }
    .title {
      position: absolute;
      left: 165px;
      top: 322px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 56px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }
    .subtitle {
      position: absolute;
      left: 165px;
      top: 412px;
      font-size: 26px;
      font-weight: 400;
      color: #a5b4fc;
      letter-spacing: -0.01em;
    }
    .stack {
      position: absolute;
      left: 165px;
      top: 502px;
      font-size: 19px;
      font-weight: 500;
      color: #818cf8;
      letter-spacing: 0.04em;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="dots"></div>
    <div class="glow"></div>
    <div class="accent-bar"></div>
    <h1 class="title">Netlik Light House</h1>
    <p class="subtitle">B2B Electrical &amp; Lighting Wholesale Platform + Admin</p>
    <p class="stack">Next.js · TypeScript · Tailwind CSS · SQLite</p>
  </div>
</body>
</html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle' });
  const outputPath = path.resolve('public/images/projects/netlik/cover-01.jpg');
  await page.screenshot({
    path: outputPath,
    type: 'jpeg',
    quality: 95,
  });
  console.log('Successfully generated ' + outputPath);
  await browser.close();
}

generateCover().catch(err => {
  console.error(err);
  process.exit(1);
});
