import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ModalFuncionariosComponent from "../ModalFuncionarios/modal_funcionarios";
import ModalFuncionariosInativosComponent from "../ModalFuncionariosInativos/modal_funcionarios_inativos";
import styles from "./card_funcionarios.module.css";

const CardFuncionariosComponent = ({ funcionario, defaultFuncionario, onShowModal }) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isFuncionarioPage = location.pathname === "/funcionario";

    return (
        <div id={styles.card}>
            {funcionario && funcionario.imgFunc ? (
                <img src={funcionario.imgFunc} alt="imagem funcionario" />
            ) : (
                <img src={defaultFuncionario} alt="imagem padrão" />
            )}
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.nome} ${styles.list_item}`}>{funcionario.nome}</p>
                        <div id={styles.card_item}>
                            <p className={`${styles.matriculaFuncionario} ${styles.list_item}`}>{funcionario.matriculaFuncionario}</p>
                            <p className={`${styles.cpf} ${styles.list_item}`}>{funcionario.cpf}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={handleShowModal}>VER MAIS</button>
            </div>
            {showModal && isFuncionarioPage && (
                <ModalFuncionariosComponent
                    onClose={handleCloseModal}
                    funcionario={funcionario}
                />
            )}
            {showModal && !isFuncionarioPage && (
                <ModalFuncionariosInativosComponent
                    onClose={handleCloseModal}
                    funcionario={funcionario}
                />
            )}
        </div>
    );
};

export default CardFuncionariosComponent;
