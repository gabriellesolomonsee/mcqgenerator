const express = require("express");
const papersModel = require("../models/papers");
const controller = express.Router();

controller.get("", async (req, res) => {
  const papersSortedByRecentDate = await papersModel //sorting the papers according to the time they are created
    .find()
    .sort({ publishedDate: "desc" })
    .limit(6)
    .exec();

  const mostRecentPaper = papersSortedByRecentDate[0];
  const nextRecentPapers = papersSortedByRecentDate.slice(1);

  const success = req.query.success;
  const action = req.query.action;

  res.render("homepage.ejs", {
    mostRecentPaper,
    nextRecentPapers,
    success,
    action,
  });
});

module.exports = controller;