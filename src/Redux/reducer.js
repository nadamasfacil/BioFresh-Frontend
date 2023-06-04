import { FILTER_BY_CATEGORIES, GET_ALLCATEGORIES } from "./types/typesCategories";
import { GET_ALLPRODUCTS, GET_PRODUCTSBYNAME } from "./types/typesProducts";
import { ALL_USERS, EMAIL, LOGIN_USER , LOGIN_USER_GOOGLE , LOGOUT_USER , SET_USER, RESET } from "./types/typesUser.js";
import { DELETE_FAVORITES, ADD_FAVORITES, GET_FAVORITES_DB } from "./types/typesFavorites";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, STATUS_CHANGE_ORDER, SET_CART, ADD_CART } from "./types/typesCart";
import { SET_SHIPPING_OPTIONS, SAVE_SHIPPING_DATA, REFRESH_TOTAL_AMOUNT } from "./types/typesDeliveries";
import { GET_RATINGS } from "./types/typesRating";


const initialState = {
  users: [],
  userLogin: {},
  userEmail: [],
  allProducts: [],
  products: [],
  showProducts: [],
  nameProducts: '',
  flagProducts: false,
  favorites: [],
  allCategories: [],
  categorieFilter: null,
  cart: '',
  cartDetails: [],
  shippingOption: '',
  totalAmount: 0,
  shippingAddress: [],
  ratingProducts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLPRODUCTS:{
      return {
        ...state,
        allProducts: action.payload,
        products: action.payload,
      }
    };
    case GET_PRODUCTSBYNAME:{
      return {
        ...state,
        showProducts: action.payload.products,
        nameProducts: action.payload.name,
        flagProducts: action.payload.flag,
      }
    };
    case GET_ALLCATEGORIES: {
      return {
        ...state,
        allCategories: action.payload,
      }
    };
    case FILTER_BY_CATEGORIES:
      return {
        ...state,
        products: action.payload,
      }
    case ALL_USERS:{
      return {
        ...state,
        users: action.payload
      }
    };
    case LOGIN_USER:{
      return {
        ...state,
        userLogin: action.payload
      }
    };
    case LOGIN_USER_GOOGLE: {
      return {
        ...state,
        userLogin: action.payload
      }
    };
    case LOGOUT_USER:{
      return {
        ...state,
        userLogin : action.payload
      }
    };
    case SET_USER:{
      return {
        ...state,
        userLogin: action.payload
      }
    };
    case EMAIL: {
      return {
        ...state,
        userEmail: action.payload
      }
    }
    
    case ADD_CART: {
      return {
        ...state,
        cart: {
          ...state.cart,
          orderId: action.payload
        }
      }
    }
    case SET_CART: {
      return {
        ...state,
        cart: {
          ...state.cart,
          amount: action.payload.amount,
          taxAmount: action.payload.taxAmount,
          totalAmount: action.payload.totalAmount
        }
      }
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cartDetails: [ ...state.cartDetails, action.payload.product ]
      }
    }
    case REMOVE_FROM_CART: {

      return {
        ...state,
        cartDetails: action.payload.products,
      }
    }
    case STATUS_CHANGE_ORDER:{

      return{
        ...state
      }
    }
    case CLEAR_CART: {
      return {
        ...state,
        cart: {
          ...state.cart,
          amount: 0,
          taxAmount: 0,
          totalAmount: 0,
        },
        cartDetails: [],
      }
    }
    case ADD_FAVORITES: {
      return {
        ...state,
        favorites: action.payload,
      };
    }
    case DELETE_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case GET_FAVORITES_DB:
      return {
        ...state,
        favorites: action.payload,
      };
    case SET_SHIPPING_OPTIONS: {
      return {
        ...state,
        shippingOption: action.payload,
      };
    };
    case REFRESH_TOTAL_AMOUNT: {
      return {
        ...state,
        totalAmount: action.payload
      }
    };
    case SAVE_SHIPPING_DATA: {
      return {
        ...state,
        shippingAddress: action.payload
      }
    }
    case GET_RATINGS:
      return {
        ...state,
        ratingProducts: action.payload,
      };

    case RESET:
      return {
        ...state,
        userLogin: action.payload,
      };
    default:
      return {...state};
  };
};

export default rootReducer;
