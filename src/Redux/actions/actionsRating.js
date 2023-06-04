import { GET_RATINGS } from "../types/typesRating";
import { getProducts } from "./actionsProducts";

export const getProductsRating = (allProducts) => {
  const ratingProducts = allProducts.sort((a,b) => {
    if ( a.averageRating < b.averageRating) return 1;
    else if ( a.averageRating > b.averageRating) return -1;
    else return 0;
  }).slice(0,4);
  console.log('ratingProducts ', ratingProducts);
  return {
    type: GET_RATINGS,
    payload: ratingProducts,
  };
;}
