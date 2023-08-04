const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, getContacts);
router.get("/:contactId", authenticate, isValidId, getContactById);
router.post("/", authenticate, addContact);
router.delete("/:contactId", authenticate, isValidId, removeContact);
router.put("/:contactId", authenticate, isValidId, updateContact);
router.patch("/:contactId/favorite", authenticate, isValidId, updateStatus);
module.exports = router;
