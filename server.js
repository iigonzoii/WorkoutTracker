const express = require("express");
// const logger = require("morgan");
const mongoose = require("mongoose");
let Workout = require("./models/workouts");

const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI ||
    // "mongodb+srv://adminGonzo:mongo77@cluster0.6sckj.mongodb.net/workoutTracker?retryWrites=true&w=majority", 
    "mongodb://localhost/workoutTracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// using http method get to reach the api workouts endpoint
app.get("/api/workouts", (req, res) => {
  // finding all workouts using our Workoutmodel
  Workout.find({})
    .then((data) => {
      // here we take the data, and kick it down to our response in json format
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  // finding all workouts using our Workoutmodel
  Workout.find({})
    .then((data) => {
      // here we take the data, and kick it down to our response in json format
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put('/api/workouts/:id', ({params, body},res) => {
  Workout.findOneAndUpdate({ _id: params.id}, 
      {$push: 
          { exercises: body } 
      }, 
      { 
          upsert: true,
          useFindAndModify: false 
      }, 
      workoutUpdate => {
          res.json(workoutUpdate);
      }
  );
});

app.post("/api/workouts", ({ body }, res) => {
  Workout.create(body).then((newData => {
      res.json(newData);
  })).catch(err => {
      res.json(err);
  });
});


// below routes use middleware to find the static files that allow us to access our html, css, and js files in our public folder. I have these done right away so I can see the pages populate when i get the api routes to work.
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
