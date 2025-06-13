let players = [
  {
    id: 1,
    nama: "Ederson",
    harga: 50000000,
    foto: "https://assets.goal.com/images/v3/blt87c22cc9bccdda92/GOAL%20-%20Blank%20WEB%20-%20Facebook%20(65).png?auto=webp&format=pjpg&width=1080&quality=60"
  },
  {
    id: 2,
    nama: "Kyle Walker",
    harga: 15000000,
    foto: "https://img.a.transfermarkt.technology/portrait/big/95424-1668090663.jpg?lm=1"
  },
  {
    id: 3,
    nama: "Rúben Dias",
    harga: 75000000,
    foto: "https://img.a.transfermarkt.technology/portrait/big/258004-1684921271.jpg?lm=1"
  }
];

module.exports = {
  getAll: () => players,
  getById: (id) => players.find(p => p.id === id),
  create: (newPlayer) => {
    const player = {
      id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1,
      ...newPlayer
    };
    players.push(player);
    return player;
  },
  update: (id, updatedPlayer) => {
    const index = players.findIndex(p => p.id === id);
    if (index !== -1) {
      players[index] = { ...players[index], ...updatedPlayer };
      return players[index];
    }
    return null;
  },
  delete: (id) => {
    const index = players.findIndex(p => p.id === id);
    if (index !== -1) {
      return players.splice(index, 1)[0];
    }
    return null;
  }
};
