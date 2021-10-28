let UserModel = require("../models/UserModel.js");
let UserController = {
    find: async (req, res) => {
        let found = await UserModel.find({ username: req.body.username });
        res.json(found);
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
        let foundUser = await UserModel.find({ username: req.body.username }).populate("Exercices");
        res.json(foundUser);
    }
}
module.exports = UserController;
