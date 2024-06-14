import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuComponent from "../../../components/Menu/Menu";
import CardFuncionarios from "../../../components/CardFuncionarios/card_funcionarios";
import ModalFuncionariosComponent from "../../../components/ModalFuncionarios/modal_funcionarios";
import { Link } from "react-router-dom";
import styles from "./funcionario.module.css"; // Certifique-se de que o caminho está correto

const Funcionario = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [Funcionarios, setFuncionarios] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controle da visibilidade do modal
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);

  const filterFuncionarios = async (newSearch, newSelectedOption) => {
    const token = localStorage.getItem("token"); // Obtendo o token de autorização do localStorage

    try {
      const responseFuncionarios = await fetch(
        "http://127.0.0.1:8000/funcionarios/",
        {
          headers: {
            Authorization: `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
          },
        }
      );

      if (!responseFuncionarios.ok) {
        throw new Error("Erro ao carregar os Funcionarios");
      }

      const dataFuncionarios = await responseFuncionarios.json();

      let filteredFuncionarios = dataFuncionarios;

      if (newSelectedOption === "nome") {
        filteredFuncionarios = dataFuncionarios.filter((funcionario) =>
          funcionario.nome.toLowerCase().includes(newSearch.toLowerCase())
        );
      } else if (newSelectedOption === "matriculaFuncionario") {
        filteredFuncionarios = dataFuncionarios.filter((funcionario) =>
          funcionario.matriculaFuncionario
            .toLowerCase()
            .includes(newSearch.toLowerCase())
        );
      } else if (newSelectedOption === "cpf") {
        filteredFuncionarios = dataFuncionarios.filter((funcionario) =>
          funcionario.cpf.toLowerCase().includes(newSearch.toLowerCase())
        );
      } else if (newSearch) {
        filteredFuncionarios = dataFuncionarios.filter(
          (funcionario) =>
            funcionario.matriculaFuncionario
              .toLowerCase()
              .includes(newSearch.toLowerCase()) ||
            funcionario.nome.toLowerCase().includes(newSearch.toLowerCase()) ||
            funcionario.cpf.toLowerCase().includes(newSearch.toLowerCase())
        );
      }

      setFuncionarios(filteredFuncionarios);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtendo o token de autorização do localStorage

    const fetchData = async () => {
      try {
        // Busca os funcionarios
        const responseFuncionarios = await fetch(
          "http://127.0.0.1:8000/funcionarios/",
          {
            headers: {
              Authorization: `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
            },
          }
        );
        if (!responseFuncionarios.ok) {
          throw new Error("Erro ao carregar os Funcionarios");
        }
        const dataFuncionarios = await responseFuncionarios.json();
        setFuncionarios(dataFuncionarios);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterFuncionarios(search, selectedOption);
  }, [search, selectedOption]);

  const defaultFuncionario = "url_to_default_image";
  const toggleModal = (funcionario) => {
    setSelectedFuncionario(funcionario);
    setShowModal(!showModal);
  };

  return (
    <div className="container-fluid">
      <MenuComponent />
      <Link to={"/funcionario_cadastro"}>
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
            {Funcionarios.map((funcionario, index) => (
              <CardFuncionarios
                key={
                  funcionario.idFuncionario ? funcionario.idFuncionario : index
                }
                funcionario={funcionario}
                defaultFuncionario={defaultFuncionario}
                onShowModal={() => toggleModal(funcionario)}
              />
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalFuncionariosComponent
          onClose={toggleModal}
          funcionario={selectedFuncionario}
        />
      )}
    </div>
  );
};

export default Funcionario;
