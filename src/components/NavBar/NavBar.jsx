import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import s from "./NavBar.module.css";
import { getCategories } from "../../Redux/actions/actionsCategories";
import { useEffect } from "react";
import { getProducts } from "../../Redux/actions/actionsProducts";
import { Link, useLocation } from "react-router-dom";

export default function Categories() {
  const userAdmin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const location = useLocation();
  const categories = useSelector((state) => state.allCategories);
  const products = useSelector((state) => state.allProducts);

  useEffect(() => {
    getCategories()
    getProducts()
  }, [dispatch])
  

  return (
    <Navbar
      className={s.container_settings}
      collapseOnSelect
      expand="lg"
      variant=""
    >
      <Container className={s.navBar}>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="mx-auto"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="">
            <Link to="/" id={s.item}>
              HOME
            </Link>
            {location.pathname.substring(0, 6) !== "/store" && (
              <NavDropdown id={s.item} title="CATEGORIES">
                <Link className="d-block" id={s.subItem} to="/store">
                  All Products
                </Link>
                {categories?.map((c) => (
                  <div key={c.id}>
                    <NavDropdown.Divider />
                    <Link
                      className="d-block"
                      id={s.subItem}
                      to={`/store/${c.id}`}
                    >
                      {c.name}
                    </Link>
                  </div>
                ))}
              </NavDropdown>
            )}
            <Link to="/about" id={s.item}>
              ABOUT US
            </Link>
            <Link to="/contact" id={s.item}>
              CONTACT US
            </Link>
            {userAdmin.adminType ? (
              <Link to="/settings" id={s.item}>
                SETTINGS
              </Link>
            ) : null}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
