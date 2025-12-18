import Score from "../models/Score.js";
import Progress from "../models/Progress.js";
import { sendResponse } from "../utils/response.js";

export const submitGame = async (req,res) => {
    const {score,level,accuracy} = req.body;

    await Score.create({
        userId: req.userId,
        score,
        level,
        accuracy
    });

    const progress = await Progress.findOne({userId: req.userId});

    progress.bestScore = Math.max(progress.bestScore,score);
    progress.maxLevel = Math.max(progress.maxLevel,level);
    progress.bestAccuracy = Math.max(progress.bestAccuracy,accuracy);
    progress.lastPlayed = new Date();

    await progress.save();

    sendResponse({
        res,
        message:"Game Progress Saved"
    })

    
}