import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String , unique: true},
    password:{type:String},
    provider:{type:String , enum: ["email","google"]},
    email:{type:String , unique: true},
    createdAt:{type:Date , default: Date.now},
    lastLogin:Date,
},
{
    versionKey: false
});

export default mongoose.model("User",userSchema);