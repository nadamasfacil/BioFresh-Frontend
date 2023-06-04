import React, { useEffect, useState } from "react";
import UsersSettings from "../UsersSettings/SettingsGeneral/UsersSettings";
import ProductsSettings from "../ProductsSettings/ProductsSettings";
import CategoresSettings from "../Settings/CategoriesSettings/CategoriesSettingGeneral";
import Payment from "./Payments/Payments";
import { useSelector } from "react-redux";

function Settings() {
  const userAdmin = useSelector((state) => state.userLogin);

  const [show, setShow] = useState({
    users: false,
    products: false,
    categories: false,
    Payments: false,
  });
  const handlerShowU = () => {
    setShow({
      users: true,
      products: false,
      Payments: false,
      categories: false,
    });
  };
  const handlerShowP = () => {
    setShow({
      users: false,
      products: true,
      categories: false,
      Payments: false,
    });
  };

  const handlerShowC = () => {
    setShow({
      users: false,
      products: false,
      categories: true,
      Payments: false,
    });
  };

  const handlerShowJ = () => {
    setShow({
      users: false,
      products: false,
      categories: false,
      Payments: true,
    });
  };

  return (
    <div className="container-fluid">
      <div className="text-center mt-5 mb-5">
        <div>
          <h3>Administrator options</h3>
          <button onClick={handlerShowU} style={{ borderRadius: "2rem" }}>
            Users
          </button>
          <></> <></>
          <button onClick={handlerShowP} style={{ borderRadius: "2rem" }}>
            Products
          </button>
          <></> <></>
          <button onClick={handlerShowC} style={{ borderRadius: "2rem" }}>
            Categories
          </button>
          <></> <></>
          <button onClick={handlerShowJ} style={{ borderRadius: "2rem" }}>
            Payments
          </button>
          {show.users ? <UsersSettings /> : null}
          {show.products ? <ProductsSettings /> : null}
          {show.categories ? <CategoresSettings /> : null}
          {show.Payments ? <Payment /> : null}
        </div>
      </div>
    </div>
  );
}

export default Settings;
