import Progress from "../models/Progress.js";
import Score from "../models/Score.js";
import { sendResponse } from "../utils/response.js";

export const getLeaderBoard = async (req,res) => {
    const limit = Number(req.query.limit) || 10;

    const data = await Progress.find()
    .sort({ bestScore: -1 })          // highest first
    .limit(limit)
    .populate("userId", "name email");

  sendResponse({
    res,
    data,
    message: "Leaderboard fetched",
  });
}