import express from 'express';

import { removeContact } from '../../models/contacts.js';

const router = express.Router();

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const response = await removeContact(contactId);
  response
    ? res.status(200).json({ message: 'Contact deleted' })
    : res.status(404).json({ message: 'Not found' });
});

export { router };
