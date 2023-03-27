const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contactController");
const auth = require("../middleware/auth");

router.get("/api/users", auth, ContactController.apiGetAllContacts);
router.post("/api/users", ContactController.apiCreateNewContact);
router.get("/api/users/:id", ContactController.apiGetContactById);
router.put("/api/users/:id", ContactController.apiUpdateContact);
router.delete("/api/users/:id", ContactController.apiDeleteContact);

module.exports = router;
