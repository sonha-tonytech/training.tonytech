const http = require("http");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const userController = require("./controllers/user.controller");
const uri = "mongodb://localhost:27017/user";
const htmlPath = path.join(__dirname, "/views");
const publicFolderPath = path.join(__dirname, "../");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const getContentType = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".js":
      return "text/javascript";
    case ".css":
      return "text/css";
    case ".html":
      return "text/html";
    default:
      return "text/plain";
  }
};

http
  .createServer(async (req, res) => {
    if (req.url.indexOf("/api/users") === 0) {
      switch (req.method) {
        case "GET": {
          let id = req.url.slice("/api/users/".length);
          id === ""
            ? await userController.apiGetAllUsers(req, res)
            : await userController.apiGetUserById(req, res);
          break;
        }
        case "POST": {
          await userController.apiCreateNewUser(req, res);
          break;
        }
        case "PUT": {
          await userController.apiUpdateUser(req, res);
          break;
        }
        case "DELETE": {
          await userController.apiDeleteUser(req, res);
          break;
        }
        default: {
          break;
        }
      }
    }
    if (req.method === "GET") {
      const reqUrl = req.url;
      let filePath = path.join(htmlPath, reqUrl);
      let filePathPublic = path.join(publicFolderPath, reqUrl);
      if (filePath.endsWith("/")) {
        filePath += "index.html";
      }
      if (reqUrl.endsWith(".css") || reqUrl.endsWith(".js")) {
        fs.readFile(filePathPublic, (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end("File not found");
          } else {
            const contentType = getContentType(filePathPublic);
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
          }
        });
      } else {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end("File not found");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          }
        });
      }
      return;
    }
    res.end("not found");
    return;
  })
  .listen(3001);
