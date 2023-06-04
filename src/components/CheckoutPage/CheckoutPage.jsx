import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import axios from "axios";
import validate from './validate.js';
import emailjs from "@emailjs/browser";
import s from './CheckoutPage.module.css';
import mercadoPago from '../../assets/mercadoPago.png'
import { refreshTotalAmount, saveShippingData, setShippingOption } from '../../Redux/actions/actionsDeliveries.js';

//CSS REACT-BOOSTRAP
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/esm/Stack';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function RegisterPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector(state => state.userLogin);
    const shippindOption = useSelector(state => state.shippindOption);


    const [ formCheckout , setFormCheckout ] = useState({
        email: user.email,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        cp: user.cp,
        city: user.city,
        country: user.country,
    });

    const [formShipping, setFormShipping] = useState({
        firstname: "",
        lastname: "",
        address: "",
        cp: "",
        city: "",
        country: "",
    })

    const [errors, setErrors] = useState({
        email: "",
        phone: "",
        firstname: "",
        lastname: "",
        address: "",
        cp: "",
        city: "",
        country: "",
    })

    // handle para cambiar la informacion del formulario de envios

    const handleChangeShippingForm = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setFormShipping({
            ...formShipping,
            [property] : value 
        });
    };

    const handleChangeShippingMethod = (event) => {
        const selectedShippindMethod = event.target.value;
        dispatch(setShippingOption(selectedShippindMethod))

        if(selectedShippindMethod === 'pickup') {
            dispatch(refreshTotalAmount(0));
        } else if (selectedShippindMethod === 'homeDelivery') {
            dispatch(refreshTotalAmount(9.99))
        }
    }

    const submitHandlerCheckout = (e) => {
        e.preventDefault();
        dispatch(saveShippingData(formShipping));
    }

    const [mostrarFormulario, setMostrarFormulario] = useState(true);

    const handleCheckboxChange = (event) => {
      setMostrarFormulario(event.target.checked);
    };

    const goToPath = (goPath) => {
        dispatch(saveShippingData(formShipping));
        navigate(goPath);
    };

    //! Estado local para guardar los datos del formulario

    return (
        <div className="container-fluid">
            <div className='container'>
                <div className='row my-2'>
                    <h1 className='text-center'>Checkout Page</h1>
                </div>
            <div>
                <Form onSubmit={submitHandlerCheckout} id="formToSend" className='row row-cols-1 row-cols-sm-2 row-cols-lg-4'>
                    <div className='col-lg-8 col-sm-12'>
                        <div className='card mb-3' id={s.card_container}>
                            <div className="card-header">
                                <h2 className="legend card-title">Contact</h2>
                            </div>
                            <Row className="mb-1 px-2">
                                <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formEmail">
                                    <Form.Label>E-mail *</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" id="email" name="email" value={formCheckout.email} />
                                </Form.Group>
                                <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="phone" placeholder="Phone" id="phone" name="phone" value={formCheckout.phone} />
                                </Form.Group>
                            </Row>
                        </div>
                        <div className="card pb-3" id={s.card_container}>
                            <div className="card-header">
                                <h2 className="legend card-title">Billing Address</h2>
                            </div>
                        <Row className="px-2">
                            <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formName">
                                <Form.Label>Name *</Form.Label>
                                <Form.Control type="firstname" placeholder="First Name" id="firstname" name="firstname" value={formCheckout.firstname} />
                                <p style={{color: "red"}}>{errors.firstname}</p>
                            </Form.Group>

                            <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formLastName">
                                <Form.Label>Last Name *</Form.Label>
                                <Form.Control type="lastname" placeholder="Last Name" id="lastname" name="lastname" value={formCheckout.lastname} />
                                <p style={{color: "red"}}>{errors.lastname}</p>
                            </Form.Group>
                        </Row>
                        <Row className="mb-1 px-2">
                            <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formAddress">
                                <Form.Label>Address *</Form.Label>
                                <Form.Control type="address" placeholder="Address" id="address" name="address" value={formCheckout.address} />
                            </Form.Group>
                            <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formCity">
                                <Form.Label>City *</Form.Label>
                                <Form.Control type="city" placeholder="City" id="city" name="city" value={formCheckout.city} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-1 px-2">
                            <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formZiCode">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="cp" placeholder="Zip Code" id="cp" name="cp" value={formCheckout.cp} />
                            </Form.Group>
                            <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formCountry">
                                <Form.Label>Country *</Form.Label>
                                <Form.Control type="country" placeholder="Country" id="country" name="country" value={formCheckout.country} />
                            </Form.Group>
                        </Row>
                        </div>
                        <div className='py-20px my-5' >
                            <input type="checkbox" id="deliveryAddres" name="opcion" value="deliveryAddres" defaultChecked onChange={handleCheckboxChange}/>
                            <label for="deliveryAddres">Billing Address same as Shipping</label><br/>
                        </div>
                        {!mostrarFormulario && (
                            <div className="card mb-3 pb-3" id={s.card_container}>
                                <div className="card-header">
                                    <h2 className="legend card-title">Shipping Address</h2>
                                </div>
                                <Row className="px-2">
                                    <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formName">
                                        <Form.Label>Name *</Form.Label>
                                        <Form.Control type="firstname" placeholder="First Name" id="firstname" name="firstname" value={formShipping.firstname}onChange={handleChangeShippingForm} />
                                        <p style={{color: "red"}}>{errors.firstname}</p>
                                    </Form.Group>

                                    <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formLastName">
                                        <Form.Label>Last Name *</Form.Label>
                                        <Form.Control type="lastname" placeholder="Last Name" id="lastname" name="lastname" value={formShipping.lastname} onChange={handleChangeShippingForm} />
                                        <p style={{color: "red"}}>{errors.lastname}</p>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1 px-2">
                                    <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formAddress">
                                        <Form.Label>Address *</Form.Label>
                                        <Form.Control type="address" placeholder="Address" id="address" name="address" value={formShipping.address} onChange={handleChangeShippingForm} />
                                    </Form.Group>
                                    <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formCity">
                                        <Form.Label>City *</Form.Label>
                                        <Form.Control type="city" placeholder="City" id="city" name="city" value={formShipping.city} onChange={handleChangeShippingForm} />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1 px-2">
                                    <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formZiCode">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control type="cp" placeholder="Zip Code" id="cp" name="cp" value={formShipping.cp} onChange={handleChangeShippingForm} />
                                    </Form.Group>
                                    <Form.Group as={Col} className='col-sm-12 col-lg-6' controlId="formCountry">
                                        <Form.Label>Country *</Form.Label>
                                        <Form.Control type="country" placeholder="Country" id="country" name="country" value={formShipping.country} onChange={handleChangeShippingForm}/>
                                    </Form.Group>
                                </Row>
                            </div>
                        )}
                        <p className='my-3'>* Required Fields</p>
                    </div>
                    <div className='col-lg-4 col-sm-12'>
                        <div className="card mb-3" id={s.card_container}>
                            <div className="card-header">
                                <h2 className="legend card-title">Payment Options</h2>
                            </div>
                            <Form>
                                <div className="card-body">
                                    <p className='text-center'>You will be redirected to Mercado Pago to make a secure payment.</p>
                                    <div className='d-flex justify-content-center text-align center'>
                                        <img src={mercadoPago} alt="Mercado Pago" width='50%' height="auto"/>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div id={s.card_container} className="card mb-3">
                            <div className="card-header">
                                <h2 className="legend card-title">Deliveries Options</h2>
                            </div>
                            <Form className="card-body">
                                <div>
                                    <input type="radio" id="pickup" value="pickup" name='deliveryMethod' defaultChecked onClick={shippindOption === 'pickup'} onChange={handleChangeShippingMethod}/>
                                    <label htmlFor="pickup">Pick Up</label>
                                    <p className={s.price}><i>Free</i></p>
                                </div>
                                <div>
                                    <input type="radio" id='homeDelivery' value="homeDelivery" name='deliveryMethod'  onSelect={shippindOption === 'homeDelivery'} onChange={handleChangeShippingMethod}/>
                                    <label htmlFor="homeDelivery">Delivery</label>
                                    <p className={s.price}><i>($9.99)</i></p>
                                </div>
                            </Form>
                        </div>
                        <div className='d-flex flex-column align-items-center '>
                            <Button variant="success" className='mb-2' type='submit' onClick={()=>goToPath('/cart/checkout/review')}>Review Order</Button>
                            <Button variant='success' className='mb-2' onClick={()=>goToPath('/cart')}>Go back to Cart</Button>
                        </div>
                    </div>
                </Form>
            </div>
            </div>
        </div>
    );
}

export default RegisterPage;