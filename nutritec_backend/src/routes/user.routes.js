const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');


router.get('/', verifyToken, userController.getUsers);

// Ruta protegida para perfil del usuario autenticado
router.get('/profile', verifyToken, userController.getProfile);

module.exports = router;
