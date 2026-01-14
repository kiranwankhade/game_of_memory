import {
  GAME_SUBMIT_REQUEST,
  GAME_SUBMIT_SUCCESS,
  GAME_SUBMIT_FAIL,
} from "./actionsTypes";


const initialState = {
  loading: false,
  success: false,
  error: null,
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_SUBMIT_REQUEST:
      return { loading: true };

    case GAME_SUBMIT_SUCCESS:
      return { loading: false, success: true };

    case GAME_SUBMIT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}
