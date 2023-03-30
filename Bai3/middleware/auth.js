const jwt = require("jsonwebtoken");

const verifyTokenLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).redirect("/login");
    } else {
      const decoded = jwt.verify(token, "my_secret_key");
      req.user = decoded;
      return next();
    }
  } catch (err) {
    return res.status(500).redirect("/login");
  }
};

const verifyRoleToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "my_secret_key");
    if (req.method === "PUT" && req.params.id === decoded._id) return next();
    else {
      if (decoded.role === "admin") return next();
      else res.json("Do not have permission to do this");
    }
  } catch (err) {
    return res.status(500).redirect("/index");
  }
};

module.exports = {
  verifyTokenLogin,
  verifyRoleToken,
};
