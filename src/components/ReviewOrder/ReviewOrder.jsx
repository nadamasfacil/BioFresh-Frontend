import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import Container from 'react-bootstrap/esm/Container'
import accounting from 'accounting';
import { useNavigate } from 'react-router-dom'
import s from './ReviewOrder.module.css';

export default function ReviewOrder() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartDetails = useSelector(state => state.cartDetails)
  const orderCart = cartDetails[0].idOrder;

  const user = useSelector(state => state.userLogin);
  const emailUser = user.email;

  const shippingAddress = useSelector(state => state.shippingAddress)
  const shippingAmount = useSelector(state => state.totalAmount)

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

  const [ order, setOrder ] = useState({
    id: '',
    totalAmount: 0
  });

  const goToPath = (goPath) => {
    navigate(goPath);
  };

  const updateTotals = () => {
    let amountO= 0;
    let taxAmountO = 0;
    let totalAmountO = 0;
    for (let i=0; i < cartDetails.length; i++) {
        amountO = amountO + cartDetails[i].amount;
        taxAmountO = taxAmountO + cartDetails[i].taxAmount;
        totalAmountO = totalAmountO + cartDetails[i].totalAmount;
    };
    const total = totalAmountO + shippingAmount;
    setOrder({
      idOrder: '',
      amount: amountO,
      shippingAmount: shippingAmount,
      totalAmount: total,
    });
  };

  // //! Función de Mercadopago
  const handlerMercadoPagoLink = async () => {
    axios.post('/payments', {id: order.id , name:"Compra BioFresh" , image:"https://biofresh.shop/assets/logo-014472b5.png" , description:"Esto es una prueba" , price: order.totalAmount, orderId:orderCart, email: emailUser})
        .then((res) => window.location.href = res.data.response.body.init_point)
        .catch((error) => console.log(error));
  }

  useEffect(()=>{
    updateTotals();
  },[]);

  return (
    <Container className='container-fluid'>
        <div className="container">
            <div className="row my-2">
                <div className="col-12">
                    <h1 className="page-header">Shopping Cart</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-9 mb-4">
                    <div className="table-responsive mb-5">
                        <table className="table" >
                            <thead>
                                <tr>
                                <th>Product</th>
                                <th className="mob-hide"></th>
                                <th className="mob-hide">Unit Price</th>
                                <th className="table-qty">Qty</th>
                                <th>Subtotal</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { cartDetails.map(product => {
                                return (
                                    <tr>
                                        <td>
                                            <p className='h5' >{product.name}</p>
                                        </td>
                                        <td className="text-center mob-hide">
                                            <figure className='container-fluid'>
                                                <img src={product.image} width={90} height={90} alt={product.name} />
                                            </figure>
                                        </td>
                                        <td className="mob-hide text-center">
                                            <span>{accounting.formatMoney(`${product.price}`)}</span>
                                        </td>
                                        <td>
                                            <p className='text-center'>{product.units}</p>
                                        </td>
                                        <td>
                                            <p className='text-center'>{accounting.formatMoney(`${product.amount}`)}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    {shippingAddress.firstname ?
                    <div className="col-lg-12 mb-4 d-flex gap-2">
                        <div class="col-6">
                            <div class="card mb-3">
                                <div class="card-body" id={s.card_container}>
                                    <label><strong>Billing Address</strong></label>
                                    <hr />
                                    <span>{formCheckout.firstname} {formCheckout.lastname}</span><br/>
                                    <span>{formCheckout.address}</span><br/>
                                    <span>{formCheckout.cp}</span><br/>
                                    <span>{formCheckout.country} - {formCheckout.city}</span><br/>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card mb-3">
                                <div class="card-body" id={s.card_container}>
                                    <label><strong>Shipping Address</strong></label>
                                    <hr />
                                    <span>{shippingAddress.firstname} {shippingAddress.lastname}</span><br/>
                                    <span>{shippingAddress.address}</span><br/>
                                    <span>{shippingAddress.cp}</span><br/>
                                    <span>{shippingAddress.country} - {shippingAddress.city}</span><br/>
                                </div>
                            </div>
                        </div> 
                    </div> : 
                    <div className="col-lg-12 mb-4 d-flex gap-2">
                    <div class="col-sm-12 col-xs-12 col-lg-6" >
                        <div class="card mb-3">
                            <div class="card-body" id={s.card_container}>
                                <label><strong>Billing and Shipping Address</strong></label>
                                <hr />
                                <span>{formCheckout.firstname} {formCheckout.lastname}</span><br/>
                                <span>{formCheckout.address}</span><br/>
                                <span>{formCheckout.cp}</span><br/>
                                <span>{formCheckout.country} - {formCheckout.city}</span><br/>
                            </div>
                        </div>
                    </div>
                    </div>
                    }
                </div>
                <div className='col-lg-3 mb-4'>
                    <div className="col-12">
                        <h1 className='text-center'>Total Order</h1>
                        <table className="table bordered table-striped">
                            <tbody>
                            <tr>
                                <td colSpan="1" className="text-left"><strong>Subtotal: </strong></td>
                                <td colSpan="1" className="text-right"><p>{accounting.formatMoney(`${order.amount}`)}</p></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="text-left"><strong>Shipping: </strong></td>
                                <td colSpan="1" className="text-right"><p>{accounting.formatMoney(`${shippingAmount}`)}</p></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="text-left"><strong>Total: </strong></td>
                                <td colSpan="1" className="text-right"><p>{accounting.formatMoney(`${order.totalAmount}`)}</p></td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="text-center cart-actions">
                            <Button className="btn btn-success btn-block mb-3 mx-2" onClick={handlerMercadoPagoLink}>Proceed to the Payment</Button>
                            <Button className="btn btn-success btn-block mb-3 mx-2" onClick={() => goToPath('/cart/checkout')}>Go Back to Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}
