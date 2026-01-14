import {
  LEADERBOARD_REQUEST,
  LEADERBOARD_SUCCESS,
  LEADERBOARD_FAIL,
} from "./actionsTypes";

const initialState = {
  loading: false,
  list: [],
  error: null,
};

export default function leaderboardReducer(state = initialState, action) {
  switch (action.type) {
    case LEADERBOARD_REQUEST:
      return { ...state, loading: true };

    case LEADERBOARD_SUCCESS:
      return { loading: false, list: action.payload };

    case LEADERBOARD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}
