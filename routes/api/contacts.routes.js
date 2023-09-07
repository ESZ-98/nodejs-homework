const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contacts.controller');
const authMiddleware = require('../../auth/auth');

router.get('/contacts', authMiddleware, contactsController.get);

router.get('/contacts/:contactId', authMiddleware, contactsController.getById);

router.post('/contacts', authMiddleware, contactsController.create);

router.put('/contacts/:contactId', authMiddleware, contactsController.update);

router.patch('/contacts/:contactId/favorite', authMiddleware, contactsController.updateFavorite);

router.delete('/contacts/:contactId', authMiddleware, contactsController.remove);

module.exports = router;
