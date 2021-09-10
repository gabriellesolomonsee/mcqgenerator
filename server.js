const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const homepageController = require("./controllers/homepageController");
const papersController = require("./controllers/papersController");
const testingController = require("./controllers/testingController");
const userController = require("./controllers/userController");

// set up database connection
const mongoURI = "mongodb://localhost:27017/mcqgeneratordb" 
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

dbConnection.on("connected", () => console.log("My database is connected"));
dbConnection.on("error", (err) => console.log(`Got error! ${err.message}`));
dbConnection.on("disconnected", () => console.log("My database is disconnected"));

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));

app.use(homepageController);
app.use("/users", userController);
app.use("/papers", postsController);
app.use("/testing", testingController);

const server = app.listen(3000);

process.on("SIGTERM", () => {
  console.log("My process is exiting");
  server.close(() => {
    dbConnection.close();
  });
});