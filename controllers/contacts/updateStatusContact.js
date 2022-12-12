const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");
const { addStatusSchema } = require("../../schemas/contacts");

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    
    if (!result) {
        throw new NotFound("Contact with this id was not found");
    }

    res.json(result);
}

module.exports = updateStatusContact;