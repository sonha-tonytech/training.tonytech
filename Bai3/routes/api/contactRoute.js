const express = require("express");
const router = express.Router();
const ContactController = require("../../controllers/api/contactAPIController");
const WebMiddleWare = require("../../middleware/web/auth");
const APIMiddleWare = require("../../middleware/api/auth");

// router for user
router.get("/",  APIMiddleWare.verifyRoleToken(["guest","admin"]), ContactController.apiGetAllContacts);
router.post("/", APIMiddleWare.verifyRoleToken(["admin"]), ContactController.apiCreateNewContact);
router.get("/:id", APIMiddleWare.verifyRoleToken(["guest","admin"]), ContactController.apiGetContactById);
router.put("/:id",  APIMiddleWare.verifyRoleToken(["guest","admin"]), APIMiddleWare.verifyUserToken, ContactController.apiUpdateContact);
router.delete("/:id", APIMiddleWare.verifyRoleToken(["admin"]), ContactController.apiDeleteContact);

module.exports = router;
