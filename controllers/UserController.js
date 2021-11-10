let UserModel = require("../models/UserModel.js");
let UserController = {
    find: async (req, res) => {
        let found = await UserModel.find({ username: req.body.username });
        let response =  {"username":found[0].username, "_id":found[0]._id }
        res.json(response);
    },
    all: async (req, res) => {
        let allUsers = await UserModel.find()
        let response = [];
        allUsers.forEach(user => response.push( {"username":user.username,  "_id":user._id}));
        res.json(response);
    },
    create: async (req, res) => {
        let newUser = new UserModel(req.body);
        let savedUser = await newUser.save();
        res.json(savedUser);
    },
    getAllExercices: async (req, res) => {
        let foundUser = await UserModel.find({ _id: req.params._id }).populate("log");
        res.json(foundUser);
    },
    createExercice: async (req, res) => {
        const exerciceToAdd = {
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date? req.body.date : new Date().toDateString ()
        };

        let found = await UserModel.find({ _id: req.body[":_id"]});
        if(found){
        
            await UserModel.findByIdAndUpdate({ _id: req.body[":_id"] },{ $inc : {'count' : 1}  ,$push: {log: exerciceToAdd} });
            let response = {"username":found[0].username,"count":found[0].count +1 , ...exerciceToAdd,"_id":found[0]._id  };
            res.json(response);
            
        }else{ res.json({'error':"id doesn't exist"}) }
        
    }

}
module.exports = UserController;
