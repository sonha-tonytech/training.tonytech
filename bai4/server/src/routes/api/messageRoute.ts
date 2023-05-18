import express from "express";
import MessageController from "../../controllers/api/messageAPIController";
import ApiMiddleWare from "../../middleware/api/auth";
const router = express.Router();




router.get("/",ApiMiddleWare.verifyUserToken, MessageController.apiGetAllMessages);
router.get("/:id", MessageController.apiGetMessageById);
router.post("/",ApiMiddleWare.verifyUserToken, MessageController.apiCreateNewMessage);
router.put("/:id",MessageController.apiUpdateMessage);
router.delete("/:id",ApiMiddleWare.verifyUserToken,MessageController.apiDeleteMessage);








export default router;