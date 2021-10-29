let UserModel = require("../models/UserModel.js");
let UserController = {
    find: async (req, res) => {
        let found = await UserModel.find({ username: req.body.username });
        let response =  {"username":found[0].username, "_id":found[0]._id }
        res.json(response);
    },
    all: async (req, res) => {
        let allUsers = await UserModel.find()
        res.json(allUsers);
    },
    create: async (req, res) => {
        let newUser = new UserModel(req.body);
        let savedUser = await newUser.save();
        res.json(savedUser);
    },
    getAllExercices: async (req, res) => {
        let foundUser = await UserModel.find({ username: req.body.username }).populate("exercices");
        res.json(foundUser);
    },
    createExercice: async (req, res) => {
        const exerciceToAdd = {
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date? req.body.date : Date.now()};
        let foundAndUpdate = await UserModel.findByIdAndUpdate({ _id: req.params._id },{$push: {log: exerciceToAdd} });
        console.log(exerciceToAdd);
        res.json(exerciceToAdd);
    },
}
module.exports = UserController;
