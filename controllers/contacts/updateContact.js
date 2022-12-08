const contacts = require('../../models/contacts');
const { NotFound } = require("http-errors");

const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    
    if (!result) {
        throw new NotFound("Contact with this id was not found");
    }

    res.json(result);
}

module.exports = updateContact;