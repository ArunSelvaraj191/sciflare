import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
     type:String,
     required:true   
    },
    password : {
     type:String,
     required:true   
    },
    phone_number : {
        type : String
    }
})

const UserModel = mongoose.model('User',userSchema);

export default UserModel;