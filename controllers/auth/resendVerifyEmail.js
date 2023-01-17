const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.verify) {
        throw HttpError(404)
    }

    const verifyEmail = {
        to: email,
        subject: "Get your email verified",
        html: `<a target="_blank" href="http://localhost3000/api/users/verify/${user.verificationCode}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Email verification was resend."
    })
}

module.exports = resendVerifyEmail;