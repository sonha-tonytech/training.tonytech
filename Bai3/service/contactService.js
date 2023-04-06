const ContactModel = require("../models/contact");
const bcrypt = require("bcryptjs");

const getAllContacts = async () => {
  try {
    const allContacts = await ContactModel.find({
      status: "active",
      role: "guest",
    }).sort({
      index: 1,
    });
    return allContacts;
  } catch (error) {
    console.log(`Could not fetch contacts ${error}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactById = await ContactModel.findById({
      _id: contactId,
    });
    const data = {
      _id: contactById._id,
      userName: contactById.userName,
      passWord: "",
      email: contactById.email,
      firstName: contactById.firstName,
      lastName: contactById.lastName,
      country: contactById.country,
    };
    return data;
  } catch (error) {
    console.log(`Could not find user ${error}`);
  }
};

const getContactByUserName = async (userName) => {
  try {
    let data;
    const contactByUsername = await ContactModel.findOne({
      userName: userName,
      status: "active",
    });
    contactByUsername !== null
      ? (data = {
          _id: contactByUsername._id,
          userName: contactByUsername.userName,
          password: contactByUsername.passWord,
          lastName: contactByUsername.lastName,
          role: contactByUsername.role,
        })
      : (data = null);
    return data;
  } catch (error) {
    console.log(`Could not find user ${error}`);
  }
};

const getLastContact = async () => {
  try {
    const lastContact = await ContactModel.find({ status: "active" })
      .sort({ index: -1 })
      .limit(1);
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
      role: "guest",
    };
    const res = await ContactModel.create(newContact);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (data) => {
  try {
    let hash;
    const contactById = await ContactModel.findById({
      _id: data._id,
    });
    data.passWord === ''
      ? (hash = contactById.passWord)
      : (hash = await bcrypt.hash(data.passWord, 10));
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
    const deleteContact = await ContactModel.updateOne(
      { _id: contactId },
      { status: "disactive" }
    );
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
