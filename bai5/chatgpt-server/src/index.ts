require("dotenv").config();
import app from "./app";
import mongoose, { ConnectOptions } from "mongoose";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));


app.listen(process.env.API_PORT, () => {
  console.log(`Listening on port ${process.env.API_PORT}`);
});


