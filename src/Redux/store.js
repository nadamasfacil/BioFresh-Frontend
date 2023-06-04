import {
     createStore,
    compose,
    applyMiddleware,
  } from "redux";
  
  import thunk from "redux-thunk"; //traductor para usar extencion permite hacer peticiones a la api
  import rootReducer from "./reducer"; // me traigo el reducer
  
  // create store => para crear la store
  // compose => para usar la app en el navegador de redux
  // applyMiddleware => para usar middleware() conectar con la extencion
  
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // para usar la extencion en el navegador
  
  const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk))); // para hacer peticiones a ala api
  
  export default store;
  