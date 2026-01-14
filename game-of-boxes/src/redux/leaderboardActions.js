import {
  LEADERBOARD_REQUEST,
  LEADERBOARD_SUCCESS,
  LEADERBOARD_FAIL,
} from "./actionsTypes";
import API from "../utils/api";

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch({ type: LEADERBOARD_REQUEST });
  try {
    const res = await API.get("/leaderboard");
    console.log("leaderboard",res.data)
    dispatch({ type: LEADERBOARD_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: LEADERBOARD_FAIL,
      payload: err.response?.data?.message || "Failed to load leaderboard",
    });
  }
};
