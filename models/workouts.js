const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// defaults set so the front end doesnt display undefined if one of the objects isnt used
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
 
  },

  exercises: [
    {
    
      type: {
        type: String,
        trim: true,
      },
      name: {
        type: String,
        trim: true,
      },
      Duration:{
         type: Number,
      },
      weight: {
        type: Number,
        default: 0
      },
      reps: {
        type: Number,
        default: 0
      },
      sets: {
        type: Number,
        default: 0
      },
      distance: {
        type: Number,
        default: 0
      }
    }
  ],
  totalDuration: {
    type: Number,
    default: 0
  },
});

const Workouts = mongoose.model("Workouts", WorkoutSchema);

module.exports = Workouts;
