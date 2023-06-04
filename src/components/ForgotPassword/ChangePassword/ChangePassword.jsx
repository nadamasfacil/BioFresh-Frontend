import React from "react";
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ChangePassword.module.css";
import validate from "./validate/validate.js";

// REACT-BOOSTRAP

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';


const ChangePassword = () => {

    const navigate = useNavigate();
    const email = useSelector(state => state.userEmail)

    const [formForgotPassword , setFormForgotPassword ] = useState({
        token: "",
        newPassword: "",
        repeatNewPassword:""
    })

    const [errors, setErrors] = useState({
        newPassword: "",
        repeatNewPassword: "",
    })

    const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setFormForgotPassword({...formForgotPassword, [property]: value});
        setErrors(validate({...formForgotPassword, [property]: value}));
    }

    const handlerSubmitForgotPassword = (e) => {
        e.preventDefault();
        if (errors.newPassword || errors.repeatNewPassword) swal("Error","Check all camps and try again", "error");
        else {
            axios.put('/users/forgotpassword', { email ,token: formForgotPassword.token , password: formForgotPassword.newPassword })
                .then((res) => {
                    swal("Congratulations", "Password changed successfully", "success");
                    navigate('/');
                })
                .catch((error) => swal("Error","Invalid token or email", "error"));
        }
    }

    useEffect(() => {
        !email.length && navigate('/forgotpassword')
    })


    return (
        <div className="container-fluid">
            <div className={styles.formContainer}>
                <Form onSubmit={handlerSubmitForgotPassword} id="formToSend">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formToken"> 
                        <Form.Label>Token</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter Token"
                            id="token"
                            name="token"
                            value={formForgotPassword.token}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Row>
                        <Form.Group as={Col} controlId="formNewPassword"> 
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter new password"
                                id="newPassword"
                                name="newPassword"
                                value={formForgotPassword.newPassword}
                                onChange={handleInputChange}
                            />
                            {console.log("Esto es el error de new password", errors.newPassword)}
                            <p style={{color: "red"}}>{errors.newPassword}</p>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formRepeatNewPassword"> 
                            <Form.Label>Repeat new password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Repeat new password"
                                id="repeatNewPassword"
                                name="repeatNewPassword"
                                value={formForgotPassword.repeatNewPassword}
                                onChange={handleInputChange}
                            />
                            <p style={{color: "red"}}>{errors.repeatNewPassword}</p>
                        </Form.Group>
                    </Row>
                    <Button variant="success" type="submit" size='lg'>Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default ChangePassword;