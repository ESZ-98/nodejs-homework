const contactsService = require('../services/contacts.service');

const get = async (req, res, next) => {
  try {
    const results = await contactsService.getAll();
    res.json({
      status: 'success',
      code: 200,
      results: results.length,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const results = await contactsService.getById(contactId);
    if (results) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: results },
      });
    } else {
      res.status(404).json({
        status: 'not-found',
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    res.status(400).json({
      status: 'error',
      code: 400,
      data: { message: "This ID doesn't exist" },
    });
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const results = await contactsService.create(body);
    res.json({
      status: 'success',
      code: 201,
      data: { contact: results },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const results = await contactsService.update(contactId, body);
    res.json({
      status: 'success',
      code: 200,
      data: { contact: results },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (typeof favorite !== 'boolean') {
      return res.status(400).json({ message: 'Missing field favorite' });
    }

    const updatedContact = await contactsService.update(contactId, favorite);

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { contact: updatedContact },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const results = await contactsService.remove(contactId);
    res.json({
      status: 'success',
      code: 200,
      data: { contactId, data: { contact: results } },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
