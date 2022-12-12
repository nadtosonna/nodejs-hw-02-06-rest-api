const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
        throw new NotFound("Contact with this id was not found");
    }
    res.json(result);
}

module.exports = getContactById;