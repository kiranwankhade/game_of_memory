import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
} from "./actionsTypes";

const tokenFromStorage = localStorage.getItem("game_token");
const initialState = {
  user: null,
  token: tokenFromStorage,
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case LOAD_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: null,
      };

    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOAD_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return {
        user: null,
        token: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
