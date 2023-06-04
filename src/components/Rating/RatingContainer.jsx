import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card.jsx";
import Container from 'react-bootstrap/Container'
import { getProductsRating } from "../../Redux/actions/actionsRating.js";
import { getFavoritesDB } from "../../Redux/actions/actionsFavorites.js";

function RatingContainer ({ whereIAm, hereIAm }) {

  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.allProducts);
  const showProducts = useSelector(state => state.ratingProducts);
  const cartDetails = useSelector(state => state.cartDetails);
  

  const loadinRating = () => {
    dispatch(getProductsRating(allProducts));
  };

  useEffect(()=>{
    loadinRating();
  },[allProducts, cartDetails]);

  const userLogueado = useSelector((state) => state?.userLogin.email);

  useEffect(() => {
    dispatch(getFavoritesDB(userLogueado));
  }, []);

  const datos = useSelector((state) => state.favorites);

  return (
    <Container fluid >

      <section className="row">
        {showProducts.length > 0 && showProducts.map((product, index) => (
          <Card 
          key={index}
          id={product.id}
          name={product.name}
          image={product.image}
          description={product.description}
          price={product.price}
          tax={product.tax}
          stock={product.stock}
          rating={product.averageRating}
          priceFlag={false}
          datos={datos}
          />
          ))}
      </section>

    </Container>
  );
}

export default RatingContainer;