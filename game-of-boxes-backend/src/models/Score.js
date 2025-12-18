import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: Number,
  level: Number,
  accuracy: Number,
  createdAt: { type: Date, default: Date.now },
});

scoreSchema.index({score: -1})

export default mongoose.model("Score", scoreSchema);
