import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuComponent from "../../../components/Menu/Menu";
import CardSetores from "../../../components/CardSetores/card_setores";
import ModalSetoresComponent from "../../../components/ModalSetores/modal_setores";
import { Link } from "react-router-dom";

const Setor = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("nome");
  const [Setores, setSetores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSetor, setSelectedSetor] = useState(null);

  const filterSetores = async (newSearch, newSelectedOption) => {
    const token = localStorage.getItem("token");
    try {
      const responseSetores = await fetch("http://127.0.0.1:8000/setores/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!responseSetores.ok) {
        throw new Error("Erro ao carregar os Setores");
      }

      const dataSetores = await responseSetores.json();
      let filteredSetores = dataSetores.filter(
        (setor) =>
          newSelectedOption === "nome" &&
          setor.nomeSetor.toLowerCase().includes(newSearch.toLowerCase())
      );

      setSetores(filteredSetores);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const responseSetores = await fetch("http://127.0.0.1:8000/setores/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!responseSetores.ok) {
          throw new Error("Erro ao carregar os Setores");
        }
        const dataSetores = await responseSetores.json();
        setSetores(dataSetores);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterSetores(search, selectedOption);
  }, [search, selectedOption]);

  const toggleModal = (setor) => {
    setSelectedSetor(setor);
    setShowModal(!showModal);
  };

  return (
    <div className="container-fluid">
      <MenuComponent />
      <Link to={"/setor_cadastro"}>
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
            {Setores.map((setor, index) => (
              <CardSetores
                key={setor.idSetor ? setor.idSetor : index}
                setor={setor}
                onShowModal={() => toggleModal(setor)}
              />
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalSetoresComponent onClose={toggleModal} setor={selectedSetor} />
      )}
    </div>
  );
};

export default Setor;
