const express = require("express");
const loginController = require("../controllers/loginController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/register", loginController.registerView);
router.get("/login", loginController.loginView);
router.get("/api/register/:userName", loginController.apiGetUserByUserName);
router.get("/api/register", loginController.apiGetLastUser);
router.post("/register", loginController.registerToken);
router.post("/api/register", auth, loginController.registerUser);
router.post("/login", loginController.loginUser);
router.post("/index", auth, loginController.indexView);

module.exports = router;
