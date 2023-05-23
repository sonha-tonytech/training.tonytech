import express from "express";
import GroupController from "../../controllers/api/groupAPIController";
import MessageController from "../../controllers/api/messageAPIController";
import ApiMiddleWare from "../../middleware/api/auth";
const router = express.Router();




router.get("/", ApiMiddleWare.verifyUserToken ,GroupController.apiGetAllGroups);
router.get("/:id",ApiMiddleWare.verifyUserToken, GroupController.apiGetGroupById);
router.post("/",ApiMiddleWare.verifyUserToken, GroupController.apiCreateNewGroup);
router.post ("/:id/user", ApiMiddleWare.verifyUserToken,GroupController.apiAddNewUserInGroup);
router.put("/:id",ApiMiddleWare.verifyUserToken, GroupController.apiUpdateGroup);
router.delete("/:id",GroupController.apiDeleteGroup);
// router.get("/user/:id", GroupController.apiGetGroupsByUserId);


// router get messages by id group


router.get("/:id/messages",  ApiMiddleWare.verifyUserToken, MessageController.apiGetMessagesByGroupId);












export default router;