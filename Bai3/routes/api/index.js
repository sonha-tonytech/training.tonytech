const express = require("express");
const router = express.Router();

const authRoute = require("./authRoute")
const contactRoute = require("./contactRoute")
const adminRoute = require("./adminRoute")
const APIMiddleWare = require("../../middleware/api/auth")
// /api

router.use('/auth', authRoute);
router.use('/users', contactRoute);
router.use('/admin',  APIMiddleWare.verifyRoleToken(["admin"]), adminRoute);

module.exports = router;
