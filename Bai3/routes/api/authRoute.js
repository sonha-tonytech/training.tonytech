const express = require("express");
const router = express.Router();
const LoginController = require("../../controllers/api/loginAPIController");


router.post("/login", LoginController.apiLoginUser);
router.post("/register", LoginController.apiRegisterUser);

module.exports = router;
