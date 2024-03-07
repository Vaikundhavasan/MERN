const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        userName:{
            type:String,
            required:[true,"Enter User Name"],
        },
        password:{
            type:String,
            required:[true,"Enter Password"]
        },
    },
    {
     timestamps:true,
    }
);

const Users = mongoose.model("Users",UserSchema);

module.exports = Users;

