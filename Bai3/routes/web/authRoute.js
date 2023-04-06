const express = require("express");
const loginController = require("../../controllers/web/loginController");
const WebMiddleWare = require("../../middleware/web/auth");

const router = express.Router();

router.get("/register",WebMiddleWare.verifyExistToken, loginController.registerView);
router.get("/login",WebMiddleWare.verifyExistToken, loginController.loginView);
router.get("/logout", loginController.logoutUser);

module.exports = router;