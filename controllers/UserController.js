let UserModel = require("../models/UserModel.js");
let UserController = {
    find: async (req, res) => {
        let found = await UserModel.find({ username: req.body.username });
        let response = { "username": found[0].username, "_id": found[0]._id }
        res.json(response);
    },
    all: async (req, res) => {
        let allUsers = await UserModel.find()
        let response = [];
        allUsers.forEach(user => response.push({ "username": user.username, "_id": user._id }));
        res.json(response);
    },
    create: async (req, res) => {
        let newUser = new UserModel(req.body);
        let savedUser = await newUser.save();
        res.json(savedUser);
    },
    getAllExercices: async (req, res) => {
        let foundUser = await UserModel.find({ _id: req.params._id }).populate("log");

        let response = {
            "username": foundUser[0].username,
            "count": foundUser[0].count,
            "_id": foundUser[0]._id,
            "log": []
        };
        foundUser[0].log.forEach(exercice => response.log.push(
            {
                "description": exercice.description,
                "duration": exercice.duration,
                "date": exercice.date.toDateString()
            }));

        res.json(response);
    },
    createExercice: async (req, res) => {
        console.log("createExercice", req.params);
        const exerciceToAdd = {
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString()
        };

        let found = await UserModel.find({ _id: req.params._id });
        if (found) {

            let query = await UserModel.findByIdAndUpdate({ _id: req.params._id }, { $inc: { 'count': 1 }, $push: { log: exerciceToAdd } });
            console.log(query);
            let response = { "username": found[0].username, ...exerciceToAdd, "_id": query.log._id };
            res.json(response);

        } else { res.status(500).json({ 'error': "id doesn't exist" }) }

    }

}
module.exports = UserController;
