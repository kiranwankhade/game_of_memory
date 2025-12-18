import Score from "../models/Score.js";
import { sendResponse } from "../utils/response.js";

export const getLeaderBoard = async (req,res) => {
    const limit = Number(req.query.limit) || 10;

    const data = (await Score.find().sort({score: -1})).limit(limit).populate("userId","name");

    sendResponse({
        res,
        data,
        message:"Leaderboard fetched"
    })
}