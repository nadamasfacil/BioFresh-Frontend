import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const Payment = () => {
  const [datos, setDatos] = useState(null); // Estado para almacenar los datos

  useEffect(() => {
    if (!datos) {
      // Realiza la llamada GET solo si los datos aún no se han obtenido
      axios
        .get("/payments")
        .then((response) => setDatos(response.data))
        .catch((error) => console.log(error));
    }
  }, [datos]);
  return (
    <div className="container-fluid col-8 mt-3">
      {datos?.length > 0 ? (
        <Table striped size="sm" >
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Status</th>
              <th>userEmail</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((payment, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{payment.name}</td>
                  <td>{payment.status}</td>
                  <td>{payment.userEmail}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h1>No Payments</h1>
      )}
    </div>
  );
};
export default Payment;
