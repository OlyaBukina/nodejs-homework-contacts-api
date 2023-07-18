const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const { addSchema, updateSchema } = require("../validation-schema/contacts");

const getContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw HttpError(404, "Not found!");
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
        const missingFieldName = error.details[0].path.toString();
        throw HttpError(400, `missing required ${missingFieldName} field`);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Not found!");
    }
    res.json(result);
};

const updateContact = async (req, res) => {
    if (JSON.stringify(req.body) === "{}") {
        throw HttpError(400, "missing fields");
    }
    const { error } = updateSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    res.status(200).json(result);
};

module.exports = {
    getContacts: ctrlWrapper(getContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
};
