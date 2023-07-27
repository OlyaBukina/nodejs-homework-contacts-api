const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../../controllers/contacts");
const { isValidId, authEnticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authEnticate, getContacts);
router.get("/:contactId", authEnticate, isValidId, getContactById);
router.post("/", authEnticate, addContact);
router.delete("/:contactId", authEnticate, isValidId, removeContact);
router.put("/:contactId", authEnticate, isValidId, updateContact);
router.patch("/:contactId/favorite", authEnticate, isValidId, updateStatus);
module.exports = router;
