import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { SET_USER, GET_ERRORS } from "./types";

// create new user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/create", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// remember logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  };
};

// log user in
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // get and save token to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      // decode and store user data
      const decoded = jwt_decode(token);
      dispatchEvent(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// log user out
export const logoutUser = () => dispatch => {
  // remove user's token from local storage
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  // set authenicated boolean to false
  dispatch(setCurrentUser({}));
};
