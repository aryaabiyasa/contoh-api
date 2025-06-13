import mobilModel from '../data/mobil.js';

export const getAllMobils = (req, res) => {
  try {
    const data = mobilModel.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMobilById = (req, res) => {
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

export const createMobil = (req, res) => {
  try {
    const userId = req.headers.authorization;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Akses tidak sah (unauthorized)" });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gambar wajib diunggah"
      });
    }

    const { nama, harga } = req.body;

    if (!nama || !harga) {
      return res.status(400).json({
        success: false,
        message: "Nama dan harga wajib diisi"
      });
    }

    const newMobilData = {
      nama: nama,
      harga: parseInt(harga, 10),
      foto: req.file.filename,
      userId: userId
    };

    const newMobil = mobilModel.create(newMobilData);
    res.status(201).json({ success: true, data: newMobil });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal menambah mobil" }); 
  }
};

export const updateMobil = (req, res) => {
  try {
    const userId = req.headers.authorization;
    const mobilId = parseInt(req.params.id);
    const mobil = mobilModel.getById(mobilId);

    if (!mobil) {
      return res.status(404).json({ success: false, message: "Mobil tidak ditemukan" });
    }

    if (mobil.userId !== userId) {
      return res.status(403).json({ success: false, message: "Anda tidak punya hak untuk mengubah data ini" });
    }

    const updatedMobil = mobilModel.update(mobilId, req.body);
    res.json({ success: true, data: updatedMobil });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal update mobil" }); 
  }
};

export const deleteMobil = (req, res) => {
  try {
    const userId = req.headers.authorization;
    const mobilId = parseInt(req.params.id);
    const mobil = mobilModel.getById(mobilId);

    if (!mobil) {
      return res.status(404).json({ success: false, message: "Mobil tidak ditemukan" });
    }
    
    if (mobil.userId !== userId) {
        return res.status(403).json({ success: false, message: "Anda tidak punya hak untuk menghapus data ini" });
    }

    const deletedMobil = mobilModel.delete(mobilId);
    res.json({ success: true, message: "Mobil berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menghapus mobil" }); 
  }
};