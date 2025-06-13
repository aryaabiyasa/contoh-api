const playerModel = require('../data/players');

const getAllPlayers = (req, res) => {
  try {
    const data = playerModel.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getPlayerById = (req, res) => {
  try {
    const player = playerModel.getById(parseInt(req.params.id));
    if (!player) {
      return res.status(404).json({ 
        success: false, 
        message: "Pemain tidak ditemukan" 
      });
    }
    res.json({ success: true, data: player });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createPlayer = (req, res) => {
  try {
    // Validasi sederhana
    if (!req.body.nama || !req.body.posisi) {
      return res.status(400).json({
        success: false,
        message: "Nama dan posisi wajib diisi"
      });
    }

    const newPlayer = playerModel.create(req.body);
    res.status(201).json({ success: true, data: newPlayer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menambah pemain" });
  }
};

const updatePlayer = (req, res) => {
  try {
    const updatedPlayer = playerModel.update(
      parseInt(req.params.id),
      req.body
    );
    
    if (!updatedPlayer) {
      return res.status(404).json({
        success: false,
        message: "Pemain tidak ditemukan"
      });
    }
    
    res.json({ success: true, data: updatedPlayer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal update pemain" });
  }
};

const deletePlayer = (req, res) => {
  try {
    const deletedPlayer = playerModel.delete(parseInt(req.params.id));
    
    if (!deletedPlayer) {
      return res.status(404).json({
        success: false,
        message: "Pemain tidak ditemukan"
      });
    }
    
    res.json({ 
      success: true, 
      data: deletedPlayer,
      message: "Pemain berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menghapus pemain" });
  }
};

const players = require('../data/players');

exports.updatePlayer = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = players.update(id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).send({ message: 'Player not found' });
  }
};


module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
};