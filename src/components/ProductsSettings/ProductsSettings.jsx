import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Paginacion from "./Paginacion.jsx";

import ModProduct from "./ModProduct.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/actions/actionsProducts.js";
import { getCategories } from "../../Redux/actions/actionsCategories.js";
import NewProduct from "./NewProduct.jsx";
import st from "./ProductsSettings.module.css";

const ProductsSettings = () => {


  const dispatch = useDispatch();

  const loadingData = async () => {
    const all_ProductsBd = await getProducts();
    dispatch(all_ProductsBd);
    const all_Categories = await getCategories();
    dispatch(all_Categories);
  };

  useEffect(() => {
    loadingData();
  }, []);
  
 

  const allProducts = useSelector((state) => state.allProducts);
  //    console.log(allProducts);
  //pagination
  const itemsPerPage = 10;
  const [pageCurrent, setPageCurrent] = useState(1);
  let totalItems = allProducts.length;
  let indInicial = (pageCurrent - 1) * itemsPerPage;
  let indFinal = indInicial + itemsPerPage;


  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  ///new producto**************
  const [showNew, setShowNew] = useState(false);
  const handleShowNew = () => {
    showNew ? setShowNew(false) : setShowNew(true);
  };
  /*Modify product****************/
  const [showModif, setShowModif] = useState({ status: false, id: "" });

  const showMod = async (id) => {
    setShowModif({ status: true, id });
  };

  const handleClose = () => setShow(false);

  const [show, setShow] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleShow = ({ id, name }) => {
    setShow(true);
    setId(id);
    setName(name);
  };

  const borradoLogico = async (id, status) => {
    try {
      const dataFuncional = { id: id, active: !status };
      const result = await axios.delete("/products", { data: dataFuncional });

      if (result) {
        alert("Successful operation");
      }
      loadingData();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="container-fluid col-8 mt-3">
        <br />
        <h4>Products Settings</h4>
        <Button
          variant="success"
          onClick={handleShowNew}
          style={{ borderRadius: "2rem", fontSize: "15px" }}
        >
          New
        </Button>
        <Paginacion
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          pageCurrent={pageCurrent}
          setPageCurrent={setPageCurrent}
        />
        <Table striped size="sm">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Modify</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allProducts
              .map((prod, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{prod.name}</td>
                    <td>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => {
                          handleShow({ id: prod.id, name: prod.name });
                        }}
                      >
                        📝
                      </Button>{" "}
                    </td>
                    <td>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => borradoLogico(prod.id, prod.status)}
                      >
                        {prod?.status ? "✅" : "❌"}
                      </Button>
                    </td>
                  </tr>
                );
              })
              .slice(indInicial, indFinal)}
          </tbody>

          <ModProduct
            show={show}
            id={id}
            name={name}
            handleClose={handleClose}
          />
        </Table>
        <div className={st.ppp}>
          {" "}
          <h6>Total products: {totalItems} </h6>
        </div>
        <p className={st.error}>{errorMessage}</p>
        <p className={st.success}>{successMessage}</p>
      </div>
      {showNew ? <NewProduct /> : ""}
    </>
  );
};
export default ProductsSettings;