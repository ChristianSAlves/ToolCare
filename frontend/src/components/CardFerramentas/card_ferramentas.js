import React from "react";
import styles from "./card_ferramentas.module.css";

const CardTeste = ({ ferramenta, defaultFerramenta, onShowModal }) => {
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
                        <p className={`${styles.numSerie} ${styles.list_item}`}>Número de Serie: {ferramenta.numSerie}</p>
                        <p className={`${styles.status} ${styles.list_item}`}>Status: {ferramenta.status}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={() => onShowModal(ferramenta)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardTeste;
