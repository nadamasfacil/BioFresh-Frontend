import axios from "axios"
import { GET_ALLPRODUCTS, GET_PRODUCTSBYNAME } from "../types/typesProducts";

export const getProducts = async () => {
  try {
    const products = await axios.get('/products');
    if (products === null) throw Error('Products not found');
    return { type: GET_ALLPRODUCTS, payload: products.data };
  } catch (error) {
    return { error: error.message };
  }
};

export const getProductsByName = async (name, flag) => {
  try {
    const nameProducts = await axios.get('/products?name='+name);
    if (nameProducts === null) throw Error('Product not found');
    return { type: GET_PRODUCTSBYNAME, payload: { products: nameProducts.data, name: name , flag: flag} };
  } catch (error) {
    return { error: error.message };
  };
};

export const getProductById = async (idProduct) => {
  try {
    const productFound = await axios.get('/products/'+idProduct);
    if (productFound === null) throw Error('Product not Found');
    return productFound.data;
  } catch (error) {
    return { error: error.message };
  }
};