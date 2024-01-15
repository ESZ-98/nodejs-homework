import {contactsService} from '../services/contacts.service.js';

const get = async (req, res, next) => {
  try {
    const { query, user } = req;
    const results = await contactsService.getAll({ ...query, owner: user._id });
    return res.json({
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
    const { params, user } = req;
    const { contactId } = params;
    const results = await contactsService.getOne(contactId, user._id);
    if (results) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact: results },
      });
    } else {
      return res.status(404).json({
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
    const { body, user } = req;
    const results = await contactsService.create({ ...body, owner: user._id });
    return res.json({
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
    const { body, user } = req;
    const results = await contactsService.update(contactId, user._id, body);
    return res.json({
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
    const { body, params, user } = req;
    const { contactId } = params;
    const { favorite } = body;

    if (typeof favorite !== 'boolean') {
      return res.status(400).json({ message: 'Missing field favorite' });
    }

    const updatedContact = await contactsService.update(contactId, user._id, favorite);

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
    const { user } = req;
    const results = await contactsService.remove(contactId, user._id);
    return res.json({
      status: 'success',
      code: 200,
      data: { contactId, data: { contact: results } },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
