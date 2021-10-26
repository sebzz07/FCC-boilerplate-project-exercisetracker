const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let ExerciceSchema = new Schema({
    description: { type: String, required: true},
    duration: { type:Number, required: true},
    date: {type: Date, required: true},
    exercices: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  });
  
  module.exports = mongoose.model("Exercice",ExerciceSchema);