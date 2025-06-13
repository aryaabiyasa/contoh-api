import express from 'express';
import * as mobilController from '../controllers/mobilController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    // Menentukan folder penyimpanan
    cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
    // Membuat nama file yang unik untuk menghindari konflik nama
    // Contoh: 1718274533123-avanza.png
    cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Terapkan middleware 'upload.single('image')' pada rute POST
// 'image' harus sama dengan key yang dikirim dari Android
router.post('/', upload.single('image'), mobilController.createMobil);

// Rute lain tetap sama
router.get('/', mobilController.getAllMobils);
router.get('/:id', mobilController.getMobilById);
router.put('/:id', mobilController.updateMobil);
router.delete('/:id', mobilController.deleteMobil);

export default router;