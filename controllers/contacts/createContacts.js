import express from 'express';

import { addContact } from '../../models/contacts.js';

import { schemaPost } from '../../validation/validation.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const body = await schemaPost.validateAsync(req.body);
    const response = await addContact(body);
    res.status(201).json({ message: 'Contact added' });
  } catch (error) {
    res.status(400).json({ message: 'Missing required name - field' });
    console.log(error);
  }
});

export { router };
