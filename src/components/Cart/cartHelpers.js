import axios from "axios";

export const foundOrderForDetail = async (userLogin) => {
  let orderFlag = false;
  let orderUser;
  let foundUser = await axios.get('/users?email='+userLogin);
  const userFound = foundUser.data.email;
  const orderUserfound = foundUser.data.orders;
  for (let i=0; i < orderUserfound.length; i++) {
    const orderUserFound = await axios.get('/orders/'+orderUserfound[i].id);
    orderUser = orderUserFound.data
    if (orderUser.orderStatus === 'Cart') {
      orderFlag = true;
      i = orderUserfound.length;
    };
  };
  if (!orderFlag) {
    const orderCreate = await axios.post('/orders', { userId : userFound });
    orderUser = orderCreate.data;
  };
  return orderUser;
};

export const cartFoundIndex = (idProduct, cartDetails) => {
  for (let i=0; i < cartDetails.length; i++) {
    if (cartDetails[i].idProduct === idProduct) return cartDetails[i].units;
  };
  return null;
};

export const getCartDetail = (idProduct, cartDetails) => {
  for (let i=0; i < cartDetails.length; i++) {
    if (cartDetails[i].idProduct === idProduct) return cartDetails[i];
  };
  return null; 
};

export const updateTotals = (cartDetails) => {
  let amountO= 0;
  let taxAmountO = 0;
  let totalAmountO = 0;
  for (let i=0; i < cartDetails.length; i++) {
      amountO = amountO + cartDetails[i].amount;
      taxAmountO = taxAmountO + cartDetails[i].taxAmount;
      totalAmountO = totalAmountO + cartDetails[i].totalAmount;
  };
  return {
    amount: amountO,
    taxAmount: taxAmountO,
    totalAmount: totalAmountO,
  };
};

export const cartToUser = async (user) => {
  const lsUser = localStorage.getItem('user');
  const lsCartUser = localStorage.getItem('cartDetails');
  let lsCart = JSON.parse(lsCartUser);
  console.log('lsCart en cartToUser ', lsCart);
  let orderUserFound = await foundOrderForDetail(user);
  if (lsCart !== null) {
    if ( Array.isArray(lsCart.details) && lsCart.details !==[]) {
    if (lsCart.details.length > 0) {
      // borra todos los detalles en DB
      await axios.delete('/orders/'+orderUserFound.id);
      // agrega los detalles del localstorage
      for (let i=0; i < lsCart.details.length; i++) {
        const detailsData = {
          idOrder: orderUserFound.id,
          idProduct: lsCart.details[i].idProduct,
          units: lsCart.details[i].units
        };
        const detailCreated = await axios.post('/ordersDetails', detailsData);
        lsCart.details[i] = {
          ...lsCart.details[i],
          idOrder: orderUserFound.id,
          idOrderDetail: detailCreated.data.id,
         
        };
      };
    };
    }
  };
  const orderUser = await axios.get('/orders/'+orderUserFound.id);
  console.log('orderUser en cartToUser ', orderUser);
  let details_User = null;
  // if (orderUser.amount > 0) {
    const detailsUser = await axios.get('ordersDetails', { orderid: orderUserFound.id });
    console.log('detailsUser en CartToUser ', detailsUser);
    if ( detailsUser !== null && detailsUser.data.length > 0) {
      for (let i=0; i < detailsUser.data.length; i++){
        const product = await axios.get('/products/'+detailsUser.data[i].productId);
        detailsUser.data[i] = {
          ...detailsUser.data[i],
          idOrderDetail: detailsUser.data[i].id,
          idOrder: detailsUser.data[i].orderId,
          idProduct: product.data.id,
          name: product.data.name,
          description: product.data.description,
          image: product.data.image,
          tax: product.data.tax,
          stock: product.data.stock,
          price: detailsUser.data[i].amount / detailsUser.data[i].units
        };
      };;
    };
    details_User = detailsUser.data;
  // }
  // localStorage.removeItem('cartDetails');
  return { order: orderUser.data, cartDetails : details_User };

  // return null;
};