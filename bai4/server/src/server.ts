require("dotenv").config();
import app from "./app";
import http from "http";
import mongoose, { ConnectOptions } from "mongoose";
import WebSocket from "socket.io";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));



//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

wss.on("connection", (ws:any) => {
  console.log(ws.id);
  

  // ws.on("disconnect", () => {
  //   console.log("User Disconented", ws.id);
  // });
});

// //start our server
// server.listen(process.env.API_PORT, () => {
//   console.log(`Listening on port ${process.env.API_PORT}`);
// });

app.listen(process.env.API_PORT, () => {
  console.log(`Listening on port ${process.env.API_PORT}`);
});
