const mongoose = require('mongoose');
const { Schema } = mongoose;

const paperSchema = new Schema(
  {
    assessment: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, default: new Date() },
    topics: { type: String, required: true },
    mcqcomments: { type: String, required: true },
    sqcomments: { type: String, required: true },
    eqcomments: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const Paper = mongoose.model("Paper", paperSchema);

module.exports = Paper;