const express = require("express");
const papersModel = require("../models/papers");
const controller = express.Router();

controller.get("/new", (req, res) => { //UI to create a new paper (REST)
  res.render("papers/new.ejs");
});

controller.get("/:id", async (req, res) => { //getting a single post (REST)
  const selectedPapers = await papersModel.findById(req.params.id);

  const success = req.query.success; //alert
  const action = req.query.action;
  res.render("papers/show.ejs", {
    paper: selectedPapers,
    success,
    action
  });
});

controller.post("/", async (req, res) => { //Creating a new paper and put it in the database (REST)
  const inputs = {
    title: req.body.title,
    author: req.body.author,
    publishedDate: new Date(req.body.publishedDate),
    topics: req.body.topics
  }
  await papersModel.create(inputs);
  res.redirect("/?success=true&action=create"); //Going back to the homepage
});

controller.get("/:id/edit", async (req, res) => { //Edit the paper (REST)
  const selectedPaper = await papersModel.findById(req.params.id);
  res.render('papers/edit.ejs', {
    paper: selectedPaper,
  });
});

controller.put("/:id", async (req, res) => { //Updating the paper (REST)
  const inputs = {
    title: req.body.title,
    author: req.body.author,
    publishedDate: new Date(req.body.publishedDate),
    topics: req.body.topics
  }
  await papersModel.updateOne({
    _id: req.params.id,
  }, inputs);
  // res.redirect("/?success=true&action=create");
  res.redirect(`/papers/${req.params.id}?success=true&action=update`);
});

controller.delete("/:id", async (req, res) => { //deleting a paper
  await papersModel.deleteOne({
    _id: req.params.id
  });

  res.redirect("/?success=true&action=delete"); //back to homepage
});

module.exports = controller;