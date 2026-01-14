import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";

import gameReducer from "./gameReducer";
import leaderboardReducer from "./leaderboardReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

const reducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  leaderboard: leaderboardReducer,
  profile:profileReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
