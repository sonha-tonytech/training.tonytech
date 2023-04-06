const express = require("express");
const router = express.Router();


const ContactController = require("../../controllers/api/adminAPIController");

// router for admin
router.get("/", ContactController.apiGetAllAdmins);
router.post("/", ContactController.apiCreateNewAdmin);
router.put("/:id", ContactController.apiUpdateAdmin);
router.delete("/:id", ContactController.apiDeleteAdmin);


module.exports = router;
