const ContactModel = require("../models/contact");
const bcrypt = require("bcryptjs");

// Service for admin
const getAllAdmins = async () => {
  try {
    const allAdmins = await ContactModel.find({
      status: "active",
      role: "admin",
    });
    return allAdmins;
  } catch (error) {
    console.log(error);
  }
};
const createAdmin = async (data) => {
  try {
    const hash = await bcrypt.hash(data.passWord, 10);
    const newAdmin = {
      index: 0,
      userName: data.userName,
      passWord: hash,
      email: data.email.toLowerCase(),
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      selected: false,
      status: "active",
      role: "admin",
    };
    const res = await ContactModel.create(newAdmin);
    return res;
  } catch (error) {
    console.log(error);
  }
};
const updateAdmin = async (data) => {
  try {
    let hash = data.passWord;
    const adminById = await ContactModel.findById({
      _id: data._id,
    });
    data.passWord === adminById.passWord
      ? hash
      : (hash = await bcrypt.hash(data.passWord, 10));
    const updateAdmin = await ContactModel.updateOne(
      { _id: data._id },
      {
        userName: data.userName,
        passWord: hash,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        country: data.country,
      }
    );
    return updateAdmin;
  } catch (error) {
    console.log(`Could not update user ${error}`);
  }
};
const deleteAdmin = async (adminId) => {
  try {
    const deleteContact = await ContactModel.updateOne(
      { _id: adminId },
      { status: "disactive" }
    );
    return deleteContact;
  } catch (error) {
    console.log(`Could not delete user ${error}`);
  }
};

module.exports = {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
