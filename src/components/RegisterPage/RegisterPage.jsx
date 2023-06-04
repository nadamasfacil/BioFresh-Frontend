import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import registerValidate from "./validate/registerValidate.js";
import emailjs from "@emailjs/browser";
import swal from 'sweetalert';

//CSS REACT-BOOSTRAP
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/esm/Stack';
import Col from 'react-bootstrap/Col';

function RegisterPage() {

    const navigate = useNavigate();

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
    })

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
    })

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //       event.preventDefault();
    //       event.stopPropagation();
    //     }
    // }

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post("/users", form)
            .then(res => {
                swal("Congratulations!", "User added successfully!", "success");
                const Dom = document.getElementById("formToSend");
                const serviceID = "service_e5hd1wt";
                const templateID ="template_59dtr2y";// "contact_form";
                const key_public = "gEu_FBDo_Q0lvhmwA";
                emailjs.sendForm(serviceID, templateID, Dom, key_public) .then(
                    (result) => {
                      console.log(result.text);
                    },
                    (error) => {
                      console.log(error.text);
                    }
                  );
                navigate("/login");
            })
            .catch(err => swal("Error!", "Check all camps and try again", "error"))
    }


    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        //! Elimina id delay de la validación
        setForm({...form, [property]: value});
        setErrors(registerValidate({...form, [property]: value}));
    }

    return (
        <div className="container-fluid">
            <div className='container'>
                <Form onSubmit={submitHandler} className='container' id="formToSend">
                    <h2 className='mt-2'>Register</h2>
                    <Row className="mb-1 px-2">
                        <Form.Group className='col-xs-12 col-sm-12 col-md-4' controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <p style={{color: "red"}}>{errors.email}</p>
                        </Form.Group>

                        <Form.Group className='col-xs-12 col-sm-6 col-md-4' controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter Password" id="password" name="password"
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <p style={{color: "red"}}>{errors.password}</p>
                        </Form.Group>

                        <Form.Group className='col-xs-12 col-sm-6 col-md-4' controlId="formPasswordRepeat">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Repeat Password" id="passwordRepeat" name="passwordRepeat"
                                value={form.passwordRepeat}
                                onChange={changeHandler}
                            />
                            <p style={{color: "red"}}>{errors.passwordRepeat}</p>
                        </Form.Group>
                    </Row>

 

                    <Row className="mb-1 px-2">
                        <Form.Group className='col-xs-12 col-sm-6' controlId="formName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="firstname"
                                placeholder="First Name"
                                id="firstname"
                                name="firstname"
                                value={form.firstname}
                                onChange={changeHandler}
                            />
                            <p style={{color: "red"}}>{errors.firstname}</p>
                        </Form.Group>

                        <Form.Group className='col-xs-12 col-sm-6' controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="lastname"
                                placeholder="Last Name"
                                id="lastname"
                                name="lastname"
                                value={form.lastname}
                                onChange={changeHandler}
                            />
                            <p style={{color: "red"}}>{errors.lastname}</p>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-1 px-2" as={Col} controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type="address"
                            placeholder="Address"
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Row className="mb-1 px-2">
                        <Form.Group className='col-xs-12 col-sm-6' controlId="formZiCode">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                required
                                type="cp"
                                placeholder="Zip Code"
                                id="cp"
                                name="cp"
                                value={form.cp}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Form.Group className='col-xs-12 col-sm-6' controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="city"
                                placeholder="City"
                                id="city"
                                name="city"
                                value={form.city}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-1 px-2">
                        <Form.Group className='col-xs-12 col-sm-6' controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                required
                                type="country"
                                placeholder="Country"
                                id="country"
                                name="country"
                                value={form.country}
                                onChange={changeHandler}/>
                        </Form.Group>
                        <Form.Group className='col-xs-12 col-sm-6' controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                required
                                type="phone"
                                placeholder="Phone"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                    </Row>
                    <Row className='col-4 mx-auto mt-3'>
                        <Button variant="success" type="submit" className='mb-3'>
                            Register
                        </Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default RegisterPage;