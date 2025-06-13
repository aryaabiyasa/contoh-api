import express from 'express';
import * as mobilController from '../controllers/mobilController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), mobilController.createMobil);

router.get('/', mobilController.getAllMobils);
router.get('/:id', mobilController.getMobilById);
router.put('/:id', mobilController.updateMobil);
router.delete('/:id', mobilController.deleteMobil);

export default router;