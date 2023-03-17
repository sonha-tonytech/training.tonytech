const http = require("http");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/user";
const publicFolderPath = path.join(__dirname, "../public");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const UserSchema = new mongoose.Schema({
  index: Number,
  userName: String,
  address: String,
  city: String,
  pinCode: Number,
  country: String,
  selected: Boolean,
});

const UserModel = new mongoose.model("User", UserSchema);

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
          let users = await UserModel.find().sort({ index: 1 });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(users));
          break;
        }
        case "POST": {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", async () => {
            try {
              let user = JSON.parse(body);
              await UserModel.create(user);
            } catch (error) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Invalid JSON" }));
            }
          });
          break;
        }
        case "PUT": {
          let id = req.url.slice("/api/users/".length);
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", async () => {
            try {
              let user = await UserModel.findById(id);
              let userUpdate = JSON.parse(body);
              if (user.index !== userUpdate.index) {
                await UserModel.updateOne(
                  { index: userUpdate.index },
                  { index: user.index }
                );
              }
              await UserModel.updateOne(
                { _id: id },
                {
                  index: userUpdate.index,
                  userName: userUpdate.userName,
                  address: userUpdate.address,
                  city: userUpdate.city,
                  pinCode: userUpdate.pinCode,
                  country: userUpdate.country,
                }
              );
            } catch (error) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Invalid JSON" }));
            }
          });
          break;
        }
        case "DELETE":
        default: {
          return;
        }
      }
    }
    if (req.method === "GET") {
      const reqUrl = req.url;
      let filePath = path.join(publicFolderPath, reqUrl);
      if (filePath.endsWith("/")) {
        filePath += "index.html";
      }
      if (
        reqUrl.endsWith(".html") ||
        reqUrl.endsWith(".css") ||
        reqUrl.endsWith(".js")
      ) {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end("File not found");
          } else {
            const contentType = getContentType(filePath);
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
  })
  .listen(3001);
