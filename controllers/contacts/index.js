const { ctrlWrapper } = require("../../helpers");

const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const updateStatus = require("./updateStatus");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatus: ctrlWrapper(updateStatus),
};
