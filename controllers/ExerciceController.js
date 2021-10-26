let ExerciceModel = require("../models/ExerciceModel.js");
let ExerciceController = {
    find: async (req, res) => {
        let found = await ExerciceModel.find({ name: req.params.description });
        res.json(found);
    },
    all: async (req, res) => {
        let allExercices = await ExerciceModel.find()
        res.json(allUsers);
    },
    create: async (req, res) => {
        let newUser = new ExerciceModel(req.body);
        let savedUser = await newUser.save();
        res.json(savedUser);
    }
}
module.exports = ExerciceController;