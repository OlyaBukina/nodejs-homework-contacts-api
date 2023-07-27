const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

/**
 * Remove contact by id
 */
const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete({ _id: contactId });

  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.json(result);
};

module.exports = removeContact;
