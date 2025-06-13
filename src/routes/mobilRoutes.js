import express from 'express';
import * as mobilController from '../controllers/mobilController.js';
import multer from 'multer';

const router = express.Router();

// --- UBAH BAGIAN INI ---
// Gunakan memoryStorage untuk menyimpan file sebagai buffer di memori
const upload = multer({ storage: multer.memoryStorage() });
// -----------------------

// Rute lain tetap sama, pastikan rute POST ada di atas GET agar tidak salah tangkap
router.post('/', upload.single('image'), mobilController.createMobil);
router.get('/', mobilController.getAllMobils);
router.get('/:id', mobilController.getMobilById);
router.put('/:id', mobilController.updateMobil);
router.delete('/:id', mobilController.deleteMobil);

export default router;