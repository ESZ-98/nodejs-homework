const Contact = require('../models/contacts.model');

const getAll = async () => {
  return Contact.find();
};

const getById = async (id, userId) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const create = async data => {
  return Contact.create(data);
};

const update = async (id, userId, data) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, data, { new: true });
};

const updateFavorite = async (id, userId, favorite) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, { favorite }, { new: true });
};

const remove = async (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, owner: userId });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
