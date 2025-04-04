const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el email ya existe
    User.findUserByEmail(email, (err, existingUser) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (existingUser) return res.status(400).json({ error: 'El email ya está registrado' });

        // Crear usuario en la BD
        User.createUser(name, email, password, (err, userId) => {
            if (err) {
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado correctamente', userId });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    User.findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

        // Comparar la contraseña ingresada con la almacenada
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Error al verificar la contraseña' });
            if (!isMatch) return res.status(401).json({ error: 'Credenciales incorrectas' });

            // Crear token JWT
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            });

            res.json({ message: 'Login exitoso', token });
        });
    });
};