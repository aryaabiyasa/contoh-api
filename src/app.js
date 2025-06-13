import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mobilRoutes from './routes/mobilRoutes.js';

app.use(bodyParser.json());

app.use('/api/mobils', mobilRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

export default app;