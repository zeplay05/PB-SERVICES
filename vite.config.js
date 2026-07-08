import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

try {
  const src = "c:\\Users\\Mewie\\Downloads\\0bf01764-84f2-4916-a20b-1e8e99ddea63.png";
  const dest = path.resolve("public/logo.png");
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("Successfully copied logo image to public/logo.png");
  } else {
    console.error("Source logo file does not exist at:", src);
  }
} catch (err) {
  console.error("Error copying logo:", err);
}

try {
  const qrSrc = "c:\\Users\\Mewie\\Downloads\\6d37a346-fc05-4148-8302-e78f32a1cf2e.png";
  const qrDest = path.resolve("public/promptpay-qr.png");
  if (fs.existsSync(qrSrc)) {
    fs.copyFileSync(qrSrc, qrDest);
    console.log("Successfully copied QR code image to public/promptpay-qr.png");
  } else {
    console.error("Source QR code file does not exist at:", qrSrc);
  }
} catch (err) {
  console.error("Error copying QR code:", err);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
