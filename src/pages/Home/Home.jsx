import React, { useEffect, useState } from "react";
import "./Home.css";
import { getProducts } from "../../brigde/GeneralRequest";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";

const showColums = [
  { name: "logo", label: "Logo" },
  { name: "name", label: "Nombre del Producto" },
  { name: "description", label: "Descripción" },
  { name: "data_release", label: "Fecha de liberación" },
  { name: "date_revision", label: "Fecha de revisión" },
  { name: "actions", label: "" },
];

const Home = () => {
  //States
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  //Hooks
  const navigate = useNavigate();

  //Functions
  const fillTable = async () => {
    const response = await getProducts();
    setData(response);
    setFilteredData(response);
  };

  const handleSearch = () => {
    if (search === "") {
      setFilteredData(data);
      return;
    }
    const tempData = [...filteredData];
    const resultData = tempData.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    console.log(resultData);
    setFilteredData(resultData);
  };

  useEffect(() => {
    fillTable();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div>
      <div className='buttons-container'>
        <Search
          text='Buscar'
          action={(event) => setSearch(event.target.value)}
        />
        <Button
          action={() => navigate("/addProduct")}
          text='Agregar'
          color='primary'
        />
      </div>
      <Table data={filteredData} showColums={showColums} />
    </div>
  );
};

export default Home;
