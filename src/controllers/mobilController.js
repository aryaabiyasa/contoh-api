
const mobilModel = require('../data/mobil');

const getAllMobils = (req, res) => {
  try {
    const data = mobilModel.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getMobilById = (req, res) => {
  try {
    const mobil = mobilModel.getById(parseInt(req.params.id));
    if (!mobil) {
      return res.status(404).json({ 
        success: false, 
        message: "Mobil tidak ditemukan" 
      });
    }
    res.json({ success: true, data: mobil });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createMobil = (req, res) => {
  try {
    // Validasi diubah dari 'posisi' menjadi 'harga'
    if (!req.body.nama || !req.body.harga) {
      return res.status(400).json({
        success: false,
        message: "Nama dan harga wajib diisi" 
      });
    }

    const newMobil = mobilModel.create(req.body);
    res.status(201).json({ success: true, data: newMobil });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menambah mobil" }); 
  }
};

const updateMobil = (req, res) => {
  try {
    const updatedMobil = mobilModel.update(
      parseInt(req.params.id),
      req.body
    );
    
    if (!updatedMobil) {
      return res.status(404).json({
        success: false,
        message: "Mobil tidak ditemukan" 
      });
    }
    
    res.json({ success: true, data: updatedMobil });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal update mobil" }); 
  }
};

const deleteMobil = (req, res) => {
  try {
    const deletedMobil = mobilModel.delete(parseInt(req.params.id));
    
    if (!deletedMobil) {
      return res.status(404).json({
        success: false,
        message: "Mobil tidak ditemukan" 
      });
    }
    
    res.json({ 
      success: true, 
      data: deletedMobil,
      message: "Mobil berhasil dihapus" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menghapus mobil" }); 
  }
};

module.exports = {
  getAllMobils,
  getMobilById,
  createMobil,
  updateMobil,
  deleteMobil
};