import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuComponent from "../../../components/Menu/Menu";
import CardEmprestimosComponent from "../../../components/CardEmprestimos/card_emprestimos";
import ModalFerramentasComponent from "../../../components/ModalFerramentas/modal_ferramentas";
import { Link } from "react-router-dom";
import styles from "./emprestimo.module.css"; // Importando o módulo CSS corretamente

const Emprestimo = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [Emprestimos, setEmprestimos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState(null);

  const filterEmprestimos = async (newSearch, newSelectedOption) => {
    const token = localStorage.getItem("token");
    try {
      const responseEmprestimos = await fetch(
        "http://127.0.0.1:8000/emprestimos/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!responseEmprestimos.ok) {
        throw new Error("Erro ao carregar os Emprestimos");
      }

      const dataEmprestimos = await responseEmprestimos.json();
      setEmprestimos(dataEmprestimos);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const responseEmprestimos = await fetch(
          "http://127.0.0.1:8000/emprestimos/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!responseEmprestimos.ok) {
          throw new Error("Erro ao carregar os Emprestimos");
        }
        const dataEmprestimos = await responseEmprestimos.json();
        setEmprestimos(dataEmprestimos);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterEmprestimos(search, selectedOption);
  }, [search, selectedOption]);

  const defaultFerramenta = "url_to_default_image";
  const toggleModal = (emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setShowModal(!showModal);
  };

  return (
    <div className="container-fluid">
      <MenuComponent />
      <Link to={"/emprestimo_cadastro"}>
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
            {Emprestimos.map((emprestimo, index) => (
              <CardEmprestimosComponent
                key={
                  emprestimo.codigoEmprestimo
                    ? emprestimo.codigoEmprestimo
                    : index
                }
                emprestimo={emprestimo}
                defaultFerramenta={defaultFerramenta}
                onShowModal={() => toggleModal(emprestimo)}
              />
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalFerramentasComponent
          onClose={toggleModal}
          ferramenta={selectedEmprestimo}
        />
      )}
    </div>
  );
};

export default Emprestimo;
