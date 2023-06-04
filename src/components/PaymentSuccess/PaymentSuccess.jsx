import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {

    const userAdmin = useSelector(state => state.userLogin);
    const navigate = useNavigate();

    useEffect(() => {
        !userAdmin.adminType && navigate("/")
    })

    return(
        <>
            <h1>Success!</h1>
        </>
    )
}

export default PaymentSuccess;