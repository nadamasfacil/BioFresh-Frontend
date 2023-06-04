import { useEffect, useState } from "react";
import { allUsers } from "../../../../Redux/actions/actionsUser";
import { useDispatch } from "react-redux";
import prueba from "./img/yoda-bebe-6617.jpg";
import { Link } from "react-router-dom";

const PersonalInfo = () => {
  return (
    <div className=" text-center  ">
      <div className="">
        <p className="mt-2">persona 1</p>
        <img
          src={prueba}
          alt=""
          width={"120px"}
          height={"120px"}
          style={{ borderRadius: "5rem" }}
        />
        <br />
        <br />
        <p>John Doe</p>
        <p>john.doe@gmail.com</p>
        {/* <p>Phone: 555-555-5555</p> */}

        <div className=" container">
          <div style={{ border: "" }} className="row ">
            <div className="col   text-end">💳</div>
            <div className="col text-start">🚌</div>
          </div>
          <br />

          <Link to="/form_update">
            <button
              style={{
                borderRadius: "3rem",
                backgroundColor: "white",
                color: "black",
                border: "1px solid blue",
              }}
            >
              administrar datos de Biofresh
            </button>
          </Link>
          <div className=" ">
            <button
              style={{
                border: "1px solid blue",
                backgroundColor: "white",
                color: "black",
                borderRadius: "2rem",
                marginTop: "20px",
              }}
            >
              Administra tu cuenta de google
            </button>
          </div>

          {/*  <div>cambiar First Name: ejemplo 1</div>
          <div>cambiar Last Name: ejeplo 2</div>
          <div>cambiar Address: 123121</div>
          <div>Zip Code: 123123</div>
          <div>Country: 12312</div>
          <div>Phone: 3431212</div>
          <div>City: prueba</div> */}
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;