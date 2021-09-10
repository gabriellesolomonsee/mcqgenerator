const express = require("express");
const papersModel = require("../models/papers");
const controller = express.Router();

// multer is a middleware to handle file uploads automatically
const multer = require("multer");

// it allows you to choose different storages (disk or memory). Disk is basically on your local harddrive.
// It provides you a couple of functions, one is for choosing the destination, where you want to upload, the other one for defining the filename for the uploaded file
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
})

// after you setup multer to choose your disk storage, you can initialize a middleware to use for your routes
const uploadMiddleware = multer({ storage: diskStorage });

// in our case we are using multer in our all routes, this will automatically upload any file where the input name is featuredImage
controller.use(uploadMiddleware.single("featuredImage"));

controller.get("/new", (req, res) => {
  // render the UI to create a new post
  res.render("posts/new.ejs");
});

controller.get("/:id", async (req, res) => {
  // get the single post by post id
  const selectedPaper = await papersModel.findById(req.params.id);

  // same as homepage, we display alert banners
  // if there are success and action query parameters
  // if not, don't display anything
  const success = req.query.success;
  const action = req.query.action;
  res.render("papers/show.ejs", {
    paper: selectedPaper,
    success,
    action
  });
});

// endpoint for creating new blog post
controller.post("/", async (req, res) => {
  const inputs = {
    headline: req.body.headline,
    featuredImage: `images/${req.file.filename}`,
    author: req.body.author,
    publishedDate: new Date(req.body.publishedDate),
    content: req.body.content
  }
  await papersModel.create(inputs);

  // Redirect user to the home page and provide the query parameters success and action
  res.redirect("/?success=true&action=create");
});

controller.get("/:id/edit", async (req, res) => {
  const selectedPaper = await papersModel.findById(req.params.id);
  res.render('posts/edit.ejs', {
    paper: selectedPaper,
  });
});

controller.put("/:id", async (req, res) => {
  const inputs = {
    headline: req.body.headline,
    featuredImage: `images/${req.file.filename}`,
    author: req.body.author,
    publishedDate: new Date(req.body.publishedDate),
    content: req.body.content
  }
  await papersModel.updateOne({
    _id: req.params.id,
  }, inputs);

  // Redirect user to the single post page and provide the query parameters success and action
  res.redirect(`/posts/${req.params.id}?success=true&action=update`);
});

controller.delete("/:id", async (req, res) => {
  await papersModel.deleteOne({
    _id: req.params.id
  });

  // Redirect user to home page with success and action query parameters
  res.redirect("/?success=true&action=delete");
});

module.exports = controller;