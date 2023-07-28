const { Contact, schemas } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { updateSchema } = schemas;

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

module.exports = updateContact;
