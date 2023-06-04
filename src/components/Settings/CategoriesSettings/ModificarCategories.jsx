import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../Redux/actions/actionsCategories";

const ModificarCategories = ({ id, name }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
  });

  form.id = id;

  const loadingData = async () => {
    const datos = await getCategories();
    dispatch(datos);
  };

  const [errors, setErrors] = useState({});

  const validate = (form) => {
    const error = {};
    if (form.name.length < 3) {
      error.name = "name no null";
    } else if (form.description.length < 3) {
      error.description = "description no null";
    }
    return error;
  };

  const onChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(validate({ ...form, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const envio = await axios.put("/categories/modificacion", form);
      if (envio) {
        alert("datos cambiados con exito ");
        setForm({
          name: "",
          description: "",
        });
        loadingData();
      }
    } catch (error) {
      alert("error encontrado" + error.message);
    }
  };

  const [button, setButton] = useState(true);

  useEffect(() => {
    if ((form.name.length > 0) & (form.description.length > 0))
      setButton(false);
    else {
      setButton(true);
    }
  }, [form, setButton]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <h3>Category to modify {name} </h3>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              onChange={onChange}
              name="name"
              value={form.name}
              placeholder="new name"
            />
            <span style={{ color: "red" }}>{errors.name}</span>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Control
              onChange={onChange}
              name="description"
              value={form.description}
              placeholder="new description"
              as="textarea"
              rows={4}
            />
            <span style={{ color: "red" }}>{errors.description}</span>
          </Form.Group>
          <br />
          <Button type="submit" disabled={button}>
            Modify
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ModificarCategories;
