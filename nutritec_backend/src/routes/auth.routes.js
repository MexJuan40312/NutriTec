const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const db = require('../config/database');

// Registro y login
router.post('/register', authController.register);
router.post('/login', authController.login);

// Verificación de cuenta por token
router.get('/verify', async (req, res) => {
    const { token } = req.query;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE verification_token = ?', [token]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        await db.execute('UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?', [rows[0].id]);

        res.redirect('http://localhost:3000/auth/login?verified=true');

    } catch (error) {
        console.error('Error al verificar la cuenta:', error);
        return res.status(500).json({ message: 'Error al verificar la cuenta' });
    }
});

module.exports = router;