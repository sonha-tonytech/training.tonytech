const express = require("express");
const loginController = require("../controllers/loginController");
const middleWare = require("../middleware/auth");

const router = express.Router();

router.get("/register", loginController.registerView);
router.get("/login", loginController.loginView);
router.post("/api/register", loginController.registerUser);
router.post("/login", loginController.loginUser);
router.get("/logout", loginController.logoutUser);
router.get("/index", middleWare.verifyTokenLogin, loginController.indexView);

module.exports = router;
