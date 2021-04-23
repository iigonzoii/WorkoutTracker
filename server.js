const express = require("express");
// const logger = require("morgan");
const mongoose = require("mongoose");
let Workout = require("./models/workouts")

const PORT = process.env.PORT || 3001;

// const User = require("./userModel.js");
const app = express();

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI ||'mongodb+srv://adminGonzo:mongo77@cluster0.6sckj.mongodb.net/workoutTracker?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
  });
// using http method get to reach the api workouts endpoint
app.get("/api/workouts", (req, res) => {
  // finding all workouts using our Workoutmodel
  Workout.find({})
    .then(data => {
      // here we take the data, and kick it down to our response in json format
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
