const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    exercices: [{
      type: Schema.Types.ObjectId,
      ref: "Exercice"
    }]
  });
  
  module.exports = mongoose.model("User",UserSchema);
  