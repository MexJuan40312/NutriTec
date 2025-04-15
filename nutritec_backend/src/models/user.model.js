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
    }
};

module.exports = User;