import express from 'express';
const router = express.Router();
import usersController from '../../controllers/users.controller.js';
import { authMiddleware } from '../../auth/auth.js';
import { upload } from '../../auth/upload.js';

router.post('/users/signup', usersController.signupUser);
router.post('/users/login', usersController.loginUser);
router.get('/users/logout', authMiddleware, usersController.logoutUser);
router.get('/users/current', authMiddleware, usersController.currentUser);
router.patch(
  '/users/avatars',
  authMiddleware,
  upload.single('picture', usersController.updateAvatars)
);

export { router };
