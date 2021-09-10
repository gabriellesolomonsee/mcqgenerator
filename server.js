const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const homepageController = require("./controllers/homepageController");
const papersController = require("./controllers/papersController");
const testingController = require("./controllers/testingController");
const userController = require("./controllers/userController");

// set up database connection

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://gabrielle_admin:fmvfWnMRJvFPRD1N@gabriellemongodb.54lyg.mongodb.net/mcqgenerator?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const mongoURI = "mongodb://localhost:27017/mcqgenerator" 
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
app.use("/papers", papersController);
app.use("/testing", testingController);

const server = app.listen(3000);

process.on("SIGTERM", () => {
  console.log("My process is exiting");
  server.close(() => {
    dbConnection.close();
  });
});