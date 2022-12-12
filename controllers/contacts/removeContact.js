const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
        throw new NotFound("Contact with this id was not found");
    }

    res.json({
        message: "Contact was deleted successfully"
    });
}

module.exports = removeContact;