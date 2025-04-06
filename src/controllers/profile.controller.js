const Profile = require('../models/profile.model');

exports.createProfile = (req, res) => {
  const user_id = req.user.id;
  const profileData = { ...req.body, user_id };

  Profile.createProfile(profileData, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear el perfil' });
    res.status(201).json({ message: 'Perfil creado correctamente' });
  });
};

exports.getProfile = (req, res) => {
  const user_id = req.user.id;

  Profile.getProfileByUserId(user_id, (err, profile) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el perfil' });
    if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });
    res.json(profile);
  });
};

exports.updateProfile = (req, res) => {
  const user_id = req.user.id;
  const profileData = req.body;

  Profile.updateProfile(user_id, profileData, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el perfil' });
    res.json({ message: 'Perfil actualizado correctamente' });
  });
};
