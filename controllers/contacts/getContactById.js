const contacts = require('../../models/contacts');
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (!result) {
        throw new NotFound("Contact with this id was not found");
    }
    res.json(result);
}

module.exports = getContactById;