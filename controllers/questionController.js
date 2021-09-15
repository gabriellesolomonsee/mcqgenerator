const express = require("express");
const controller = express.Router();
const multer = require("multer"); //Middleware to handle upload of pictures
const questionsModel = require ("../models/questions")

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/"); //setting the path for the new picture uploaded
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); //setting the format of the file name
  }
})

const uploadMiddleware = multer({ storage: diskStorage });

controller.use(uploadMiddleware.single("questionImage"));

controller.get("/newqn", (req, res) => { //render the form for adding the new question
  res.render("questions/newqn.ejs");
});


controller.post("", async (req, res) => { //creating a new question and put it in the database
  // console.log(req.body)
  const inputs = {
    part1: req.body.part1,
    questionImage: req.file ? `images/${req.file.filename}` : '',
    part2: req.body.part2,
    optionA: req.body.optionA,
    optionB: req.body.optionB,
    optionC: req.body.optionC,
    optionD: req.body.optionD,
    answer: req.body.answer,
  }
  await questionsModel.create(inputs);
  res.redirect("/?success=true&action=create");
});

// back track, try to follow the logic, look at URL. Is the id matching any database? Is the content there?
controller.get("/:id/editqn", async (req, res) => { //Form to edit the question
  const selectedQuestion = await questionsModel.findById(req.params.id); //why is id empty. Go to MongoDB Atlas to check the ID.
  const success = req.query.success;
  const action = req.query.action;
  res.render('questions/editqn.ejs', {
    questions: selectedQuestion,
    success,
    action,
  });
});


controller.put("/questions/:id", async (req, res) => { //Updating the question
  const inputs = {
    title: req.body.title,
    author: req.body.author,
    publishedDate: new Date(req.body.publishedDate),
    topics: req.body.topics
  }
  await questionsModel.updateOne({
    _id: req.params.id,
  }, inputs);
  res.redirect(`/questions/${req.params.id}?success=true&action=update`);
});

controller.delete("/questions/:id", async (req, res) => { //Deleting a question
  await questionsModel.deleteOne({
    _id: req.params.id
  });

  res.redirect("/?success=true&action=delete");
});


controller.get("/:id/showquestions", (req, res) => { //to display all the questions added (REST: Index)
  res.render("questions/showquestions.ejs");
});

controller.get("/:id/showanswers", (req, res) => { //to display all the answers
  res.render("questions/showanswers.ejs");
});

module.exports = controller;