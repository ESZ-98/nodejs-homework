import express from 'express';
const router = express.Router();
import usersController from '../../controllers/users.controller.js';
import { authMiddleware } from '../../auth/auth.js';
import { upload } from '../../auth/upload.js';

router.post('/users/signup', usersController.signupUser);
router.post('/users/login', usersController.loginUser);
router.post('/users/verify', usersController.reverifyEmail);
router.get('/users/logout', authMiddleware, usersController.logoutUser);
router.get('/users/current', authMiddleware, usersController.currentUser);
router.get('/users/verify/:verificationToken', usersController.verifyEmail);
router.patch(
  '/users/avatars',
  authMiddleware,
  upload.single('avatar'),
  usersController.updateAvatars
);

export { router };
