const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  createUser: (name, email, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err, null);

      const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(sql, [name, email, hashedPassword], callback);
    });
  },

  findUserById: (id, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },  

  findUserByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null); // Usuario no encontrado
      callback(null, results[0]); // Retorna el usuario encontrado
    });
  },
  getAllUsers: (callback) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
}
};

module.exports = User;
