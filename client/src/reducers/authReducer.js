import { SET_USER } from "../actions/types";

// initial state with no user and no authentication
const initialState = {
  isAuth: false,
  user: {}
};

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// auth reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
