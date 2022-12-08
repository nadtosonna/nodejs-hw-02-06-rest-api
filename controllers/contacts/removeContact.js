const contacts = require('../../models/contacts');
const { NotFound } = require("http-errors");

const removeContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);

    if (!result) {
        throw new NotFound("Contact with this id was not found");
    }

    res.json({
        message: "Contact was deleted successfully"
    });
}

module.exports = removeContact;