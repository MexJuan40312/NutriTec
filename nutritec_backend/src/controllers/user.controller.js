const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener el perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { password, verification_token, ...userData } = user; 
    res.json({ profile: userData });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};
