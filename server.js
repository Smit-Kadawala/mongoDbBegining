const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const parser = require("body-parser");
const bodyParser = require("body-parser");

const UserRoutes = require("./routes/UserRoutes");

mongoose.connect("mongodb://localhost:27017/testdb");
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("db Connection Established!");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});

app.use("/api/user", UserRoutes);
