const jwt = require("jsonwebtoken");

const verifyRoleToken = (role) => (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "my_secret_key");
    for (let i = 0; i < role.length; i++) {
      if (role[i] === decoded.role) {
        req.decoded = decoded;
        return next();
      }
    }
    res.status(403).json("Do not have permission to do this");
  } catch (err) {
    return res
      .status(500)
      .clearCookie("token")
      .json("An error has occurred. Please log in again");
  }
};

const verifyUserToken = (req, res, next) => {
  try {
    const decoded = req.decoded;
    if (req.params.id === decoded._id || decoded.role === "admin") return next();
    else {
      res.status(403).json("Do not have permission to do this");
    }
  } catch (err) {
    return res
      .status(500)
      .clearCookie("token")
      .json("An error has occurred. Please log in again");
  }
};

module.exports = {
  verifyRoleToken,
  verifyUserToken,
};
