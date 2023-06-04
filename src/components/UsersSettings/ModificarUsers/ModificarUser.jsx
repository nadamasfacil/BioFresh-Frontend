import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import axios, { all } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { allUsers } from "../../../Redux/actions/actionsUser";

const ModificarUser = ({ show, handleClose, email, tipo }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    cd: "",
    city: "",
    country: "",
    phone: "",
    password: "",
    adminType: tipo,
  });

  form.email = email;

  const loadingData = () => {
    const data = allUsers();
    dispatch(data);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.name]: event.target.value, // se busca en que input esta escribiendo con la prop name del input, y se modifica el estado
    });
  };
  const [button, setButton] = useState(true);

  useEffect(() => {
    if (
      form.password.length > 0 &&
      form.firstname.length > 0 &&
      form.lastname.length > 0 &&
      form.address.length > 0 &&
      form.city.length > 0
    )
      setButton(false);
    else {
      setButton(true);
    }
  }, [form, setButton]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.put("/users", form);
      if (result.status === 201) {
        setForm({
          password: "",
          firstname: "",
          lastname: "",
          address: "",
          cp: "",
          city: "",
          phone: "",
          adminType: tipo,
        });
        if (result) {
          alert("operacion exitosa");
          loadingData();
        }
      }
    } catch (error) {
      alert("completa los datos");
    }
  };

  const [selectedOption, setSelectedOption] = useState();

  console.log(selectedOption);
  console.log(form);

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    form.adminType = value;
  };

  useEffect(() => {
    if (selectedOption) {
      if (selectedOption == "false") {
        form.adminType = false;
      } else {
        form.adminType = true;
      }
    }
  }, [form, selectedOption]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>user to modify {email}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>current user type {tipo ? "Administrator" : "Standard"}</h5>
          <br />
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    placeholder="new firstname"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    placeholder="new lastname"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                placeholder="new address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                placeholder="new cd"
                name="cd"
                value={form.cd}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    placeholder="new city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    placeholder="new country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                placeholder="new phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>email linked to account</Form.Label>
              <Form.Control name="email" value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                placeholder="new password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <h5>Type of user</h5>
              <Form.Select onChange={handleSelect} value={selectedOption}>
                <option value="" disabled>
                  choose your option
                </option>
                <option value={false}>Standard</option>
                <option value={true}>Administrator</option>
              </Form.Select>
            </Form.Group>
            <br />
            <br />
            <h6>fill in the fields</h6>
            <Button
              title="fill in the fields"
              variant="primary"
              type="submit"
              disabled={button}
            >
              modify data
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModificarUser;
