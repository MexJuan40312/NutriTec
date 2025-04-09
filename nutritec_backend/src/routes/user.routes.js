const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const User = require('../models/user.model');

router.get('/', verifyToken, userController.getUsers); 

// Ruta protegida: perfil del usuario autenticado
router.get('/profile', verifyToken, (req, res) => {
    const userId = req.user.id;
  
    User.findUserById(userId, (err, user) => {
      if (err) return res.status(500).json({ error: 'Error al obtener el perfil' });
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  
      // Excluir contraseña del perfil
      const { password, ...userData } = user;
      res.json({ profile: userData });
    });
  });

module.exports = router;
