const express = require('express');
const router = express.Router();
const mobilController = require('../controllers/mobilController');

router.get('/', mobilController.getAllMobils);
router.get('/:id', mobilController.getMobilById);
router.post('/', mobilController.createMobil);
router.put('/:id', mobilController.updateMobil);
router.delete('/:id', mobilController.deleteMobil);

module.exports = router;