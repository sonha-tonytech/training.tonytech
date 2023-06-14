import express from "express";
import RoomControllers from "../controllers/roomControllers";
import MessageControllers from "../controllers/messageControllers";
const router = express.Router();



router.get("/" ,RoomControllers.apiGetAllRooms);
router.post("/", RoomControllers.apiCreateNewRoom);

// messageRoutes


router.get("/:id/messages", MessageControllers.apiGetMessagesByGroupId);

export default router;