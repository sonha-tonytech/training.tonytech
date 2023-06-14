import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import roomRoutes from "./routes/roomRoute";
import messageRoutes from "./routes/messageRoute";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());  

app.use(express.static(__dirname));

app.use("/rooms", roomRoutes);
app.use("/messages", messageRoutes);

export default app;
