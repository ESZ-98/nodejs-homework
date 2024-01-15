// import express from 'express';

// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } from '../../models/contacts.js';

// import { schemaPost, schemaPut } from '../../validation/validation.js';

// const router = express.Router();

// router.get('/', async (req, res, next) => {
//   const contacts = await listContacts();
//   res.status(200).json({ message: contacts });
// });

// router.get('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const response = await getContactById(contactId);

//   if (response !== null) {
//     res.status(200).json({ message: response });
//   } else {
//     res.status(404).json({ message: 'Not found' });
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
//     const body = await schemaPost.validateAsync(req.body);
//     const response = await addContact(body);
//     res.status(201).json({ message: 'Contact added' });
//   } catch (error) {
//     res.status(400).json({ message: 'Missing required name - field' });
//     console.log(error);
//   }
// });

// router.delete('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const response = await removeContact(contactId);
//   response
//     ? res.status(200).json({ message: 'Contact deleted' })
//     : res.status(404).json({ message: 'Not found' });
// });

// router.put('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const updatedContact = await schemaPut.validateAsync(req.body);
//     const response = await updateContact(contactId, updatedContact);

//     if (response === 'Contact updated') {
//       res.status(200).json({ message: 'Contact updated' });
//     } else if (response === 'Not found') {
//       res.status(404).json({ message: 'Not found' });
//     }
//   } catch (error) {
//     res.status(400).json({ message: 'Missing fields' });
//     console.log(error);
//   }
// });

// export {router};
