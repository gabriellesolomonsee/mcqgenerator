const express = require("express");
const session = require("express-session");
const postsModel = require("../models/posts");
const controller = express.Router();

controller.use(session({
  secret: "thisIsAsecretKey",
  resave: false,
  saveUninitialized: false,
}));

controller.get("/login", (req, res) => {
  // assume that the user logins successfully, a session will be created
  req.session.userLoggedIn = true;
  req.session.displayName = "Zhiquan";
  // sessionId1234: {
  //  userLoggedIn,
  //  displayName
  // }
  // pass sessionId1234 back to the user -> browser -> cookie
  res.send("User logged in successfully");
});

controller.get("/isUserLoggedIn", (req, res) => {
  console.log(req);
  // JWT authentication
  // browser -> sessionId from cookie -> pass it to the server
  // server will find sessionId1234 in the memory, if id exists
  // it will return the object linked to it, userLoggedIn and displayName
  res.send(`Are you logged in? ${req.session.userLoggedIn}.\nYour name is ${req.session.displayName}`);
})

controller.get("/", async (req, res) => {
  // because posts by default are not sorted in chronological order
  // we should sort it first
  // the first post should be the most recent one
  const postsSortedByRecentDate = await postsModel
    .find()
    .sort({ publishedDate: "desc" })
    .limit(6)
    .exec();

  // sort the posts by descending order, most recent to latest
  // get the most recent post which is located at the first index
  const mostRecentPost = postsSortedByRecentDate[0];
  // get the next 5 most recent posts
  const nextRecentPosts = postsSortedByRecentDate.slice(1);

  // Get query parameters success and action
  // If have, we display alert banners
  // If not, no alert banners should be displayed
  const success = req.query.success;
  const action = req.query.action;

  res.render("homepage.ejs", {
    mostRecentPost,
    nextRecentPosts,
    success,
    action,
  });
});

module.exports = controller;