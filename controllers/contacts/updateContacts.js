import express from 'express';

import { updateContact } from '../../models/contacts.js';

import { schemaPut } from '../../validation/validation.js';

const router = express.Router();

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await schemaPut.validateAsync(req.body);
    const response = await updateContact(contactId, updatedContact);

    if (response === 'Contact updated') {
      res.status(200).json({ message: 'Contact updated' });
    } else if (response === 'Not found') {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Missing fields' });
    console.log(error);
  }
});

export { router };
