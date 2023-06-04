import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Contact.module.css";
import phone from "./img/phone.png";
import direccion from "./img/direccion.png";
import email from "./img/email.jpg";
import { useState } from "react";
import validate from "./validate.js";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import swal from 'sweetalert';

function Contact() {
  const navigate = useNavigate();
  const Dom = document.getElementById("formToSend");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  // const [successMessage, setSuccessMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

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
    // setSuccessMessage("");
    // setErrorMessage("");
  };
  const sendEmail = (e) => {
    e.preventDefault();
    // setSuccessMessage("");
    // setErrorMessage("");

    if (
      !errors.name &&
      form.name &&
      !errors.message &&
      form.message &&
      !errors.email &&
      form.email &&
      !errors.phone &&
      form.phone
    ) {
      const serviceID = "service_e5hd1wt";
      const templateID = "contact_form";
      const key_public = "gEu_FBDo_Q0lvhmwA";
     emailjs.sendForm(serviceID, templateID, Dom, key_public)
        .then(
        (result) => {
          console.log(result.text);
         // setSuccessMessage("Message sent succesfully");
          swal("Congratulations!", "Message sent succesfully!", "success");
          setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
        //  setErrorMessage("Error sending the message");
          swal("Error!", "No  sending the message", "error")
        }
      );
    } else {
      swal("Error!", "You must fill in the fields correctly", "error")
     // setErrorMessage("You must fill in the fields correctly");
      return;
    }
  };
  return (
    <div className="container-fluid">
      <section>
        <h1 className="text-center mt-3">Contact Us</h1>
      </section>

      {/* <button onClick={() => navigate("/")}>Back to Home</button> */}

      <div className="container-fluid mb-3">
        <div className="row mt-3  ">
          <div className="col-md-6 col-xm-12 border pt-3">
            <h3>Leave us your message</h3>
            <Form onSubmit={sendEmail} id="formToSend">
              <Form.Group className="my-1 pb-2">
                <FloatingLabel
                  controlId="floatingInputName"
                  label="Names and Surnames"
                  // className="mb-3"
                >
                  <Form.Control
                    className="form-control"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    aria-label="Nombre"
                    placeholder="Names and Surnames"
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
                  <FloatingLabel controlId="floatingInputEmail" label="Email">
                    <Form.Control
                      type="text"
                      name="email"
                      className="form-control  "
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </FloatingLabel>
                  <div>
                    <span className={styles.error}>
                      {errors.email ? errors.email : null}
                    </span>
                  </div>
                </Form.Group>
                <Form.Group className="col-md-6 col-xm-12 my-1 pb-2">
                  <FloatingLabel
                    controlId="floatingInputPhone"
                    label="Phone Number"
                  >
                    <Form.Control
                      type="text"
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      maxLength="15"
                      onChange={handleChange}
                      placeholder="Phone Number"
                      aria-label="Celular"
                    />
                  </FloatingLabel>
                  <div>
                    <span className={styles.error}>
                      {errors.phone ? errors.phone : null}
                    </span>
                  </div>
                </Form.Group>
              </div>
              <Form.Group className="my-1 pb-2 mb-3">
                {/* <Form.Label htmlFor="message">Mensaje</Form.Label>  */}
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Message"
                  className="mb-6"
                >
                  <Form.Control
                    as="textarea"
                    className="form-control"
                    rows={5}
                    onChange={handleChange}
                    name="message"
                    value={form.message}
                    placeholder="Message"
                    height="200px"
                  />
                </FloatingLabel>
                <div className="row my-0">
                  <span className={styles.error}>
                    {errors.message ? errors.message : null}
                  </span>
                </div>
              </Form.Group>
              <Row className="justify-content-center">
                <Button variant="success" type="submit" className="mb-3 col-3">
                  Send
                </Button>
              </Row>

              {/* <p className={styles.error}>{errorMessage}</p>
              <p className={styles.success}>{successMessage}</p> */}
            </Form>
          </div>

          <div className="col border ">
            <div className="container col  mt-3">
              <div className="row ">
                <h2 className="col-md-6 text-start ">BioFresh</h2>
                <p className="col-m-4  text-start small  mt-2 ">
                  If you have any questions about a product. you want to tell us
                  about an event or you just want to write to us, give us your
                  message here!
                </p>

                {/* <div className="row text-white">" "</div> */}
                <h4 className="col-md-4 mt-3">Contact us</h4>
                <br />
                <div className="d-flex flex-wrap   mt-3 ">
                  <article className="col  text-start h6">
                    <div className="container-fluid">
                      <div className="row ">
                        <img src={phone} alt="" height="" className="col-4" />
                        <label className="col-7 p-2" height="60px">
                          Phone 3007476099
                        </label>
                      </div>
                    </div>
                  </article>

                  <article className="col-md-6 h6 ">
                    <div className="container-fluid">
                      <div className="row ">
                        <img
                          className="col-4 "
                          src={direccion}
                          alt=""
                          height=""
                        />
                        <label className="col  text-start ">
                          Address Carrera 23-42-123
                        </label>
                      </div>
                    </div>
                  </article>

                  <article className="col-8 mt-4 h6">
                    <div className="container-fluid">
                      <div className="row">
                        <img className="col-3 " src={email} alt="" height="" />
                        <label className="col-7 text-start   mt-2  ">
                          Email: contact.biofresh.shop@gmail.com
                        </label>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
