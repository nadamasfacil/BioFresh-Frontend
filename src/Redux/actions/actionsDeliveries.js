import { SET_SHIPPING_OPTIONS, SAVE_SHIPPING_DATA, REFRESH_TOTAL_AMOUNT } from "../types/typesDeliveries";


export const setShippingOption = (shippingOption) => {
    return function (dispatch){
        return dispatch({
            type: SET_SHIPPING_OPTIONS,
            payload: shippingOption,
        })
    }
};

export const refreshTotalAmount = (totalAmount) => {
    return function(dispatch){
        return dispatch({
            type: REFRESH_TOTAL_AMOUNT,
            payload: totalAmount
        })
    }
}

export const saveShippingData = (datos) => {
    return function (dispatch){
        return dispatch({
            type: SAVE_SHIPPING_DATA,
            payload: datos,
        })
    }
}