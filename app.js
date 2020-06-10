// Require app dependencies
const express = require("express");
const app = express();

// Require json data
const { projects } = require("./data.json");

// Set view engine to pug
app.set("view engine", "pug");

// Set route for static files
app.use("/static", express.static("public"));

//Configure routes for GET requests
//Home page
app.get("/", (req, res) => {
  res.render("index", { projects });
});

// About page
app.get("/about", (req, res) => {
  res.render("about");
});

// Project page
app.get("/projects/:id", (req, res, next) => {
  const id = req.params.id;
  // If query is not a integer and when query id is not equal to the projects length array, call next middleware to handle error
  if (isNaN(id) || id > projects.length - 1) {
    return next();
  } else {
    const project = projects[id];
    res.render("project", { project });
  }
});

// Create custom 404 error and pass it to next middleware
app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

// Display error page when no routes are found
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
  console.log(err.message);
});

// Host app on port
app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});
