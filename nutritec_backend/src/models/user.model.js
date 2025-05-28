const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
    createUser: async (name, email, password) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
            return result;
        } catch (err) {
            throw err;
        }
    },

    createUserWithVerification: async (name, email, password, verificationToken, isVerified) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Contraseña plana (en modelo):', password);
            console.log('Contraseña hasheada (en modelo):', hashedPassword);
            const [result] = await db.execute('INSERT INTO users (name, email, password, verification_token, is_verified) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, verificationToken, isVerified]);
            return result;
        } catch (err) {
            throw err;
        }
    },

    findUserById: async (id) => {
        try {
            const [results] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
            return results[0] || null;
        } catch (err) {
            throw err;
        }
    },

    findUserByEmail: async (email) => {
        try {
            const [results] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
            return results[0] || null;
        } catch (err) {
            throw err;
        }
    },

    findUserByEmailPromise: async (email) => {
        try {
            const [results] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
            return results[0] || null;
        } catch (err) {
            throw err;
        }
    },

    getAllUsers: async () => {
        try {
            const [results] = await db.execute('SELECT * FROM users');
            return results;
        } catch (err) {
            throw err;
        }
    },

    // Restablecimiento de contraseña
    updatePasswordResetToken: async (userId, token, expiresAt) => {
        try {
            const [result] = await db.execute(
                'UPDATE users SET password_reset_token = ?, password_reset_expires_at = ? WHERE id = ?',
                [token, expiresAt, userId]
            );
            return result;
        } catch (err) {
            throw err;
        }
    },

    findUserByPasswordResetToken: async (token) => {
        try {
            const [results] = await db.execute(
                'SELECT * FROM users WHERE password_reset_token = ? AND password_reset_expires_at > NOW()',
                [token]
            );
            return results[0] || null;
        } catch (err) {
            throw err;
        }
    },

    updateUserPassword: async (userId, hashedPassword) => { // ¡Aquí he cambiado el nombre del parámetro a 'hashedPassword'!
        try {
            // Ya no necesitas hashear aquí, porque el controlador ya te envió el hash
            const [result] = await db.execute(
                'UPDATE users SET password = ?, password_reset_token = NULL, password_reset_expires_at = NULL WHERE id = ?',
                [hashedPassword, userId] // Usa directamente hashedPassword aquí
            );
            return result;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = User;