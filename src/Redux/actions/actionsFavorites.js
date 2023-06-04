import {
  ADD_FAVORITES,
  DELETE_FAVORITES,
  GET_FAVORITES_DB,
} from "../types/typesFavorites";
import axios from "axios";

export const addFavorites = (favorites) => {
  return async function (dispatch) {
    const result = await axios.post("/favorites", favorites);
    return result;
  };
  // return {
  //   type: ADD_FAVORITES,
  //   payload: favorites,
  // };
};
export const deleteFavorites = (favorites,email) => {
  return async function (dispatch) {
   await axios.post("/favorites", favorites);
    const llamado = await axios.get(`/favorites/${email}`);
    return dispatch({ type: GET_FAVORITES_DB, payload: llamado.data });
  };
  // return {
  //   type: DELETE_FAVORITES,
  //   payload: name,
  // };
};

export const getFavoritesDB = (email) => {
  return async function (dispatch) {
    const llamado = await axios.get(`/favorites/${email}`);
    return dispatch({ type: GET_FAVORITES_DB, payload: llamado.data });
  };
};
