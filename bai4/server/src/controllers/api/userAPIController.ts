require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import UserService from "../../service/userService";
import jwt from "jsonwebtoken";

const apiGetAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.getAllUsers();
    if (!Array.isArray(users)) return res.status(404).json(null);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiGetUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await UserService.getUserById(id);
    if (user) res.status(200).json(user);
    else res.status(404).json("Error 404: Do not find data");
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiCreateNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const userFind = await UserService.getUserbyUserName(req.body.userName);
    if (userFind) res.json("User already exists!");
    else {
      const newUser = await UserService.createUser(data);
      !Object.values(newUser).length
        ? res.status(400).json("User could not create")
        : res.status(200).json("Success");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userByUserName = await UserService.getUserbyUserName(
      req.body.userName
      );    
    if (userByUserName) {
      return res.status(200).json("Username already exists");
    }    
    const data = {
      _id: req.params.id,
      userName: req.body.userName,
      name: req.body.name,
    };
    const updatedUser = await UserService.updateUser(data);
    if (updatedUser) {
      const token = jwt.sign(
        {
          id: data._id,
          userName: data.userName,
          name: data.name,
          role: "user",
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2h" }
      );
      res.status(200).json({ token: token });
    } else {
      res.status(400).json("User could not be updated");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const apiDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deleteUser = await UserService.deleteUser(id);
    deleteUser
      ? res.status(200).json("Success")
      : res.status(400).json("User could not be deleted");
  } catch (error) {}
};

export default {
  apiGetAllUsers,
  apiGetUserById,
  apiCreateNewUser,
  apiUpdateUser,
  apiDeleteUser,
};
