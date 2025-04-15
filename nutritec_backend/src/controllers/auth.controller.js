const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // Importa el módulo crypto para generar tokens
const { sendVerificationEmail } = require('../utils/email'); // Asegúrate de que la ruta al archivo email.js sea correcta
const db = require('../config/database'); // Importa tu conexión a la base de datos

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const existingUser = await User.findUserByEmailPromise(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomUUID();

        await User.createUserWithVerification(name, email, hashedPassword, verificationToken, false);

        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({ message: 'Usuario registrado. Revisa tu correo para activar la cuenta.' });

    } catch (error) {
        console.error('Error durante el registro:', error);
        return res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    try {
        const user = await User.findUserByEmail(email);
        if (!user || !user.is_verified) {
            return res.status(401).json({ error: 'Credenciales incorrectas o cuenta no verificada' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.json({ message: 'Login exitoso', token });

    } catch (error) {
        console.error('Error durante el login:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};