import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAIL } from "./actionsTypes";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case PROFILE_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case PROFILE_FAIL:
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
}
