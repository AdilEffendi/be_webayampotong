// index.cjs
// 1) Load ENV
require('dotenv').config();

(async () => {
  // 2) Import hanya untuk menjalankan kode di app.js (yang sudah memanggil listen)
  await import('./app.js');
})().catch(err => {
  console.error('Failed to start app.js:', err);
  process.exit(1);
});