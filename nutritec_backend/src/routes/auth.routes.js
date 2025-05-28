// backend/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const db = require('../config/database'); // Asegúrate de que esta ruta sea correcta

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Verificación de cuenta por token
router.get('/verify', async (req, res) => {
    const { token } = req.query;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE verification_token = ?', [token]);

        // Si el token no existe o no se encuentra el usuario
        if (rows.length === 0) {
            const frontendBaseUrl = process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000';
            return res.redirect(`${frontendBaseUrl}/auth/login?error=invalid_token`);
        }

        // Marcar usuario como verificado y limpiar token
        await db.execute('UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?', [rows[0].id]);

        // Redirige al login del frontend con un mensaje de éxito
        const frontendBaseUrl = process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000';
        res.redirect(`${frontendBaseUrl}/auth/login?verified=true`);

    } catch (error) {
        console.error('Error al verificar la cuenta:', error);
        // En caso de error, redirige al login con un mensaje de error genérico
        const frontendBaseUrl = process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000';
        return res.redirect(`${frontendBaseUrl}/auth/login?error=verification_failed`);
    }
});

module.exports = router;