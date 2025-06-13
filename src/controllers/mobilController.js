import supabase from '../config/supabaseClient.js';
import fs from 'fs';
import path from 'path';

export const getAllMobils = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mobils')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMobilById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mobils')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: "Mobil tidak ditemukan" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMobil = async (req, res) => {
  try {
    const { nama, harga } = req.body;
    const userId = req.headers.authorization;
    
    if (!req.file) return res.status(400).json({ success: false, message: "Gambar wajib diunggah" });
    if (!nama || !harga || !userId) return res.status(400).json({ success: false, message: "Semua field wajib diisi" });

    const fileBuffer = fs.readFileSync(req.file.path);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('foto-mobil')
      .upload(req.file.filename, fileBuffer, {
        contentType: req.file.mimetype,
      });

    if (uploadError) throw uploadError;

    fs.unlinkSync(req.file.path);

    const { data: publicUrlData } = supabase.storage
      .from('foto-mobil')
      .getPublicUrl(req.file.filename);

    const { data: insertData, error: insertError } = await supabase
      .from('mobils')
      .insert([{
        nama: nama,
        harga: parseInt(harga, 10),
        foto: publicUrlData.publicUrl,
        userId: userId
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    res.status(201).json({ success: true, data: insertData });

  } catch (error) {
    console.error("Error creating mobil:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMobil = async (req, res) => {
  res.status(501).json({ success: false, message: "Fitur update belum diimplementasikan" });
};

export const deleteMobil = async (req, res) => {
  try {
    const mobilId = parseInt(req.params.id, 10);
    const userId = req.headers.authorization;

    const { data: mobil, error: fetchError } = await supabase
      .from('mobils')
      .select('userId, foto')
      .eq('id', mobilId)
      .single();

    if (fetchError || !mobil) return res.status(404).json({ success: false, message: "Mobil tidak ditemukan" });
    if (mobil.userId !== userId) return res.status(403).json({ success: false, message: "Anda tidak punya hak untuk menghapus data ini" });

    const fileName = path.basename(mobil.foto);
    if (fileName) {
        await supabase.storage.from('foto-mobil').remove([fileName]);
    }

    const { error: deleteError } = await supabase
      .from('mobils')
      .delete()
      .eq('id', mobilId);

    if (deleteError) throw deleteError;
    
    res.json({ success: true, message: "Mobil berhasil dihapus" });

  } catch (error) {
    console.error("Error deleting mobil:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};