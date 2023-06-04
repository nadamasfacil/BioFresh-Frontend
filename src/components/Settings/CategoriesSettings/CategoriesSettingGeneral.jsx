import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../Redux/actions/actionsCategories";
import { useEffect, useState } from "react";
import AddCategorie from "./AddCategorie";
import ModificarCategoria from "./ModificarCategories";
import Paginacion from "../../ProductsSettings/Paginacion.jsx";

const CategoriesSettingGeneral = () => {

  const dispatch = useDispatch();
  const loadingData = async () => {
    const data = await getCategories()
     dispatch(data);
  };

  useEffect(() => {
    loadingData();
  },[]);

  const allCategories = useSelector((state) => state?.allCategories);
//paginacion
  const itemsPerPage = 10;
  const [pageCurrent, setPageCurrent] = useState(1);
  let totalItems = allCategories.length;
  let indInicial = (pageCurrent - 1) * itemsPerPage;
  let indFinal = indInicial + itemsPerPage;


  //modal add categorie
  const [estado, setEstado] = useState(false);
  const handleModal = () => {
    estado ? setEstado(false) : setEstado(true);
  };

  const deleteCategorie = async (id, status) => {
    try {
      const dataFuncional = { id: id, active: !status };
      const result = await axios.delete("/categories", { data: dataFuncional });
      if (result) {
        alert("Successful operation");
      }
      loadingData();
    } catch (error) {
      alert(`Error found ${error.message}`);
    }
  };

  //modal modificar categorie
  const [pasamanos, setPasamanos] = useState({
    id: "",
    name: "",
  });
  const [modificar, setModificar] = useState(false);
  const handleModalDos = (id, name) => {
    setPasamanos({ id: id, name: name });
    if (modificar) {
      setModificar(false);
    } else {
      setModificar(true);
    }
  };

  return (
    <div className="container-fluid col-8 mt-3">
      <br />
      <h4>Category Settings</h4>
      <div>
        <Button
          style={{ borderRadius: "2rem", fontSize: "15px" }}
          onClick={handleModal}
          variant="success"
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
            {allCategories?.map((categorie, index) => {
              return (
                <tr key={index}>
                  <td key={index}>{index + 1}</td>
                  <td>{categorie?.name}</td>
                  <td>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() =>
                        handleModalDos(categorie.id, categorie.name)
                      }
                    >
                      📝
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() =>
                        deleteCategorie(categorie?.id, categorie?.status)
                      }
                    >
                      {categorie.status ? "✅" : "❌"}
                    </Button>
                  </td>
                </tr>
              );
            }).slice(indInicial, indFinal)}
          </tbody>
        </Table>
        <div >
        
          <h6 style={{'display': 'flex',
                      'justify-content': 'end',
                    'font-weight':'lighter',
                    'margin-right': '20px'}}>
                      Total categories: {totalItems} </h6>
        </div>
        {estado ? <AddCategorie /> : null}
        {modificar ? (
          <ModificarCategoria id={pasamanos.id} name={pasamanos.name} />
        ) : null}
      </div>
    </div>
  );
};
export default CategoriesSettingGeneral;
