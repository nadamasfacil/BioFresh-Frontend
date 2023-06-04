import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emailForgotPassword } from "../../../Redux/actions/actionsUser.js";
import styles from "./FormEmail.module.css"
import validateFormEmail from "./validate/validateFormEmail.js";
import axios from 'axios'

// REACT-BOOSTRAP

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import registerValidate from "../../RegisterPage/validate/registerValidate.js";
import swal from 'sweetalert';
import emailjs from "@emailjs/browser";

const FormEmail = () => {
let inicio=false;
    const [ email , setEmail ] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Dom = document.getElementById("formToSend");
    const [form, setForm] = useState({
        email: ""
    })

    const [errors, setErrors] = useState({
        email: ""
    })

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        const property = e.target.name;
        const value = e.target.value;
        setForm({...form, [property]: value});
        setErrors(validateFormEmail({...form, [property]: value}));
       
    }
useEffect(()=>{   
            if(token!==''){               
                emailjsSend(); 
                navigate('/forgotpassword/changepassword');
                setToken('')
            }      
},[token])
    const handlerSubmitEmail = (e) => {
        e.preventDefault();
        dispatch(emailForgotPassword(email));
        getToken(email);
      
    }
    
const emailjsSend =async () => {
    const serviceID = "service_e5hd1wt";
      const templateID = "template_8i1yknj";
      const key_public = "gEu_FBDo_Q0lvhmwA";
    await emailjs.sendForm(serviceID, templateID, Dom, key_public)
        .then(
        (result) => {
          console.log(result.text);
              swal("Ok!", "Please check your email!", "success");         
        },
        (error) => {
          console.log(error.text);
          swal("Error!", "No  sending the message", "error");
        
        }
      );
};

// funcion que obtiene el token del usuario

    const getToken = async (email) => {
        try {
            const response = (await axios.get(`/users?email=${email}`)).data;
            if (response) {
                setToken(response.token)                            
                return 
            }

        } catch (error) {
           // alert(error.message)
            swal("Error!", "'You are not in the database. please register now", "error");
            navigate('/login');
        }    
    };


    return (
        <div className="container-fluid">
            <div className={styles.formContainer}>
                <Form onSubmit={handlerSubmitEmail} id="formToSend">
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                               
                                name="email"
                                value={email}
                                onChange={handleChangeEmail}
                            />
                        </Form.Group>                       
                        <p style={{color: "red"}}>{errors.email}</p>
                       
                        <Form.Control type="text" name='token' readOnly hidden='true'  value={token}  />
                        
                        <Button variant="success" type="submit" size='sm'>Submit</Button>
                </Form> 
            </div>
        </div>
    )
}

export default FormEmail;