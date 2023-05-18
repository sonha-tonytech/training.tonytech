import express from "express";
import authRoute from "../api/authRoute";
import userRoute from "../api/userRoute";
import groupRoute from "../api/groupRoute";
import messageRoute from "../api/messageRoute";
const router = express.Router();


// API
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/groups", groupRoute);
router.use("/messages", messageRoute);



export default router;