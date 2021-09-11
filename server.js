
//Dependency
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.

const homepageController = require("./controllers/homepageController");
const papersController = require("./controllers/papersController");
const testingController = require("./controllers/testingController");
const questionController = require("./controllers/questionController");

// set up database connection

//with Mongosh (as instructed in MongoDB Atlas website)
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://gabrielle_admin:fmvfWnMRJvFPRD1N@gabriellemongodb.54lyg.mongodb.net/mcqgenerator?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//Also tried
//mongosh "mongodb+srv://gabriellemongodb.54lyg.mongodb.net/mcqgenerator" --username gabrielle_admin
// Replace myFirstDatabase with the name of the database that connections will use by default. You will be prompted for the password for the Database User, gabrielle_admin. When entering your password, make sure all special characters are URL encoded.
//password:fmvfWnMRJvFPRD1N

//Still returned "My database is disconnected"

const mongoURI = process.env.MONGO_URL
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

dbConnection.on("connected", () => console.log("My database is connected"));
dbConnection.on("error", (err) => console.log(`Got error! ${err.message}`));
dbConnection.on("disconnected", () => console.log("My database is disconnected"));

const app = express();

app.use(express.static("public")); //to serve static files such as img
app.use(express.urlencoded({ extended: true })) //Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option
app.use(methodOverride("_method"));

app.use(homepageController);
app.use("/questions", questionController);
app.use("/papers", papersController);
app.use("/testing", testingController);

const server = app.listen(3000);

process.on("SIGTERM", () => { //The SIGTERM signal is a generic signal used to cause program termination. Unlike SIGKILL , this signal can be blocked, handled, and ignored. It is the normal way to politely ask a program to terminate. 
  console.log("My process is exiting");
  server.close(() => {
    dbConnection.close();
  });
});