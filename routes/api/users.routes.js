const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');
const authMiddleware = require('../../auth/auth');

router.post('/users/signup', usersController.signupUser);
router.post('/users/login', usersController.loginUser);
router.get('/users/logout', authMiddleware, usersController.logoutUser);
router.get('/users/current', authMiddleware, usersController.currentUser);

module.exports = router;
