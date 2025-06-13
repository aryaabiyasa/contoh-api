import express from 'express';
import * as mobilController from '../controllers/mobilController.js';

const router = express.Router();

router.get('/', mobilController.getAllMobils);
router.get('/:id', mobilController.getMobilById);
router.post('/', mobilController.createMobil);
router.put('/:id', mobilController.updateMobil);
router.delete('/:id', mobilController.deleteMobil);

export default router;