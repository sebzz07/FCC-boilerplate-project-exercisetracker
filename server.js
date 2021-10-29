const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require("mongoose");
const mongoUrl = process.env["MONGO_URI"];
const Schema = mongoose.Schema;

let UserController = require("./controllers/UserController.js");
let UserModel = require("./models/UserModel.js");

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connect to MongoDB succeed"))
  .catch(() => console.log("Connect to MongoDB failed"));

//Middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// route root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.post('/api/users', async (req, res) => {

  const findUsername = UserModel.findOne({ username: req.body.username });
  // Query hasn't been executed yet, so Mongoose hasn't casted the filter.
  findUsername.getFilter();
  const dataFound = await findUsername.exec();

  if (dataFound == null){
    UserController.create(req, res);
  } else {
    UserController.find(req, res);
  }

});

app.post('/api/users/:_id/exercises', UserController.createExercice);




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
