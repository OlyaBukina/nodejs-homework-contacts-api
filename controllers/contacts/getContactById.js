const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

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

module.exports = getContactById;
