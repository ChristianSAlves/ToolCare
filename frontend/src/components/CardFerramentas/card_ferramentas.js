import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ModalFerramentasComponent from "../ModalFerramentas/modal_ferramentas";
import ModalFerramentasInativosComponent from "../ModalFerramentasInativos/modal_ferramentas_inativos";
import styles from "./card_ferramentas.module.css";

const CardFerramentasComponent = ({ ferramenta, defaultFerramenta, onShowModal }) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isFerramentaPage = location.pathname === "/ferramenta";

    return (
        <div id={styles.card}>
            {ferramenta && ferramenta.imgFerramenta ? (
                <img src={ferramenta.imgFerramenta} alt="imagem ferramenta" />
            ) : (
                <img src={defaultFerramenta} alt="imagem padrão" />
            )}
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.nome} ${styles.list_item}`}>{ferramenta.nome}</p>
                        <div id={styles.card_item}>
                            <p className={`${styles.numSerie} ${styles.list_item}`}>{ferramenta.numSerie}</p>
                            <p className={`${styles.status} ${styles.list_item}`}>{ferramenta.status}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={handleShowModal}>VER MAIS</button>
            </div>
            {showModal && isFerramentaPage && (
                <ModalFerramentasComponent
                    onClose={handleCloseModal}
                    ferramenta={ferramenta}
                />
            )}
            {showModal && !isFerramentaPage && (
                <ModalFerramentasInativosComponent
                    onClose={handleCloseModal}
                    ferramenta={ferramenta}
                />
            )}
        </div>
    );
};

export default CardFerramentasComponent;
