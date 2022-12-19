const {Contact} = require("../../models/contact");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
        throw HttpError(404, "Contact with this id was not found");
    }

    res.json({
        message: "Contact was deleted successfully"
    });
}

module.exports = removeContact;