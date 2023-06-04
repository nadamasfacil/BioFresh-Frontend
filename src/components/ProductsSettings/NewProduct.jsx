import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch, useSelector } from "react-redux";
import st from "../ProductsSettings/Form.module.css";
import validate from "./validate.js";
import axios from "axios";
import styles from "./ProductsSettings.module.css";
import { getProducts } from "../../Redux/actions/actionsProducts";
import swal from "sweetalert";

const NewProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
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
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.allCategories);
  const [categories, setCategories] = useState(allCategories);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categoriesSel, setCategoriesSel] = useState([]);
  const [show, setShow] = useState(true);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value, // se busca en que input esta escribiendo con la prop name del input, y se modifica el estado
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleClose = () => setShow(false);

  const handlerSelectCategory = (e) => {
    let nomCategory = e.target.options[e.target.options.selectedIndex].text;
    let value = e.target.value;
    if (value !== -1) {
      setForm({ ...form, categories: [...form.categories, value] });
      setCategoriesSel([...categoriesSel, { value, name: nomCategory }]);
      setCategories(categories.filter((ele) => ele.id !== value));
    }
  };
  // console.log(categoriesSel)
  // console.log(allCategories)
  const deleteCategorie = (elem) => {
    const { value, name } = elem;
    //  console.log(elem)
    setCategoriesSel(categoriesSel.filter((ele) => ele.value !== value));
    setForm({
      ...form,
      categories: form.categories.filter((ele) => ele !== value),
    });
    setCategories([...categories, { id: value, name }]);
  };

  const loadingData = async () => {
    const datos = await getProducts();
    dispatch(datos);
  };

  const submitNew = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (
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
      await axios
        .post("/products/", form)
        .then((res) => {
          swal("Congratulations!", "Product added successfully!", "success");
          // setSuccessMessage("Product created successfully.");
          console.log("res  " + res);
          setForm({
            name: "",
            description: "",
            price: "",
            stock: "",
            image: "",
            categories: [],
          });
          loadingData();
          setCategories(allCategories);
          setCategoriesSel([]);
        })
        .catch((err) => {
          swal("Error!", "Product is not created.", err);
          // alert(err);
          // setErrorMessage("Product is not created.");
        });
    } else {
      // console.log(errors);
      // setErrorMessage("Wrong information.");
      swal("Error!", "Wrong information.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitNew} accept-language="en">
          <Form.Group className="my-1 pb-2">
            <FloatingLabel
              controlId="floatingInputName"
              label="Name"
              // className="mb-3"
            >
              <Form.Control
                className="form-control"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                aria-label="Name"
                placeholder="Name"
              />
            </FloatingLabel>
            <div>
              <span className={styles.error}>
                {errors.name ? errors.name : null}
              </span>
            </div>
          </Form.Group>

          <div className="row ">
            <Form.Group className="col-md-6 col-xm-12 my-1 pb-2 ">
              <FloatingLabel controlId="floatingInputEmail" label="Stock">
                <Form.Control
                  type="text"
                  name="stock"
                  className="form-control  "
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                />
              </FloatingLabel>
              <div>
                <span className={styles.error}>
                  {errors.stock ? errors.stock : null}
                </span>
              </div>
            </Form.Group>
            <Form.Group className="col-md-6 col-xm-12 my-1 pb-2">
              <FloatingLabel controlId="floatingInputPhone" label="Price">
                <Form.Control
                  type="text"
                  name="price"
                  className="form-control"
                  value={form.price}
                  maxLength="15"
                  onChange={handleChange}
                  placeholder="Price"
                  aria-label="price"
                />
              </FloatingLabel>
              <div>
                <span className={styles.error}>
                  {errors.price ? errors.price : null}
                </span>
              </div>
            </Form.Group>
          </div>
          <Form.Group className="my-1 pb-2 mb-3">
            {/* <Form.Label htmlFor="message">Mensaje</Form.Label>  */}
            <FloatingLabel
              controlId="floatingTextarea"
              label="Description"
              className="mb-6"
            >
              <Form.Control
                as="textarea"
                className="form-control"
                rows={5}
                onChange={handleChange}
                name="description"
                value={form.description}
                placeholder="Description"
                height="200px"
              />
            </FloatingLabel>
            <div className="row my-0">
              <span className={styles.error}>
                {errors.description ? errors.description : null}
              </span>
            </div>
          </Form.Group>

          <Form.Group className="my-1 pb-2">
            <FloatingLabel
              controlId="floatingInputName"
              label="Image"
              // className="mb-3"
            >
              <Form.Control
                className="form-control"
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                aria-label="Image"
                placeholder="Image"
              />
            </FloatingLabel>
            <div>
              <span className={styles.error}>
                {errors.image ? errors.image : null}
              </span>
            </div>
          </Form.Group>
          {/* ///////// */}
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
          <Button variant="success" type="submit">
            Send
          </Button>

          <p className={styles.error}>{errorMessage}</p>
          <p className={styles.success}>{successMessage}</p>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewProduct;
