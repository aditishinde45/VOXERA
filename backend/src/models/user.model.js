import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    name:{type:String , required:true},
    username:{type:String ,required:true,unique:true},
    passward:{type:String},
    token:{type:String,
        unique: true, // <-- IMPORTANT: Make sure this is here
        sparse: true // <-- Allows multiple users to have no token (null value)
    }
});
const User=mongoose.model("User",userSchema);
export {User};