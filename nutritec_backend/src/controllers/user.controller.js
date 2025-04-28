const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NUEVO: obtener el perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { password, verification_token, ...userData } = user; // Ocultamos campos sensibles
    res.json({ profile: userData });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};
