import {
  GAME_SUBMIT_REQUEST,
  GAME_SUBMIT_SUCCESS,
  GAME_SUBMIT_FAIL,
  GAME_SUBMIT_RESET,
} from "./actionsTypes";


const initialState = {
  loading: false,
  success: false,
  error: null,
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_SUBMIT_REQUEST:
      return { ...state, loading: true };

    case GAME_SUBMIT_SUCCESS:
      return { ...state, loading: false, success: true };

    case GAME_SUBMIT_FAIL:
      return { ...state, loading: false, error: action.payload };
    
    case GAME_SUBMIT_RESET:
        return { ...initialState };

    default:
      return state;
  }
}
