import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuComponent from "../../../components/Menu/Menu";
import CardFerramentas from "../../../components/CardFerramentas/card_ferramentas";
import ModalFerramentasComponent from "../../../components/ModalFerramentas/modal_ferramentas";
import { Link } from "react-router-dom";
import styles from "./ferramenta.module.css"; // Importando o módulo CSS corretamente

const Ferramenta = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [Ferramentas, setFerramentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFerramenta, setSelectedFerramenta] = useState(null);

  const filterFerramentas = async (newSearch, newSelectedOption) => {
    const token = localStorage.getItem("token");
    try {
      const responseFerramentas = await fetch(
        "http://127.0.0.1:8000/ferramentas/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!responseFerramentas.ok) {
        throw new Error("Erro ao carregar as Ferramentas");
      }

      const dataFerramentas = await responseFerramentas.json();
      let filteredFerramentas = dataFerramentas.filter(
        (ferramenta) =>
          (newSelectedOption === "num_serie" &&
            ferramenta.numSerie
              .toLowerCase()
              .includes(newSearch.toLowerCase())) ||
          (newSelectedOption === "nome" &&
            ferramenta.nome.toLowerCase().includes(newSearch.toLowerCase())) ||
          (newSelectedOption === "status" &&
            ferramenta.status
              .toLowerCase()
              .includes(newSearch.toLowerCase())) ||
          (!newSelectedOption &&
            (ferramenta.numSerie
              .toLowerCase()
              .includes(newSearch.toLowerCase()) ||
              ferramenta.nome.toLowerCase().includes(newSearch.toLowerCase()) ||
              ferramenta.status
                .toLowerCase()
                .includes(newSearch.toLowerCase())))
      );

      setFerramentas(filteredFerramentas);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const responseFerramentas = await fetch(
          "http://127.0.0.1:8000/ferramentas/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!responseFerramentas.ok) {
          throw new Error("Erro ao carregar as Ferramentas");
        }
        const dataFerramentas = await responseFerramentas.json();
        setFerramentas(dataFerramentas);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterFerramentas(search, selectedOption);
  }, [search, selectedOption]);

  const defaultFerramenta = "url_to_default_image";
  const toggleModal = (ferramenta) => {
    setSelectedFerramenta(ferramenta);
    setShowModal(!showModal);
  };

  return (
    <div className="container-fluid">
      <MenuComponent />
      <Link to={"/ferramenta_cadastro"}>
        <button className="btn btn-primary position-absolute top-0 end-0 m-3">
          +
        </button>
      </Link>
      <div className="row justify-content-center my-3">
        <div className="col-12 col-md-6">
          <input
            className="form-control"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-wrap justify-content-center">
            {Ferramentas.map((ferramenta, index) => (
              <CardFerramentas
                key={ferramenta.idFerramenta ? ferramenta.idFerramenta : index}
                ferramenta={ferramenta}
                defaultFerramenta={defaultFerramenta}
                onShowModal={() => toggleModal(ferramenta)}
              />
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalFerramentasComponent
          onClose={toggleModal}
          ferramenta={selectedFerramenta}
        />
      )}
    </div>
  );
};

export default Ferramenta;
