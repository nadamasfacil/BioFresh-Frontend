import axios from "axios";
import {
  LOGIN_USER,
  ALL_USERS,
  LOGIN_USER_GOOGLE,
  LOGOUT_USER,
  SET_USER,
  EMAIL,
  RESET,
} from "../types/typesUser.js";

export const userLogin = ({ email, password }) => {
  return async function (dispatch) {
    try {
      const user = await axios.post("/users/login", { email, password });
      localStorage.setItem("user", JSON.stringify(user.data));
      return dispatch({
        type: LOGIN_USER,
        payload: user.data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const userLoginGoogle = (infoUserGoogle) => {
  return async function (dispatch) {
    try {
      const userGoogle = {
        email: infoUserGoogle.email,
        firstname: infoUserGoogle.givenName,
        lastname: infoUserGoogle.familyName,
      };

      const user = await axios.post("/users/login/google", userGoogle);
      localStorage.setItem("user", JSON.stringify(user.data));
      return dispatch({
        type: LOGIN_USER_GOOGLE,
        payload: user.data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const userLogout = () => {
  return function () {
    localStorage.removeItem("user");
    return {
      type: LOGOUT_USER,
      payload: {},
    };
  };
};
export const allUsers = () => {
  return async function (dispatch) {
    try {
      const allUserDB = await axios("/users");
      return dispatch({
        type: ALL_USERS,
        payload: allUserDB.data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const setUser = (data) => {
  return function (dispatch) {
    return dispatch({
      type: SET_USER,
      payload: data,
    });
  };
};

export const emailForgotPassword = (email) => {
  return function (dispatch) {
    return dispatch({
      type: EMAIL,
      payload: email,
    });
  };
};

export const reset = () => {
  return { type: RESET, payload: {} };
};
