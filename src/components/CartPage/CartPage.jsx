import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/esm/Button'
import { RemoveFromCartIcon } from '../Icons/Icons'
import axios from 'axios'
import Container from 'react-bootstrap/esm/Container'
import accounting from 'accounting';
import { useNavigate } from 'react-router-dom'
import { getCartDetail, updateTotals } from '../Cart/cartHelpers'
import { add_All_Cart, add_ToCart, clear_Cart, remove_FromCart, set_Cart } from '../../Redux/actions/actionsCart'
import { getProductById } from '../../Redux/actions/actionsProducts'
import swal from 'sweetalert';

// contact.biofresh.shop@gmail.com
// BioFreshADM2023

const CartPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state=> state.userLogin);
  const cartDetails = useSelector(state=> state.cartDetails);
  const cart = useSelector(state=> state.cart);
  const [ cartFlag, setCartFlag ] = useState(true);
  const [ cant, setCant ] = useState(0);
  let cantProduct;

  const validateCant = (e) => {
    e.preventDefault();
    setCant(e.target.value);
  };

  const updatedCart = async (idProduct) => {
    const productFound = await getProductById(idProduct);
    const cartDetail = await getCartDetail(idProduct, cartDetails);
    if (user.email) {
      let detailData = { idDetail: cartDetail.idOrderDetail };
      const orderDetailDelete = await axios.delete('/ordersDetails', { data: detailData });
      // const updateData = {
      //   idDetail: cartDetail.idOrderDetail,
      //   units: parseInt(cant)
      // };
      // const orderDetailUpdate = await axios.put('/ordersDetails', updateData );
      detailData = {
        idOrder: cartDetail.idOrder,
        idProduct: idProduct,
        units: parseInt(cant)
      };
      const detailCreated = await axios.post('/ordersDetails', detailData);
    };
    dispatch(remove_FromCart(idProduct, cartDetails));
    const cart_Detail = { 
      ...cartDetail, 
      units: parseInt(cant),
      precio: productFound.price,
      amount: (productFound.price * parseInt(cant)),
      taxAmount: (productFound.price * parseInt(cant)) * cartDetail.tax,
      totalAmount: ( (productFound.price * parseInt(cant)) * cartDetail.tax ) + (productFound.price * parseInt(cant)),
    }
    dispatch(add_ToCart(cart_Detail, cartDetails));
    swal("Congratulations", "Updated product in cart", "success");
  };

  const removeToCart = async (idProduct) => {
    const cartDetail = await getCartDetail(idProduct, cartDetails);
    if (user.email) {
      const detailData = { idDetail: cartDetail.idOrderDetail };
      const orderDetailDelete = await axios.delete('/ordersDetails', { data: detailData });
    };
    dispatch(remove_FromCart(idProduct, cartDetails));
  };

  const clearCart = async () => {
    if (user.email) {
      const order = cart.orderId;
      console.log('order en clearCart ', order);
      const orderDetailDelete = await axios.delete('/orders/'+order);
    }; 
    dispatch(clear_Cart());
    setCartFlag(false);
  };

  const goToPath = (goPath) => {
    navigate(goPath);
  };

  const cartUpdate = async () => {
    console.log('cart 1 ', cart);
    console.log('cartDetails 1 ',cartDetails);
    // const cartLS = localStorage.getItem('cartDetails');
    // console.log('cartLS ', cartLS);
    // if (cartLS) {
    //   let cartCartLS = {};
    //   let detailsCartLS = [];
    //   if (cartLS.cart) {
    //     const cartLocalStorage = JSON.parse(cartLS);
    //     cartCartLS = cartLocalStorage.cart;
    //     detailsCartLS = cartLocalStorage.details;
    //   } else {
    //     detailsCartLS = cartLS;
    //   }
    //   console.log(' cart y detail ', cartCartLS, detailsCartLS);
    //   dispatch(add_All_Cart(cartCartLS, detailsCartLS));
    // }
    if (!cartFlag) {
      const cartTotal = {
        amount: 0,
        taxAmount: 0,
        totalAmount: 0
      };
      dispatch(set_Cart(cartTotal));
      localStorage.removeItem('cartDetails', JSON.stringify({
        cart: cart,
        details: cartDetails 
      }));
      setCartFlag(true);
    } else {
      const cartTotal = updateTotals(cartDetails);
      dispatch(set_Cart(cartTotal));
      localStorage.setItem('cartDetails', JSON.stringify({
        cart: cart,
        details: cartDetails 
      }));
    };
  };

  useEffect(()=>{
    cartUpdate();
  },[cartDetails]);

  
  // useEffect(() => {
  //   const cartLS = localStorage.getItem('cartDetails');
  //   console.log('cartLS ', cartLS);
  //   if (cartLS) {
  //     let cartCartLS = {};
  //     let detailsCartLS = [];
  //     if (cartLS.cart) {
  //       const cartLocalStorage = JSON.parse(cartLS);
  //       cartCartLS = cartLocalStorage.cart;
  //       detailsCartLS = cartLocalStorage.details;
  //     } else {
  //       detailsCartLS = cartLS;
  //     }
  //     console.log(' cart y detail ', cartCartLS, detailsCartLS);
  //     dispatch(add_All_Cart(cartCartLS, detailsCartLS));
  //   }
  // },[])

  return (
    <div className='container'>
      <div>
        <div className="row my-2">
          <div className="col-12">
            <h1 className="page-header">Shopping Cart</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9 mb-4">
            <div className="table-responsive">
              {cartDetails.length < 1 
                ? 
                  <section className="col-9">
                    <p className="bg-secondary alert text-white">The shopping cart is currently empty. You can go back and start adding products.</p>
                    <Button className="btn btn-success btn-block mb-1" onClick={()=>goToPath('/store')}>Go Store</Button>
                  </section>
                :
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th></th>
                      <th>Unit Price</th>
                      <th>Qty</th>
                      <th>Update</th>
                      <th>Delete</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    { Array.isArray(cartDetails)  &&  cartDetails.map(product => {
                    cantProduct = product.units;
                    return (
                      <tr key={product.idProduct} >
                        <td>
                          <h5>{product.name}</h5>
                        </td>
                        <td className="text-center">
                          <figure>
                            <img src={product.image} width={90} height={90} alt={product.name} />
                          </figure>
                        </td>
                        <td>
                          <span>{accounting.formatMoney(`${product.price}`)}</span>
                        </td>
                        <td>
                          <input
                            type="number"
                            // value={cantProduct}
                            min={1}
                            max={product.stock}
                            placeholder={product.units}
                            onChange={validateCant}
                            style={{ width: "45px"}}
                          />
                        </td>
                        <td>
                          < Button className='btn' variant="warning" onClick={()=>updatedCart(product.idProduct)}>Up</Button>
                        </td>
                        <td>
                          <Button className='btn' variant="danger" onClick={()=>removeToCart(product.idProduct)}><RemoveFromCartIcon /></Button>
                        </td>
                        <td>
                          <p>{accounting.formatMoney(`${product.amount}`)}</p>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              }
            </div>
            { cartDetails.length > 0 && <Button className='btn' variant="danger" onClick={()=>clearCart()} >Clear Cart</Button>}
          </div>
          { cartDetails.length > 0 &&
          <div className="col-lg-3 mb-4">
            <div className="col-12">
              <h1 className='text-center'>Total Order</h1>
              <table className="table bordered table-striped">
                <tbody>
                  <tr>
                    <td colSpan="1" className="text-left"><strong>Total: </strong></td>
                    <td colSpan="1" className="text-right"><p>{accounting.formatMoney(`${cart.totalAmount}`)}</p></td>
                  </tr>
                </tbody>
              </table>
              {user.email ? 
                <div className="text-center cart-actions">
                  <Button className="btn btn-success btn-block mb-3" onClick={()=>goToPath('/cart/checkout')}>Proceed to Checkout</Button>
                </div> :
                <div className="text-center cart-actions">
                  <Button className="btn btn-success btn-block mb-3" onClick={()=>goToPath('/login')}>Proceed to Checkout</Button>
                </div>
              }
              <div className="text-center cart-actions">
                <Button className="btn btn-success btn-block mb-1" onClick={()=>goToPath('/store')}>← Continue Shopping</Button>
              </div>
            </div>
          </div>
          } 
        </div>
      </div>
    </div>
  )
}

export default CartPage
