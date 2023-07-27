const { Contact, schemas } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { addSchema } = schemas;

/**
 * Create new contact
 */
const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = addSchema.validate(req.body);
  if (error) {
    const missingFieldName = error.details[0].path.toString();
    throw HttpError(400, `missing required ${missingFieldName} field`);
  }

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = addContact;
