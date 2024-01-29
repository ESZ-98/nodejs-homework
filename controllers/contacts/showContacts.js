import express from 'express';

import { getContactById } from '../../models/contacts.js';

const router = express.Router();

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const response = await getContactById(contactId);

  if (response !== null) {
    res.status(200).json({ message: response });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

export { router };
