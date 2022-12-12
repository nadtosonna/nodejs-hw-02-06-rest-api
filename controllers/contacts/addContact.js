const Contact = require("../../models/contact");
const { BadRequest } = require("http-errors");
const { addSchema } = require("../../schemas/contacts");

const addContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
    throw BadRequest(error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

module.exports = addContact;