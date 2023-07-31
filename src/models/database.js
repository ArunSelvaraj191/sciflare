import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : String,
    password : String
})

const UserModel = mongoose.model('User',userSchema);

export default UserModel;