const UserModel = require("../models/user");

module.exports = class UserService {
  static getAllUsers = async () => {
    try {
      const allUsers = await UserModel.find();
      return allUsers;
    } catch (error) {
      console.log(`Could not fetch users ${error}`);
    }
  };

  static getUserById = async (userId) => {
    try {
      const userById = await UserModel.findById({ _id: userId });
      return userById;
    } catch (error) {
      console.log(`Could not find user ${error}`);
    }
  };

  static createUser = async (data) => {
    try {
      const newUser = {
        index: data.index,
        userName: data.userName,
        address: data.address,
        city: data.city,
        pinCode: data.pinCode,
        country: data.country,
        selected: data.selected,
      };
      const res = await UserModel.create(newUser);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  static updateUser = async (data) => {
    try {
      const updateUser = await UserModel.updateOne(
        { _id: data._id },
        {
          index: data.index,
          userName: data.userName,
          address: data.address,
          city: data.city,
          pinCode: data.pinCode,
          country: data.country,
        }
      );
      return updateUser;
    } catch (error) {
      console.log(`Could not update user ${error}`);
    }
  };

  static deleteUser = async (userId) => {
    try {
      const deleteUser = await UserModel.deleteOne({ _id: userId });
      return deleteUser;
    } catch (error) {
      console.log(`Could not delete user ${error}`);
    }
  };
};
