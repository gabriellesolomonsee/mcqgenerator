const mongoose = require('mongoose');
const { Schema } = mongoose;

const paperSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, default: new Date() },
    topics: { type: String, required: true },  
  },
  {
    timestamps: true
  }
);

const Paper = mongoose.model("Paper", paperSchema);

module.exports = Paper;