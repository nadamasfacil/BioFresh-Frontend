import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../Redux/actions/actionsCategories";
import swal from 'sweetalert';

const AddCategorie = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const loadingData = async () => {
    const data = await getCategories();
    dispatch(data);
  };

  const validate = (form) => {
    const error = {};
    if (form.name.length < 3) {
      error.name = "name no null";
    } else if (form.description.length < 3) {
      error.description = "description no null";
    }
    return error;
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(validate({ ...form, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("/categories/categorie", form);
      if (result) {
       // alert("Successful operation");
        swal("Congratulations!", "Category added successfully!", "success");
        loadingData();
      }
    } catch (error) {
      alert("Error" + error.message);
     swal("Error!", "No Added Category", "error")
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
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <h3>Add Categorie</h3>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                placeholder="name"
                onChange={handleChange}
                value={form.name}
                name="name"
              />
              <span style={{ color: "red" }}>{errors.name}</span>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="description"
                as="textarea"
                rows={5}
                placeholder="description"
                value={form.description}
                onChange={handleChange}
                id="pruebo"
              />
              <span style={{ color: "red" }}>{errors.description}</span>
            </Form.Group>
            <br />
            <Button type="submit" disabled={button}>
              add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddCategorie;
