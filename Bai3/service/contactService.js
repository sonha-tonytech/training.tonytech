const ContactModel = require("../models/contact");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAllContacts = async () => {
  try {
    const allContacts = await ContactModel.find({status: "active"}).sort({ index: 1 });
    return allContacts;
  } catch (error) {
    console.log(`Could not fetch contacts ${error}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactById = await ContactModel.findById({ _id: contactId, status: "active" });
    return contactById;
  } catch (error) {
    console.log(`Could not find user ${error}`);
  }
};

const getContactByUserName = async (userName) => {
  try {
    const contactByUsername = await ContactModel.find({ userName: userName, status: "active"});
    return contactByUsername;
  } catch (error) {
    console.log(`Could not find user ${error}`);
  }
};

const getLastContact = async () => {
  try {
    const lastContact = await ContactModel.find({status: "active"}).sort({ index: -1 }).limit(1);
    return lastContact;
  } catch (error) {
    console.log(`Could not find user ${error}`);
  }
};

const createContact = async (data) => {
  try {
    const hash = await bcrypt.hash(data.passWord, 10);
    const newContact = {
      index: data.index,
      userName: data.userName,
      passWord: hash,
      email: data.email.toLowerCase(),
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      selected: data.selected,
      status: "active",
    };
    const res = await ContactModel.create(newContact);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (data) => {
  try {
    const hash = await bcrypt.hash(data.passWord, 10);
    const updateContact = await ContactModel.updateOne(
      { _id: data._id },
      {
        index: data.index,
        userName: data.userName,
        passWord: hash,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        country: data.country,
      }
    );
    return updateContact;
  } catch (error) {
    console.log(`Could not update user ${error}`);
  }
};

const deleteContact = async (contactId) => {
  try {
    const deleteContact = await ContactModel.updateOne({ _id: contactId },{status: "disactive"});
    return deleteContact;
  } catch (error) {
    console.log(`Could not delete user ${error}`);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  getContactByUserName,
  getLastContact,
  createContact,
  updateContact,
  deleteContact,
};
