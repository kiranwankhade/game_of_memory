import User from "../models/User.js";
import Progress from "../models/Progress.js";
import Score from "../models/Score.js";
import { sendResponse } from "../utils/response.js";

export const getMyProfile = async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId).select("name email avatar createdAt");
  const progress = await Progress.findOne({ userId });
  const scores = await Score.find({ userId }).sort({ createdAt: -1 });

  sendResponse({
    res,
    data: {
      user,
      progress,
      scores,
    },
    message: "User profile fetched",
  });
};
