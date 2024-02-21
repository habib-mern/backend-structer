const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email:{type:String, unique:true},
        password:{type:String, required:true},
        firstName:{type:String, required:true},
        lastName:{type:String, required:true},
        profilePicture:{type:String},
        createdDate: {type:Date, default:Date.now}
    },
    {versionKey: false}
)

const UserModel = mongoose.model("users",userSchema);
module.exports = UserModel;