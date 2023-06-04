import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "../Card/Card.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import { getFavoritesDB } from "../../Redux/actions/actionsFavorites.js";

const Favorites = ({ email }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavoritesDB(email));
  }, [dispatch, getFavoritesDB]);

  const datos = useSelector((state) => state?.favorites);

  return (
    <Container fluid my-3 pb-3 mx-5>
      <Row className="text-center">
        <Col>
          <h2>Favorites</h2>
        </Col>
      </Row>

      <Row>
        {datos?.map((e, i) => {
          if (e?.active) {
            return (
              <>
                <Card
                  key={i}
                  id={e?.product.id}
                  name={e?.product.name}
                  image={e?.product.image}
                  description={e?.product.description}
                  price={e?.product.price}
                  stock={e?.product.stock}
                  datos={datos}
                />
              </>
            );
          }
        })}
      </Row>
    </Container>
  );
};

export default Favorites;
