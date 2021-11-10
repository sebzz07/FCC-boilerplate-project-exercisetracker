const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  count: { type: Number, default : 0},
  log: [{
    description: { type: String, required: true},
    duration: { type: Number, required: true},
    date: {type: Date, required: true, default : Date.now()},
  }]
});

module.exports = mongoose.model("User", UserSchema);
