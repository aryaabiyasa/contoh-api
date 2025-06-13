let mobils = [
  {
    id: 1,
    nama: "Toyota Avanza",
    harga: 250000000,
    foto: "https://d2ul0w8vif5p52.cloudfront.net/images/toyota/New-Avanza-2021/exterior/toyota-avanza-2022-tampak-depan.webp",
    userId: "user_arya_123"
  },
  {
    id: 2,
    nama: "Honda Brio",
    harga: 167900000,
    foto: "https://hondapradana.co.id/wp-content/uploads/2023/10/BRIO-SATYA-S-MT.png",
    userId: "user_budi_456"
  }
];

const mobilModel = {
  getAll: () => mobils,
  getById: (id) => mobils.find(m => m.id === id),

  
  create: (dataMobil) => {
    const mobil = {
      id: mobils.length > 0 ? Math.max(...mobils.map(m => m.id)) + 1 : 1,
      ...dataMobil
    };
    mobils.push(mobil);
    return mobil;
  },
  update: (id, updatedMobil) => {
    const index = mobils.findIndex(m => m.id === id);
    if (index !== -1) {
      mobils[index] = { ...mobils[index], ...updatedMobil };
      return mobils[index];
    }
    return null;
  },
  delete: (id) => {
    const index = mobils.findIndex(m => m.id === id);
    if (index !== -1) {
      return mobils.splice(index, 1)[0];
    }
    return null;
  }
};

export default mobilModel;