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
