const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, upload, resizeAvatar } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/signup", validateBody(schemas.signupSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/avatars", authenticate, upload.single("avatar"), resizeAvatar, ctrlWrapper(ctrl.updateAvatar));

module.exports = router;