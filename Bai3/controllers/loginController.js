const ContactService = require("../service/contactService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//For Register Page
const registerView = (req, res, next) => {
  res.render("register");
};
// For Login Page
const loginView = (req, res, next) => {
  res.render("login");
};

const indexView = (req, res, next) => {
  console.log("Index here");
  console.log(req.user);
  // res.render("index");
  res.redirect("/index");
  // res.render("index");
};

const loginUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await ContactService.getContactByUserName(data.userName);
    if (
      Object.values(user).length !== 0 &&
      (await bcrypt.compare(data.passWord, user[0].passWord))
    ) {
      const token = jwt.sign(
        { _id: user[0]._id, userName: data.userName },
        "my_secret_key",
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json({ token: token });
    } else {
      res.status(404).json("Invalid User");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const registerToken = (req, res, next) => {
  try {
    const data = req.body;
    const token = jwt.sign(data, "my_secret_key", { expiresIn: "2h" });
    res.status(200).json({token:token});
  } catch (error) {
    res.status(500).json(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newContact = await ContactService.createContact(req.user);
    !Object.values(newContact).length
      ? res.status(404).json("User could not create")
      : res.status(200).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const apiGetUserByUserName = async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const userFind = await ContactService.getContactByUserName(userName);
    res.json(userFind);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const apiGetLastUser = async (req, res, next) => {
  try {
    const lastUser = await ContactService.getLastContact();
    res.json(lastUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  registerView,
  loginView,
  indexView,
  loginUser,
  registerToken,
  registerUser,
  apiGetUserByUserName,
  apiGetLastUser,
};
