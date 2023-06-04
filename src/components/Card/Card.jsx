import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { AddToCartIcon } from "../Icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import {addFavorites, deleteFavorites,} from "../../Redux/actions/actionsFavorites";
import axios from "axios";
import { cartFoundIndex, foundOrderForDetail } from "../Cart/cartHelpers";
import { add_Cart, add_ToCart, remove_FromCart, set_Cart } from "../../Redux/actions/actionsCart";
import accounting from 'accounting';
import st from './Card.module.css'
import swal from 'sweetalert';

function Card({ id, name, image, description, price, tax, stock, rating, priceFlag, datos }) {

  const dispatch = useDispatch();

  const [isFav, setIsFav] = React.useState(false);
  const state = useSelector((state) => state.favorites);
  const user = useSelector(state=>state.userLogin);
  const cart = useSelector(state=>state.cart);
  const cartDetails = useSelector(state=>state.cartDetails);

  const addToCart = async () => {
    let product = {
      idOrder: '',
      idOrderDetail: '',
      idProduct: id,
      name: name,
      description: description,
      image: image,
      units: 1,
      price: price,
      tax: tax,
      stock: stock,
      amount: price,
      taxAmount: price * tax,
      totalAmount: ( price * tax ) + price,
    };
    if (user.email) {
      const orderUser = await foundOrderForDetail(user.email);
      const detailsData = {
        idOrder: orderUser.id,
        idProduct: id,
        units: 1
      };
      const detailCreated = await axios.post('/ordersDetails', detailsData);
      product = {
        ...product,
        idOrder: detailsData.idOrder,
        idOrderDetail: detailCreated.data.id,
      };
      dispatch(add_Cart(detailsData.idOrder));
    };
    if (cartDetails.length > 0) {
      let unitsProduct = cartFoundIndex(product.idProduct, cartDetails);
      if (unitsProduct !== null) {
        dispatch(remove_FromCart(product.idProduct, cartDetails));
        unitsProduct = unitsProduct + 1;
        product = {
          ...product,
          units: unitsProduct,
          amount: (price * unitsProduct),
          taxAmount: (price * unitsProduct) * tax,
          totalAmount: ( (price * unitsProduct) * tax ) + (price * unitsProduct),
        };
      };
    };
    dispatch(add_ToCart(product, cartDetails));
    swal("Congratulations", "Product added to cart", "success");
  };

  const userLogueado = useSelector((state) => state?.userLogin);

  const handleFavorite = async () => {
    if (isFav) {
      setIsFav(false);
      dispatch(
        deleteFavorites(
          { userEmail: userLogueado?.email, productId: id },
          userLogueado?.email
        )
      );
    } else {
      setIsFav(true);
      dispatch(addFavorites({ userEmail: userLogueado?.email, productId: id }));
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

  useEffect(()=>{ 
    if (cartDetails.length > 0) localStorage.setItem('cartDetails', JSON.stringify({
      cart: cart,
      details: cartDetails 
    }));
  },[cartDetails]);

  return (
    <div className="col-8 offset-2 py-1 col-sm-6 offset-sm-0 py-sm-1 col-md-6 offset-md-0 py-md-1 col-lg-4 offset-lg-0 py-lg-1 px-lg-3 col-xl-3 offset-xl-0 py-xl-1 px-xl-3 mt-1 mb-3 text-center">
      {name ? (
        <div className="card" id={st.card_container}>
          <div className="card-body">
            <Link to={`/detail/${id}`}>
              <img src={image} className="card-img-top img-fluid" alt={name} />
            </Link>
            <h5 className="card-title">{name}</h5>
            <p className="card-text mb-0">{description}</p>
            <p className="col-6 offset-3 mt-1" ><strong>{accounting.formatMoney(`${price}`)}</strong></p>
            <div className="d-flex gap-1 col-12 col-md-12 justify-content-center" >
              { rating > 1 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
              { rating > 2 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
              { rating > 5 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
              { rating > 10 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
              { rating > 19 ? <p className="col-1">⭐️</p> : <p className="col-1">★</p> }
            </div>
            <div className="row">
              <Button variant="btn btn-success mt-2" className="col-6 offset-3" onClick={addToCart}>+ Add To Cart</Button>
              {userLogueado.email ? (
                  isFav ? (
                      <button
                          className={st.btnFav}
                          onClick={handleFavorite}
                          style={{ border: 0 }}
                      >
                        ❤️
                      </button>
                  ) : (
                      <button className={st.btnFav} onClick={handleFavorite}>
                        🤍
                      </button>
                  )
              ) : (
                  ""
              )}
            </div>
          </div>

        </div>
      ) : null}
    </div>
  );
}

export default Card;
