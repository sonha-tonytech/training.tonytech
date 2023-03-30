const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contactController");
const middleWare = require("../middleware/auth");

// router for user
router.get("/api/users", middleWare.verifyTokenLogin, ContactController.apiGetAllContacts);
router.post("/api/users", middleWare.verifyRoleToken, ContactController.apiCreateNewContact);
router.get("/api/users/:id", ContactController.apiGetContactById);
router.put("/api/users/:id",middleWare.verifyRoleToken, ContactController.apiUpdateContact);
router.delete("/api/users/:id",middleWare.verifyRoleToken, ContactController.apiDeleteContact);


// router for admin
router.get("/api/admin", ContactController.apiGetAllAdmins);
router.post("/api/admin", ContactController.apiCreateNewAdmin);
router.put("/api/admin/:id", ContactController.apiUpdateAdmin);
router.delete("/api/admin/:id", ContactController.apiDeleteAdmin);

module.exports = router;
