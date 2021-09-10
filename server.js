require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const homepageController = require("./controllers/homepageController");
const papersController = require("./controllers/papersController");
const testingController = require("./controllers/testingController");
const userController = require("./controllers/userController");

// set up database connection
const mongoURI = process.env.MONGO_URL
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

dbConnection.on("connected", () => console.log("My database is connected"));
dbConnection.on("error", (err) => console.log(`Got error! ${err.message}`));
dbConnection.on("disconnected", () => console.log("My database is disconnected"));

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
// POST http://localhost:3000/posts/1?_method=PUT -> PUT http://localhost:3000/posts/1
// POST http://localhost:3000/posts/1?_method=DELETE -> DELETE http://localhost:3000/posts/1
// this middleware is used to enable HTML forms to submit PUT/DELETE requests
app.use(methodOverride("_method"));

app.use(homepageController);
app.use("/users", userController);
app.use("/papers", papersController);
app.use("/testing", testingController);

const server = app.listen(process.env.PORT);

process.on("SIGTERM", () => {
  console.log("My process is exiting");
  server.close(() => {
    dbConnection.close();
  });
});