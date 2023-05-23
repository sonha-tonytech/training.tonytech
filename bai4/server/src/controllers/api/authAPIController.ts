require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import UserService from "../../service/userService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface CustomRequest extends Request {
  user: Object;
}

export interface Object {
  id: string;
}

const apiLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = await UserService.getUserbyUserName(data.userName);
    if (user && (await bcrypt.compare(data.passWord, user.passWord))) {
      const token = jwt.sign(
        {
          id: user._id,
          userName: user.userName,
          name: user.name,
          role: user.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2h" }
      );
      res.status(200).json(token);
    } else res.status(405).json(null);
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const userFind = await UserService.getUserbyUserName(req.body.userName);
    if (userFind) {
      return res.json("User already exists!");
    }
    const newUser = await UserService.createUser(data);
    Object.values(newUser).length
      ? res.status(200).json("Success")
      : res.status(400).json("User could not create");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProfileUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginUser = await UserService.getUserById(req.user.id);
    if (loginUser) {
      return res.status(200).json(loginUser);
    }
    res.status(404).json("User not found");
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { apiLoginUser, apiRegisterUser, getProfileUser };
