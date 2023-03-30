const ContactService = require("../service/contactService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//For Register Page
const registerView = (req, res, next) => {
  const token = req.cookies.token;
  token ? res.redirect("/index") : res.render("register");
};
// For Login Page
const loginView = (req, res, next) => {
  const token = req.cookies.token;
  token ? res.redirect("/index") : res.render("login");
};

// For Index Page
const indexView = (req, res, next) => {
  res.render("index");
};

// Logout
const logoutUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      res.clearCookie("token");
    }
    res.redirect("/login");
  } catch (error) {
    res.status(500).redirect("/login");
  }
};

const loginUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await ContactService.getContactByUserName(data.userName);
    if (user !== null && (await bcrypt.compare(data.passWord, user.password))) {
      const token = jwt.sign(
        { _id: user._id, userName: user.userName, role: user.role },
        "my_secret_key",
        { expiresIn: "2h" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ lastName: user.lastName });
    } else {
      res.status(404).json("Invalid User");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const data = req.body;
    const userFind = await ContactService.getContactByUserName(
      req.body.userName
    );
    if (userFind !== null) {
      res.json("User already exists");
    } else {
      const lastUser = await ContactService.getLastContact();
      lastUser.length !== 0 ? (data.index = lastUser[0].index + 1) : data.index;
      const newContact = await ContactService.createContact(data);
      !Object.values(newContact).length
        ? res.status(404).json("User could not create")
        : res.status(200).json("Success");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  registerView,
  loginView,
  indexView,
  loginUser,
  logoutUser,
  registerUser,
};
