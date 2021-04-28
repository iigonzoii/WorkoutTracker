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
    "mongodb+srv://adminGonzo:mongo77@cluster0.6sckj.mongodb.net/workoutTracker?retryWrites=true&w=majority", 
    // below is to connect locally which is how i tested my routes before pushing to heroku 
    // "mongodb://localhost/workoutTracker",
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

// here we use our update method or put to edit our workout. we find by the id and then push the body of the request(user input prompted by our front end display) into our excercises array. 
app.put('/api/workouts/:id', ({params, body},res) => {
  // findoneandupdate will update a single doc in a collection or view based on my query filter(id: params.id)
  Workout.findOneAndUpdate({ _id: params.id}, 
      {$push: 
          { exercises: body } 
      },
      // upsert being set to true essentially tells mongoDB to refuse insertion of a new doucment if the query doesnt match an existing document 
      // usefindandmodify is used because without it findoneandupdate is actually deprecated
      
      { 
          upsert: true,
          useFindAndModify: false 
      }, 
      workoutUpdate => {
          res.json(workoutUpdate);
      }
  );
});

// here we use the post method for our creation of a new workout. we post to the endpoint of api/workouts and create a workout using the input recieved from the front end prompt(the body)
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
