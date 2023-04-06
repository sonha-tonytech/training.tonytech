const jwt = require("jsonwebtoken");

const verifyTokenLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "my_secret_key");
    if (decoded) {
      req.user = decoded;
      return next();
    } else res.status(401).redirect("/auth/login");
  } catch (err) {
    return res.status(500).clearCookie("token").redirect("/auth/login");
  }
};

const verifyExistToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next();
    } else {
      const decoded = jwt.verify(token, "my_secret_key");
      if (!decoded) return next();
      else res.status(403).redirect("/");
    }
  } catch (error) {
    return res.status(500).clearCookie("token").redirect("/auth/login");
  }
};

module.exports = {
  verifyTokenLogin,
  verifyExistToken,
};
