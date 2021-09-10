const mongoose = require('mongoose');
const { Schema } = mongoose;

const paperSchema = new Schema(
  {
    headline: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, default: new Date() },
    featuredImage: String,
    content: { type: String, required: true },  
  },
  {
    timestamps: true
  }
);

const Paper = mongoose.model("Paper", paperSchema);

module.exports = Paper;