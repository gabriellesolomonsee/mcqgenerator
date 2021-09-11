const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    part1: { type: String, required: true },
    questionImage: String,
    part2: String,
    optionA: { type: String, required: true }, 
    optionB: { type: String, required: true }, 
    optionC: { type: String, required: true }, 
    optionD: { type: String, required: true }, 
    answer: { type: String, required: true }, 
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("Question", questionSchema);

module.exports = Question;