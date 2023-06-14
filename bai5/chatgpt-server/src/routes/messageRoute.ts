import express from "express";
import MessageControllers from "../controllers/messageControllers";
const router = express.Router();

router.post("/", MessageControllers.apiCreateNewMessage);
export default router;
