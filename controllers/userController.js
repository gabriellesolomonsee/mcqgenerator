const express = require("express");
const controller = express.Router();

controller.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

controller.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

module.exports = controller;