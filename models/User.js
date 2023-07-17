const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email : {
        type: String,
        require: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    password:{
        type: String,
        require :[true, "Please provide an Password"],
        unique: false,
    }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);