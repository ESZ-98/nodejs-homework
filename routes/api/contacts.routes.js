import express from 'express';
const router = express.Router();
import contactsController from '../../controllers/contacts.controller.js';
import {authMiddleware} from '../../auth/auth.js';

router.get('/contacts', authMiddleware, contactsController.get);

router.get('/contacts/:contactId', authMiddleware, contactsController.getById);

router.post('/contacts', authMiddleware, contactsController.create);

router.put('/contacts/:contactId', authMiddleware, contactsController.update);

router.patch('/contacts/:contactId/favorite', authMiddleware, contactsController.updateFavorite);

router.delete('/contacts/:contactId', authMiddleware, contactsController.remove);

export {router};
