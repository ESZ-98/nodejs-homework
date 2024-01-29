import express from 'express';

import { listContacts } from '../../models/contacts.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: contacts });
});

export { router };
