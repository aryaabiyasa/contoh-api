import supabase from '../config/supabaseClient.js';
import fs from 'fs';
import path from 'path';

// GET semua mobil
export const getAllMobils = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mobils')
      .select('*');

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET mobil berdasarkan ID
export const getMobilById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mobils')
      .select('*')
      .eq('id', req.params.id)
      .single(); // .single() untuk mendapatkan satu objek, bukan array

    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: "Mobil tidak ditemukan" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE mobil baru dengan upload gambar
export const createMobil = async (req, res) => {
  try {
    const { nama, harga } = req.body;
    const userId = req.headers.authorization;
    
    if (!req.file) return res.status(400).json({ success: false, message: "Gambar wajib diunggah" });
    if (!nama || !harga || !userId) return res.status(400).json({ success: false, message: "Semua field wajib diisi" });

    // 1. Unggah file ke Supabase Storage
    const fileBuffer = fs.readFileSync(req.file.path);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('foto-mobil') // Nama bucket Anda
      .upload(req.file.filename, fileBuffer, {
        contentType: req.file.mimetype,
      });

    if (uploadError) throw uploadError;

    // Hapus file sementara dari folder /uploads
    fs.unlinkSync(req.file.path);

    // 2. Dapatkan URL publik dari gambar yang diunggah
    const { data: publicUrlData } = supabase.storage
      .from('foto-mobil')
      .getPublicUrl(req.file.filename);

    // 3. Simpan data teks beserta URL gambar ke database
    const { data: insertData, error: insertError } = await supabase
      .from('mobils')
      .insert([{
        nama: nama,
        harga: parseInt(harga, 10),
        foto: publicUrlData.publicUrl, // Simpan URL publiknya
        userId: userId
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    res.status(201).json({ success: true, data: insertData });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// UPDATE mobil
export const updateMobil = async (req, res) => {
  // Logika update bisa ditambahkan di sini, mirip dengan create dan delete
  res.status(501).json({ success: false, message: "Fitur update belum diimplementasikan" });
};


// DELETE mobil
export const deleteMobil = async (req, res) => {
  try {
    const mobilId = parseInt(req.params.id, 10);
    const userId = req.headers.authorization;

    // Verifikasi kepemilikan sebelum menghapus
    const { data: mobil, error: fetchError } = await supabase
      .from('mobils')
      .select('userId, foto')
      .eq('id', mobilId)
      .single();

    if (fetchError || !mobil) return res.status(404).json({ success: false, message: "Mobil tidak ditemukan" });
    if (mobil.userId !== userId) return res.status(403).json({ success: false, message: "Anda tidak punya hak untuk menghapus data ini" });

    // Hapus gambar dari Supabase Storage
    const fileName = path.basename(mobil.foto);
    await supabase.storage.from('foto-mobil').remove([fileName]);

    // Hapus data dari database
    const { error: deleteError } = await supabase
      .from('mobils')
      .delete()
      .eq('id', mobilId);

    if (deleteError) throw deleteError;
    
    res.json({ success: true, message: "Mobil berhasil dihapus" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};