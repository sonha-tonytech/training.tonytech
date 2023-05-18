import bcrypt from "bcrypt";
import UserModel from "../models/users";

const getAllUsers = async () => {
  try {
    const allUsers = await UserModel.find({
      isActived: true,
      role: "user",
    }, "userName name");
    return allUsers;
  } catch (error) {
    console.log(`Could not fetch users ${error}`);
  }
};

const getUserById = async (userId: string) => {
  try {    
    const userById = await UserModel.findById({ _id: userId });        
    const data = userById
      ? {
          _id: userById._id,
          userName: userById.userName,
          name: userById.name,
        }
      : null;
    return data;
  } catch (error) {
    console.log(`Could not find user ${error}`);
  }
};

const getUserbyUserName = async (userName: string) => {
  try {
    const userByUserName = await UserModel.findOne({
      userName: userName,
      isActived: true,
    });
    const data = userByUserName
      ? {
          _id: userByUserName._id,
          userName: userByUserName.userName,
          passWord: userByUserName.passWord,
          name:userByUserName.name,
          role: userByUserName.role,
        }
      : null;
    return data;
  } catch (error) {
    console.log(`Could not find user ${error}`);
  }
};

const createUser = async (data: {
  userName: string;
  passWord: string;
  name: string;
}) => {
  try {
    const hash = await bcrypt.hash(data.passWord, 10);
    const newUser = {
      userName: data.userName,
      passWord: hash,
      name: data.name,
      isActived: true,
      role: "user",
    };
    const res = await UserModel.create(newUser);
    return res;
  } catch (error) {
    console.log(`Could not add new user ${error}`);
  }
};

const updateUser = async (data: {
  _id: string;
  userName: string;
  name: string;
}) => {
  try {    
    const userById = await UserModel.findById({ _id: data._id });
    if (userById) {
      const updatedUser = await UserModel.updateOne(
        { _id: data._id },
        {
          userName: data.userName,
          name: data.name,
        }
      );
      const result = updatedUser.modifiedCount === 1 ? true : false;
      return result;
    }
    return false;
  } catch (error) {
    console.log(`Could not update user ${error}`);
  }
};

const deleteUser = async (userId: string) => {
  try {
    const deletedUser = await UserModel.updateOne(
      { _id: userId },
      { isActived: false }
    );
    const result = deletedUser.modifiedCount === 1 ? true : false;
    return result;
  } catch (error) {
    console.log(`Could not delete user ${error}`);
  }
};

export default{
  getAllUsers,
  getUserById,
  getUserbyUserName,
  createUser,
  updateUser,
  deleteUser,
};
