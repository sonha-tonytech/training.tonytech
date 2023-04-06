//For Register Page
const registerView = (req, res, next) => {
  res.render("register");
};
// For Login Page
const loginView = (req, res, next) => {
  res.render("login");
};

// Logout
const logoutUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      res.clearCookie("token");
    }
    res.redirect("/auth/login");
  } catch (error) {
    res.status(500).redirect("/auth/login");
  }
};

module.exports = {
  registerView,
  loginView,
  logoutUser,
};
