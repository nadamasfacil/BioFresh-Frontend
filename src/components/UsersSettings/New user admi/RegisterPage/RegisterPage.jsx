import React, { useState } from "react";
import axios, { all } from "axios";
import registerValidate from "./validate/registerValidate";

//CSS REACT-BOOSTRAP
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../../../Redux/actions/actionsUser";

//------------------------------------------------------

function RegisterPage() {
  const dispatch = useDispatch();
  const loadingData = async () => {
    const llamado = await allUsers();
    dispatch(llamado);
  };

  const users = useSelector((state) => state.users);

  console.log(users);

  //! Estado local para guardar los datos del formulario
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
    firstname: "",
    lastname: "",
    address: "",
    cp: "",
    city: "",
    country: "",
    phone: "",
    adminType: "",
  });

  form.adminType = true;

  //! Estado local para guardar los errores de validación del formulario
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
    firstname: "",
    lastname: "",
    address: "",
    cp: "",
    city: "",
    country: "",
    phone: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/users", form)
      .then((res) => {
        alert("User added successfully!");
      })
      .catch((err) => alert("Error: Check all camps and try again"));
    loadingData();
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    //! Elimina id delay de la validación
    setForm({ ...form, [property]: value });
    setErrors(registerValidate({ ...form, [property]: value }));
  };

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <h2>Register Admin</h2>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                id="email"
                name="email"
                value={form.email}
                onChange={changeHandler}
              />
              <p style={{ color: "red" }}>{errors.email}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                id="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
              />
              <div style={{ color: "red" }}>{errors.password}</div>
            </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="formPasswordRepeat">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Repeat Password"
              id="passwordRepeat"
              name="passwordRepeat"
              value={form.passwordRepeat}
              onChange={changeHandler}
            />
            <p style={{ color: "red" }}>{errors.passwordRepeat}</p>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstname"
                placeholder="First Name"
                id="firstname"
                name="firstname"
                value={form.firstname}
                onChange={changeHandler}
                pattern=".{4,}"
              />
              <p style={{ color: "red" }}>{errors.firstname}</p>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastname"
                placeholder="Last Name"
                id="lastname"
                name="lastname"
                value={form.lastname}
                onChange={changeHandler}
              />
              <p style={{ color: "red" }}>{errors.lastname}</p>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="address"
              placeholder="Address"
              id="address"
              name="address"
              value={form.address}
              onChange={changeHandler}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formZiCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="cp"
                placeholder="Zip Code"
                id="cp"
                name="cp"
                value={form.cp}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="city"
                placeholder="City"
                id="city"
                name="city"
                value={form.city}
                onChange={changeHandler}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="country"
                placeholder="Country"
                id="country"
                name="country"
                value={form.country}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={changeHandler}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>type of user</Form.Label>
              <Form.Control style={{ color: "red" }} value="administrator" />
            </Form.Group>
          </Row>
          <br />
          <Button variant="success" type="submit">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterPage;
