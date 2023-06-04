import React from 'react';
import { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Redux/actions/actionsUser';
import axios from 'axios';
import styles from './MyAccount.module.css';

// REACT-BOOSTRAP
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const MyAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userLogin);

    const [ userDetail , setUserDetail ] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        cp: user.cp,
        city: user.city,
        country: user.country,
        phone: user.phone
    });

    const handleChangeAccount = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setUserDetail({...userDetail, [property]: value});
    };

    const submitHandlerAccount = (e) => {
        e.preventDefault();
        axios.put("/users", userDetail)
            .then((res) => {
                alert("Setting modified correctly");
                dispatch(setUser(userDetail));
            })
            .catch(error => alert("Error: Check all camps and try again"));
    }

    useEffect(() => {
        !user.email && navigate('/');
    }, [user]);

    return (
        <div className="container-fluid">
            <div className={styles.formContainer}>
                <Form onSubmit={submitHandlerAccount} id="formToSend">
                    <h1>Account Settings</h1>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                id="email"
                                name="email"
                                value={userDetail.email}
                                onChange={handleChangeAccount}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="firstname"
                                placeholder="First Name"
                                id="firstname"
                                name="firstname"
                                value={userDetail.firstname}
                                onChange={handleChangeAccount}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="lastname"
                                placeholder="Last Name"
                                id="lastname"
                                name="lastname"
                                value={userDetail.lastname}
                                onChange={handleChangeAccount}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                required
                                type="address"
                                placeholder="address"
                                id="address"
                                name="address"
                                value={userDetail.address}
                                onChange={handleChangeAccount}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formCp">
                            <Form.Label>CP</Form.Label>
                            <Form.Control
                                required
                                type="cp"
                                placeholder="cp"
                                id="cp"
                                name="cp"
                                value={userDetail.cp}
                                onChange={handleChangeAccount}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="city"
                                placeholder="city"
                                id="city"
                                name="city"
                                value={userDetail.city}
                                onChange={handleChangeAccount}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                required
                                type="country"
                                placeholder="country"
                                id="country"
                                name="country"
                                value={userDetail.country}
                                onChange={handleChangeAccount}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                required
                                type="phone"
                                placeholder="phone"
                                id="phone"
                                name="phone"
                                value={userDetail.phone}
                                onChange={handleChangeAccount}
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="success" type="submit" size='lg'>Submit changes</Button>
                </Form>
            </div>
        </div>
    );
};

export default MyAccount;