import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type : String,
     required:true   
    },
    username : {
     type:String,
     required:true   
    },
    password : {
     type:String,
     required:true   
    },
    role : {
        type : Number,
        required:true   
    },
    
    phone_number : {
        type : String
    },
    age : {
        type:Number
    },
})

const UserModel = mongoose.model('User',userSchema);

export default UserModel;