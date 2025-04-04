const User = require('../models/user.model');

exports.getUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

