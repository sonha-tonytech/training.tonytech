import express from "express";
import UserController from "../../controllers/api/userAPIController";
import ApiMiddleWare from "../../middleware/api/auth";
const router = express.Router();

router.get("/", ApiMiddleWare.verifyUserToken, UserController.apiGetAllUsers);
router.get("/:id", UserController.apiGetUserById);
router.post("/", UserController.apiCreateNewUser);
router.put("/:id", ApiMiddleWare.verifyUserToken, UserController.apiUpdateUser);
router.delete("/:id", UserController.apiDeleteUser);

export default router;
