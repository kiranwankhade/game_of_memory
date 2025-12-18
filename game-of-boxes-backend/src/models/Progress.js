import mongoose  from "mongoose";

const progressSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User" , unique:true},
    bestScore:{type:Number , default: 0},
    maxLevel:{type:Number , default: 1},
    bestAccuracy:{type:Number , default: 0},
    currentStreak:{type:Number , default: 0},
    longestStreak:{type:Number , default: 0},
    lastPlayed: Date
});

export default mongoose.model("Progress",progressSchema);