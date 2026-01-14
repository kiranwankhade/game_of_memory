import API from "../utils/api";
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
} from "./actionsTypes";

export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: PROFILE_REQUEST });

  try {
    const res = await API.get("/profile/me");
    dispatch({
      type: PROFILE_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
      payload: err.response?.data?.message || "Failed to load profile",
    });
  }
};
