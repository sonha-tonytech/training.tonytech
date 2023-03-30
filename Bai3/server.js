require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use(cookieParser());
app.use('/', require("./routes/loginRoute"));
app.use('/', require("./routes/contactRoute"));
app.set('view engine', 'ejs');


app.get("/", (req,res) => {
  res.redirect("/index");
});


app.listen(process.env.API_PORT);
