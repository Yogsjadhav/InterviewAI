const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username is already taken"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Account is already exists with this email id"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
})

const UserModel = mongoose.model("Users",userSchema);
module.exports = UserModel;
