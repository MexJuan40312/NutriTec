const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/email');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const existingUser = await User.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña PLANA aquí
        const verificationToken = crypto.randomUUID();

        // Pasa la contraseña PLANA (original) a createUserWithVerification
        await User.createUserWithVerification(name, email, password, verificationToken, false);
        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({ message: 'Usuario registrado. Revisa tu correo para activar la cuenta.' });

    } catch (error) {
        console.error('Error durante el registro:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Este correo ya está registrado' });
        }

        return res.status(500).json({ error: 'Error interno del servidor. Intenta más tarde.' });
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    try {
        const user = await User.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Cuenta no encontrada' });
        }

        if (!user.is_verified) {
            return res.status(401).json({ error: 'Cuenta no verificada' });
        }

        // Mueve las líneas de depuración y la comparación aquí
        console.log('Contraseña ingresada:', password);
        console.log('Contraseña hasheada de la DB:', user.password);
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
