//mongoose is a orm library to define schemas and validation
import mongoose from "mongoose";
const prodSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    rate:{
        type:Number,
        required:true
    }
    
});
//wrapping
export const Prod = mongoose.model("Prod",prodSchema);

const stuSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
          type:String,
         
    },
    googleId:{
        type:String,
        unique:true,
        sparse:true //this is because multiple local users would login through username and pwd (local)
//         //can make googleid null for that case 
//         //Allows users WITHOUT a googleId to exist, Your app supports:
// Normal signup (email/password)
// Google login
    }
});
export const Student = mongoose.model("Student",stuSchema);