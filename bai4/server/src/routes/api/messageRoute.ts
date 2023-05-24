import express from "express";
import MessageController from "../../controllers/api/messageAPIController";
import ApiMiddleWare from "../../middleware/api/auth";
const router = express.Router();




router.get("/",ApiMiddleWare.verifyUserToken, MessageController.apiGetAllMessages);
router.post("/",ApiMiddleWare.verifyUserToken, MessageController.apiCreateNewMessage);
router.delete("/:id",ApiMiddleWare.verifyUserToken,MessageController.apiDeleteMessage);
// router.get("/:id", MessageController.apiGetMessageById);
// router.put("/:id",MessageController.apiUpdateMessage);








export default router;