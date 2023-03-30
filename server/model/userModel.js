const mongoose = require('mongoose');

const UserSchame = new mongoose.Schema({

    email:{
        type: String, 
        required: true
    },
    
    passwordHash:{
        type:String,
        required:true,
        

    },
    date:{
        type:Date,
        default:Date.now
    }
});

const User  = mongoose.model("User",UserSchame);
module.exports = User;
