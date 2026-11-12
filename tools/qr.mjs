// Prints an inline SVG QR code for a URL. Usage: npm i qrcode-generator && node tools/qr.mjs <url>
// The QR on the start page leads to the sample test (probe.html). Regenerate it when the site address changes.
import qrcode from 'qrcode-generator';
const url = process.argv[2];
if (!url) { console.error('usage: node tools/qr.mjs <url>'); process.exit(1); }
const qr = qrcode(0, 'M'); qr.addData(url); qr.make();
const n = qr.getModuleCount(); let d = '';
for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (qr.isDark(y, x)) d += `M${x} ${y}h1v1h-1z`;
console.log(`<svg class="pic qr" viewBox="-2 -2 ${n + 4} ${n + 4}" role="img" aria-label="QR-Code zum Probetest"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" rx="2.5" fill="#fff"/><path fill="#1d1d1f" d="${d}"/></svg>`);
