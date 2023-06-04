import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { cartFoundIndex, foundOrderForDetail, getCartDetail } from "../Cart/cartHelpers.js";
import {getFavoritesDB, addFavorites, deleteFavorites} from "../../Redux/actions/actionsFavorites";
import { AddToCartIcon } from "../Icons/Icons";
import { add_Cart, add_ToCart, remove_FromCart, set_Cart } from "../../Redux/actions/actionsCart.js";
import swal from 'sweetalert';
import accounting from 'accounting';

const Detail = ({ whereIAm, hereIAm, email }) => {

  const user = useSelector(state=>state.userLogin);
  const nameProducts = useSelector(state=>state.nameProducts);
  const cart = useSelector(state=>state.cart);
  const cartDetails = useSelector(state=>state.cartDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [product, setProduct] = React.useState({});
  const [cant, setCant] = React.useState(1);

  const getProductForId = async () => {
    try {
      const Data = await axios(`/products/${id}`);
      const char = Data.data;
      console.log(char);
      if (char) {
        setProduct(char);
      }
    } catch (error) {
      swal("Error","Product not found", "error");
    }
  };

  React.useEffect(() => {
    getProductForId();
    dispatch(getFavoritesDB(email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  const validacion = (e) => {
    setCant(e.target.value);
  };

  const addToCart = async () => {
    let productModify = {
      idOrder: '',
      idOrderDetail: '',
      idProduct: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      units: parseInt(cant),
      price: product.price,
      tax: product.tax,
      stock: product.stock,
      amount: (product.price * parseInt(cant)),
      taxAmount: (product.price * parseInt(cant)) * product.tax,
      totalAmount: ( (product.price * parseInt(cant)) * product.tax ) + (product.price * parseInt(cant)),
    };
    let detailFlag = false;
    if (cartDetails.length > 0) {
      let unitsProduct = cartFoundIndex(product.id, cartDetails);
      if (unitsProduct !== null) {
        const detailFound = await getCartDetail(product.id, cartDetails);
        dispatch(remove_FromCart(product.id, cartDetails));
        unitsProduct = unitsProduct + parseInt(cant);
        productModify = {
          ...productModify,
          idOrder: detailFound.idOrder,
          idOrderDetail: detailFound.idOrderDetail,
          units: unitsProduct,
          amount: (product.price * unitsProduct),
          taxAmount: (product.price * unitsProduct) * product.tax,
          totalAmount: ( (product.price * unitsProduct) * product.tax ) + (product.price * unitsProduct),
        };
        detailFlag = true;
        dispatch(add_Cart(detailFound.idOrder));
      };
    };
    if (!detailFlag && user.email) {
      const orderUser = await foundOrderForDetail(user.email);
      const detailsData = {
        idOrder: orderUser.id,
        idProduct: id,
        units: 1
      };
      const detailCreated = await axios.post('/ordersDetails', detailsData);
      productModify = {
        ...productModify,
        idOrder: detailsData.idOrder,
        idOrderDetail: detailCreated.data.id,
      };
      dispatch(add_Cart(detailsData.idOrder));
    };
    dispatch(add_ToCart(productModify, cartDetails));
    if (user.email) {
      const updateData = {
        idDetail: productModify.idOrderDetail,
        units: productModify.units,
      };
      console.log('updateData en Detalle ', updateData);
      const orderDetailUpdate = await axios.put('/ordersDetails', updateData );
    };
    swal("Congratulations", "Product added to cart", "success");
  };

  useEffect(()=>{
    if (cartDetails.length > 0) localStorage.setItem('cartDetails', JSON.stringify({
      cart: cart,
      details: cartDetails 
    }));},[cartDetails]);

  const returnTo = () => {
    const returnWhere = whereIAm;
    hereIAm({
      place: 'detail',
      order: returnWhere.order,
      filter: returnWhere.filter,
      name: nameProducts,
      currentPage: returnWhere.currentPage
    });
    navigate('/'+returnWhere.place);
  }

  const escape = () => {
    const returnWhere = whereIAm;
    hereIAm(returnWhere);
  };

  useEffect(()=>{
    getProductForId();
    escape();
  },[]);
  const userLogueado = useSelector((state) => state?.userLogin);

  const datos = useSelector((state) => state?.favorites);

  const [isFav, setIsFav] = React.useState(false);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(
          deleteFavorites({ userEmail: userLogueado.email, productId: id })
      );
    } else {
      setIsFav(true);
      dispatch(addFavorites({ userEmail: userLogueado.email, productId: id }));
    }
  };

  useEffect(() => {
    datos?.forEach((fav) => {
      if (fav.productId === id) {
        if (fav.active) {
          setIsFav(true);
        } else {
          setIsFav(false);
        }
      }
    });
  }, [datos, id]);
  return (
    <div className="container-fluid">
      <div className="row text-center mt-5 mb-5">
        <figure className="col-lg-6 col-12">
          <img
            src={product?.image}
            alt={product?.name}
            width="320"
            height="320"
          />
        </figure>

        <div className="col-lg-6 col-12">
          <h1 >{product.name}</h1>

          <h2>{accounting.formatMoney(`${product.price}`)}</h2>
          <p> {product.description}</p>
          <div className="d-flex col-12 col-md-12 justify-content-center" >
          { product.averageRating > 1 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
          { product.averageRating > 2 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
          { product.averageRating > 5 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
          { product.averageRating > 10 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
          { product.averageRating > 19 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
        </div>
          <div>
            <strong>Available:</strong>
            <strong> {product.stock} units</strong>
          </div>

          <div className="d-flex gap-2 justify-content-center col-12 mt-3">
            <input 
              type="number"
              value={cant}
              min={1}
              max={product.stock}
              onChange={validacion}
              className="col-3"
              style={{ width: "45px", marginTop: "10px" }}
            />

            <Button variant="btn btn-success mt-2" className="col-md-4 col-lg-3 offset-lg-2 col-sm-5 offset-1" onClick={addToCart}>+ Add To Cart</Button>
          </div>
          <div className="row justify-content-center mt-3">
            <Button variant="btn btn-success mt-2" className="col-4 col-md-3 col-lg-4 col-sm-3" onClick={returnTo} >Return {whereIAm.place === '' ? 'Home' : whereIAm.place}</Button>
            {userLogueado.email ? (
              isFav ? (
                <button
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                  }}
                  className=""
                  onClick={handleFavorite}
                >
                  ❤️
                </button>
              ) : (
                <button
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                  }}
                  onClick={handleFavorite}
                >
                  🤍
                </button>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;