import axios from "axios";
import { GET_ALLCATEGORIES, FILTER_BY_CATEGORIES } from "../types/typesCategories";

export const getCategories = async () => {
  try {
    const categories = await axios.get('/categories');
    return { type: GET_ALLCATEGORIES, payload: categories.data };
  } catch (error) {
    return { error: message.error };
  }
};

export const filterByCategories = async (category, order) => {
  try {
    const orderFilter = order ? '&order='+order : '';
    const arrayFound = '/products?category='+category+orderFilter
    const productsArray = await axios.get(arrayFound);
    if (productsArray.lenght < 1) throw Error('There are no products for this category');
    return {
        type: FILTER_BY_CATEGORIES,
        payload: productsArray.data,
    }
  } catch (error) {
    return { error: error };
  }
}