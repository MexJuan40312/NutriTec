const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const profileRoutes = require('./profile.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/profile', profileRoutes); // <-- agregamos esta línea

module.exports = router;
