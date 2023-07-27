const { Contact } = require("../../models/contact");

/**
 * Get contact list
 */
const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  if (favorite) {
    const filtedResult = result.filter(
      (contact) => contact.favorite === JSON.parse(favorite)
    );
    return res.json(filtedResult);
  }

  res.json(result);
};
module.exports = getContacts;
