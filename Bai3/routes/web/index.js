const express = require("express");
const router = express.Router();

const homeRoute = require("./homeRoute")
const authRoute = require("./authRoute")


router.use('/auth', authRoute);
router.use('/', homeRoute);

module.exports = router;