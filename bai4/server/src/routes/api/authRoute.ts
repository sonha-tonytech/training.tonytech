import express from "express";
import * as LoginController from "../../controllers/api/authAPIController";
import ApiMiddleWare from "../../middleware/api/auth";
const router = express.Router();

router.post("/login", LoginController.apiLoginUser);
router.post("/register", LoginController.apiRegisterUser);
router.get(
  "/profile",
  ApiMiddleWare.verifyUserToken,
  LoginController.getProfileUser
);

export default router;
