const { Contact, schemas } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { updateFavoriteSchema } = schemas;

/**
 * Update favorite status by id
 */
const updateStatus = async (req, res) => {
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

module.exports = updateStatus;
