const express = require("express");
const papersModel = require("../models/papers");
const controller = express.Router();

controller.get("/seeds", async (req, res) => {
  await papersModel.insertMany([
    {
      title: "Class Test Term 1 2021 Biology Paper 1",
      author: "Gabrielle",
      publishedDate: new Date("2021-08-12T06:01:28.695Z"),
      topics: "Cells, MOS, Nutrients",  
    },
    {
      title: "MYE 2021 Biology Paper 1",
      author: "Gabrielle",
      publishedDate: new Date("2021-08-12T06:01:28.695Z"),
      topics: "Cells, MOS, Nutrients, Plant Nutrition, Animal Nutrition, Plant Transport",  
    },
    {
      title: "EYE 2021 Biology Paper 1",
      author: "Gabrielle",
      publishedDate: new Date("2021-08-12T06:01:28.695Z"),
      topics: "All Sec 3 topics",
    }
  ]);
  res.send("Seed data completed");
});

module.exports = controller;