import express from 'express';
import bodyParser from 'body-parser';
import mobilRoutes from './routes/mobilRoutes.js';
import path from 'path'; // Import path
import { fileURLToPath } from 'url'; // Import untuk __dirname

const app = express();
const PORT = process.env.PORT || 3000;

// Helper untuk mendapatkan __dirname di ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());

// --- TAMBAHKAN BARIS INI ---
// Sajikan file statis dari folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// ----------------------------

app.use('/api/mobils', mobilRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});