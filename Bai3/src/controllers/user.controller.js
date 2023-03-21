const UserService = require("../service/userservice");

module.exports = class User {
  static apiGetAllUsers = async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      if (!users) {
        res.writeHead(404, "User not found");
        res.end();
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } catch (error) {
      res.writeHead(500, error);
      res.end();
    }
  };

  static apiGetUserById = async (req, res) => {
    try {
      let id = req.url.slice("/api/users/".length);
      const user = await UserService.getUserById(id);
      if (!user) {
        res.writeHead(404, "User not found");
        res.end();
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } catch (error) {
      res.writeHead(500, error);
      res.end();
    }
  };

  static apiCreateNewUser = async (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        let user = JSON.parse(body);
        const newUser = await UserService.createUser(user);
        if (!newUser) {
          res.writeHead(404, "User could not create");
        }
      } catch (error) {
        res.writeHead(500, error);
      }
    });
  };

  static apiUpdateUser = async (req, res) => {
    let id = req.url.slice("/api/users/".length);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        let userUpdate = JSON.parse(body);
        let data = {
          _id: id,
          index: userUpdate.index,
          userName: userUpdate.userName,
          address: userUpdate.address,
          city: userUpdate.city,
          pinCode: userUpdate.pinCode,
          country: userUpdate.country,
        };
        const updateUser = await UserService.updateUser(data);
        if (!updateUser) {
          res.writeHead(404, "User could not update");
        }
      } catch (error) {
        res.writeHead(500, error);
      }
    });
  };

  static apiDeleteUser = async (req, res) => {
    try {
      let id = req.url.slice("/api/users/".length);
      await UserModel.deleteOne({ _id: id });
    } catch (error) {
      res.writeHead(500, error);
      res.end();
    }
  };
};
