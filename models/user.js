const {Schema, model} = require("mongoose");
const Joi = require("Joi");

const {handleMongooseError} = require("../helpers")

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    },
    token: {
        type: String,
    }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    signupSchema,
    loginSchema,
    emailSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}