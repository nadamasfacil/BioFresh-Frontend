import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import st from "../ProductsSettings/Form.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import validate from "./validate.js";
import styles from "./ProductsSettings.module.css";
import swal from "sweetalert";
import { getProducts } from "../../Redux/actions/actionsProducts";
import { getCategories } from "../../Redux/actions/actionsCategories";

const ModProduct = ({ id, name, show, handleClose }) => {
  const dispatch = useDispatch();
  const [button, setButton] = useState(true);

  const [form, setForm] = useState({
    id,
    name,
    image: "",
    description: "",
    price: "",
    stock: "",
    tax: "",
    categories: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categories: "",
  });

  form.id = id;

  form.tax = "1";

  //? CAPTURAR EL INPUT EN STATE LOCAL FORM
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
    console.log(errors);
  };

  //? ESTADO DE BOTON DE SUBMIT CONTROLADO CON USEEFFECT
  //traer los datos del producto

  useEffect(() => {
    if (form.name !== "") {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [form, setButton]);

  //! CATEGORIES

  let allCategories = useSelector((state) => state.allCategories);
  console.log(allCategories);
  const [categories, setCategories] = useState(allCategories);
  const [categoriesSel, setCategoriesSel] = useState([]);
  const handlerSelectCategory = (e) => {
    let nomCategory = e.target.options[e.target.options.selectedIndex].text;
    let value = e.target.value;
    if (value !== -1) {
      setForm({ ...form, categories: [...form.categories, value] });
      setCategoriesSel([...categoriesSel, { value, name: nomCategory }]);
      setCategories(categories.filter((ele) => ele.id !== value));
    }
  };
  const deleteCategorie = (elem) => {
    //
    const { value, name } = elem;
    // console.log(elem)
    setCategoriesSel(categoriesSel.filter((ele) => ele.value !== value));
    setForm({
      ...form,
      categories: form.categories.filter((ele) => ele !== value),
    });
    setCategories([...categories, { id: value, name }]);
  };

  //? PARA ENVIAR LOS DATOS AL BACK
  const loadingData = async () => {
    const data = await getProducts();
    dispatch(data);
    setCategories(allCategories);
    setCategoriesSel([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        form.id !== "" &&
        form.name !== "" &&
        !errors.name &&
        form.description !== "" &&
        !errors.price &&
        form.price !== "" &&
        form.stock !== "" &&
        !errors.stock &&
        form.image !== "" &&
        form.categories.length > 0
      ) {
        const result = await axios.put("/products/", form);
        if (result) {
          setForm({
            id: "",
            name: "",
            image: "",
            description: "",
            price: "",
            stock: "",
            categories: [],
          });
          loadingData();
          alert("Successfully modified product.");
        }
      }
    } catch (error) {
      alert("No completado");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <h3>Product to modify {name}</h3>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <FloatingLabel
              controlId="floatingInputName"
              label="New Name"
              // className="mb-3"
            >
              <Form.Control
                onChange={handleChange}
                name="name"
                value={form.name}
                placeholder="New name"
              ></Form.Control>
            </FloatingLabel>
            <div>
              <span className={styles.error}>
                {errors.name ? errors.name : null}
              </span>
            </div>
          </Form.Group>
          <br />
          <Form.Group>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Description"
              className="mb-6"
            >
              <Form.Control
                onChange={handleChange}
                name="description"
                value={form.description}
                placeholder="new description"
              ></Form.Control>
            </FloatingLabel>
            <div className="row my-0">
              <span className={styles.error}>
                {errors.description ? errors.description : null}
              </span>
            </div>
          </Form.Group>
          <br />

          <Form.Group>
            <FloatingLabel
              controlId="floatingInputName"
              label="Image"
              // className="mb-3"
            >
              <Form.Control
                onChange={handleChange}
                name="image"
                value={form.image}
                placeholder="new image"
              ></Form.Control>
            </FloatingLabel>
            <div>
              <span className={styles.error}>
                {errors.image ? errors.image : null}
              </span>
            </div>
          </Form.Group>
          <br />

          <Row>
            <Col>
              <Form.Group>
                <FloatingLabel controlId="floatingInputPhone" label="Price">
                  <Form.Control
                    onChange={handleChange}
                    name="price"
                    value={form.price}
                    placeholder="new price"
                    type="number"
                  ></Form.Control>
                </FloatingLabel>
                <div>
                  <span className={styles.error}>
                    {errors.price ? errors.price : null}
                  </span>
                </div>
              </Form.Group>
            </Col>
            <br />
            <Col>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInputName"
                  label="New stock"
                  // className="mb-3"
                >
                  <Form.Control
                    onChange={handleChange}
                    name="stock"
                    value={form.stock}
                    placeholder="New stock"
                    type="number"
                  ></Form.Control>
                </FloatingLabel>
                <div>
                  <span className={styles.error}>
                    {errors.stock ? errors.stock : null}
                  </span>
                </div>
              </Form.Group>
            </Col>
            <br />
            {/*  <Col>
              <Form.Group>
                <Form.Control
                  onChange={handleChange}
                  name="tax"
                  value={form.tax}
                  placeholder="new tax"
                  type="number"
                ></Form.Control>
              </Form.Group>
            </Col> */}
          </Row>

          <br />

          <Form.Group>
            Categories
            <Form.Select
              name="categories"
              className="mb-3"
              onChange={handlerSelectCategory}
            >
              <option value={-1}>Select Categories...</option>
              {categories?.map((elem, index) => {
                return (
                  <option key={index} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </Form.Select>
            <div className={st.seleccionados}>
              {categoriesSel.length > 0 ? (
                categoriesSel.map((ele) => {
                  return (
                    <div key={ele.value} className={st.cont2B}>
                      <span>{ele.name}</span>
                      <div
                        className={st.equis}
                        onClick={() => deleteCategorie(ele)}
                      >
                        ✕
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className={st.spErr}> Select the categories</p>
              )}
            </div>
          </Form.Group>

          <br />
          {/* 
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button> */}

          <Button variant="primary" type="submit" disabled={button}>
            Modify data
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ModProduct;
