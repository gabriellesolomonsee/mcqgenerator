const express = require("express");
const controller = express.Router();
const multer = require("multer"); //Middleware to handle upload of pictures

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

controller.get("/questions/new", (req, res) => { //render the form for adding the new question
  res.render("questions/newqn.ejs");
});

controller.get("/questions/:id", async (req, res) => { //Show one question
  const selectedQuestion = await questionsModel.findById(req.params.id);
  const success = req.query.success;
  const action = req.query.action;
  res.render("questions/show1qn.ejs", {
    question: selectedQuestion,
    success,
    action
  });
});

controller.post("/questions/", async (req, res) => { //creating a new question and put it in the database
  const inputs = {
    part1: req.body.part1,
    questionImage: `images/${req.file.filename}`,
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

controller.get("/:id/edit", async (req, res) => { //Form to edit the question
  const selectedQuestion = await questionsModel.findById(req.params.id);
  res.render('questions/editqn.ejs', {
    question: selectedQuestion,
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


controller.get("/displayquestions", (req, res) => { //to display all the questions added
  res.render("questions/displayquestions.ejs");
});

controller.get("/displayanswers", (req, res) => { //to display all the answers
  res.render("questions/displayanswers.ejs");
});

module.exports = controller;