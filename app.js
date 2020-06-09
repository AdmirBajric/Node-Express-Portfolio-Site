const express = require("express");
const app = express();

const { projects } = require("./data.json");

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(8000, () => {
  console.log("The application is running on localhost:6000");
});
