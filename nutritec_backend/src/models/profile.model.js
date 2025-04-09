const db = require('../config/database');

const Profile = {
  createProfile: (data, callback) => {
    const {
      user_id, weight, height, age, gender,
      activity_level, goal, is_vegan,
      has_allergies, allergies, medical_conditions
    } = data;

    const sql = `
      INSERT INTO user_profiles (
        user_id, weight, height, age, gender,
        activity_level, goal, is_vegan, has_allergies,
        allergies, medical_conditions
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      user_id, weight, height, age, gender,
      activity_level, goal, is_vegan, has_allergies,
      allergies, medical_conditions
    ], callback);
  },

  getProfileByUserId: (user_id, callback) => {
    const sql = 'SELECT * FROM user_profiles WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },

  updateProfile: (user_id, data, callback) => {
    const sql = `
      UPDATE user_profiles
      SET weight = ?, height = ?, age = ?, gender = ?, activity_level = ?,
          goal = ?, is_vegan = ?, has_allergies = ?, allergies = ?, medical_conditions = ?
      WHERE user_id = ?
    `;

    db.query(sql, [
      data.weight, data.height, data.age, data.gender, data.activity_level,
      data.goal, data.is_vegan, data.has_allergies, data.allergies, data.medical_conditions,
      user_id
    ], callback);
  }
};

module.exports = Profile;
