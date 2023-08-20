const fs = require('node:fs').promises;
const path = require('node:path');
const contactsPath = path.join(__dirname, './contacts.json');
const { nanoid } = require('nanoid');

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    return contacts;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const matchedContact = contacts.find(contact => contact.id === contactId);
    return matchedContact || null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(contact => contact.id === contactId);
    if (contactToRemove !== undefined) {
      const { name } = contactToRemove;
      const remainingContacts = contacts.filter(contact => contact.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(remainingContacts, null, 2));
      console.log(`${name} was removed`);
      return true;
    } else {
      console.log(`${contactId} couldn't be found`);
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async body => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    if (name && email && phone) {
      const newContact = { id: nanoid(), name, email, phone };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return true;
    }
    return false;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const indexUpdated = contacts.findIndex(contact => contact.id === contactId);

    if (indexUpdated === -1) {
      return 'Not found';
    } else {
      contacts[indexUpdated] = { ...contacts[indexUpdated], ...body };
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return 'Contact updated';
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
