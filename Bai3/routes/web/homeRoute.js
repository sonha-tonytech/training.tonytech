const express = require("express");
const homeController = require("../../controllers/web/homeController");
const WebMiddleWare = require("../../middleware/web/auth");


const router = express.Router();


router.get("/", WebMiddleWare.verifyTokenLogin, homeController.indexView);

module.exports = router;