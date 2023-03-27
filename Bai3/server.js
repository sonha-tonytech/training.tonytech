require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use('/', require("./routes/login"));
app.use('/', require("./routes/contactRoute"));
app.set('view engine', 'ejs');


app.get("/", (req,res) => {
  res.render("index");
  // res.redirect("/login");
});


app.listen(process.env.API_PORT);
