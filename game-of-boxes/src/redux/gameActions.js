import {
  GAME_SUBMIT_REQUEST,
  GAME_SUBMIT_SUCCESS,
  GAME_SUBMIT_FAIL,
} from "./actionsTypes";
import API from "../utils/api";
import { toast } from "react-toastify";


export const submitGame = (token, data) => async (dispatch) => {
  dispatch({ type: GAME_SUBMIT_REQUEST });
  try {
    await API.post("/game/submit", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: GAME_SUBMIT_SUCCESS });
    // toast.success("Progress Saved!");
  } catch (err) {
    dispatch({
      type: GAME_SUBMIT_FAIL,
      payload: err.response?.data?.message || "Game submit failed",
    });
    // toast.error(err.response?.data?.message);
  }
};
