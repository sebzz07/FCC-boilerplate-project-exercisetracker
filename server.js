const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoUrl = process.env["MONGO_URI"];
const Schema = mongoose.Schema;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connect to MongoDB succeed"))
  .catch(() => console.log("Connect to MongoDB failed"));

//table's Schemas   :

let UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  exercices: [{
    type: Schema.Types.ObjectId,
    ref: "Exercice"
  }]
});

module.exports = mongoose.model("User",UserSchema);

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
//Middleware
app.use(cors())
app.use(express.static('public'))

// route root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
