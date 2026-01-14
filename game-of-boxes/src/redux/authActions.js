import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
} from "./actionsTypes";
import API from "../utils/api";
import { toast } from "react-toastify";


export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });

  try {
    const res = await API.get("/auth/me");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL });
    localStorage.removeItem("game_token");
    delete API.defaults.headers.common["Authorization"];
  }
};

// EMAIL LOGIN
export const loginEmail = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await API.post("/auth/login", { email, password });
    const authToken = res.data.data.token;

    localStorage.setItem("game_token", authToken);
    API.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
    toast.success("Login Successful!");
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.message || "Login failed",
    });
    toast.error(err.response?.data?.message);
  }
};

// EMAIL SIGNUP
export const signUpEmail = (name, email, password) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const res = await API.post("/auth/signup", { name, email, password });
    const authToken = res.data.data.token;

    localStorage.setItem("game_token", authToken);
    API.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data.data });
    toast.success("Sign Up Successful!");
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response?.data?.message || "Sign-Up Failed",
    });
    toast.error(error.response?.data?.message);
  }
};

// GOOGLE LOGIN
export const loginGoogle = (token) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await API.post("/auth/google/login", { token });
    const authToken = res.data.data.token;

    localStorage.setItem("game_token", authToken);
    API.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
    toast.success("Login Successful!");
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.message || "Google login failed",
    });
    toast.error(err.response?.data?.message);
  }
};

// Goggle Signup

export const signupGoogle = (token) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const res = await API.post("/auth/google/signup", { token });
    const authToken = res.data.data.token;

    localStorage.setItem("game_token", authToken);
    API.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data.data });
    toast.success("Sign Up Successful!");
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: err.response?.data?.message || "Google Signup failed",
    });
    toast.error(err.response?.data?.message);
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("game_token");

  delete API.defaults.headers.common["Authorization"];

  dispatch({ type: LOGOUT });
  toast.success("LogOut Successfully!");
};
