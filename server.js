var express = require("express");
require("dotenv").config();
var mongoose = require("mongoose");
const cors = require("cors");

var app = express();
var port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const con = mongoose.connection;

con.once("open", () => {
  console.log("Mongodb connection established sucessfully");
});

const usersRouter = require("./backend/routes/users");
const exercisesRouter = require("./backend/routes/exercises");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => res.send("hello"));

app.listen(port, () => {
  console.log("listening to port no:" + port);
});
