const { Contact, schemas } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const { addSchema, updateSchema, updateFavoriteSchema } = schemas;

/**
 * Get contatc list
 */
const getContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

/**
 * Get one contact by id
 */
const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById({ _id: contactId });

  if (!result) {
    throw HttpError(404, "Not found!");
  }

  res.json(result);
};

/**
 * Create new contact
 */
const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    const missingFieldName = error.details[0].path.toString();
    throw HttpError(400, `missing required ${missingFieldName} field`);
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

/**
 * Delete contact by id
 */
const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete({ _id: contactId });

  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json(result);
};

/**
 * Update contact by id
 */
const updateContact = async (req, res) => {
  if (JSON.stringify(req.body) === "{}") {
    throw HttpError(400, "missing fields");
  }

  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json(result);
};

/**
 * Update favorite status by id
 */
const updateStatusContact = async (req, res) => {
  if (JSON.stringify(req.body) === "{}") {
    throw HttpError(400, "missing field favorite");
  }

  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
