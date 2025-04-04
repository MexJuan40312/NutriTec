const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, userController.getUsers); 

module.exports = router;
