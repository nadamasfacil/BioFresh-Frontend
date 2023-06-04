import React , { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { userLogin , userLoginGoogle} from '../../Redux/actions/actionsUser.js';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import swal from 'sweetalert';
import { cartToUser } from '../Cart/cartHelpers.js';
import { add_Cart, add_ToCart, clear_Cart } from '../../Redux/actions/actionsCart.js';

// CSS REACT-BOOSTRAP
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
//----------------------------------------------------

//! Autenticación con Google

import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

//! --------------------------------------

function LoginPage(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userLogin);
    const cartUser = useSelector(state => state.cart);
    const cartDetailsUser = useSelector(state => state.cartDetails);

    const clientID = "932914293926-uo3dpst96jr8s51di1mmbhdh3j2gie6a.apps.googleusercontent.com";
   
    const onSuccess = async (response) => {
        dispatch(userLoginGoogle(response.profileObj));

        // Agrega el carrito al user
        const { order, cartDetails } = await cartToUser(response.profileObj.email);
        dispatch(add_Cart(order.id));
        dispatch(clear_Cart());
        if ( cartDetails !== null ) {
            for (let i=0; i < cartDetails.length; i++) dispatch(add_ToCart(cartDetails[i], cartDetailsUser));
        };
        
        swal("Congratulations!", "Login Successfully", "success");
        navigate("/");
    }

    const onFailure = (response) => {
        console.log("Something went wrong", response)
    }

    //! Estado local para guardar los datos del formulario
    const [form, setForm] = useState({
        email: "",
        password: "",
    })


    const submitHandler = async (event) => {
        event.preventDefault();
        const status = await dispatch(userLogin(form));
        if (status.hasOwnProperty('error')) swal("Error", "Incorrect email or password", "error");
        else {

            // Agrega el carrito al user
            const { order, cartDetails } = await cartToUser(form.email);
            dispatch(add_Cart(order.id));
            dispatch(clear_Cart());
            if ( cartDetails !== null ) {
                for (let i=0; i < cartDetails.length; i++) dispatch(add_ToCart(cartDetails[i], cartDetailsUser));
            };

            swal("Congratulations!", "Login Successfully", "success");
            navigate("/");
        }
    }

    const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
        setForm({...form, [property]: value});
    };

    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: clientID,
            })
        }
        gapi.load("client:auth2", start);
    },[])


    // UseEffect para volver al inicio si ya se encuentra logueado el usuario

    useEffect(() => {
        user.email && navigate('/');
    }, [user]);

    //! Obtener Token de Acceso de Google

    // let accessToken = gapi.auth.getToken().accessToken

return (
    <div className="container-fluid">
        <div className={styles.formContainer}>
            <Form onSubmit={submitHandler}>
                <h2>Login</h2>
                <Row className="mb-3">
                    <Form.Group as={Col} controlidemail="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email" id="email" name="email"
                            value={form.email}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlidpassword="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter Password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                </Row>
                <Row className='d-flex justify-content-center mb-3'>
                    <Button className='col-2' variant="success" type="submit">Login</Button>
                </Row>
            </Form>
            <Row className="mb-3">
                <Button  variant="success" href={"/register"}>Register Now</Button>
            </Row>
            <Row className="mb-3">
                <Button variant="warning" href={"/forgotpassword"}>Forgot Password</Button>
            </Row>
            <Row className="mb-3">
                <GoogleLogin
                    clientId={clientID}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_policy"}
                    />
            </Row>
        </div>
    </div>
)};

export default LoginPage;