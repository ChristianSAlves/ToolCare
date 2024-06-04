import React from "react";
import styles from "./card_setores.module.css";

const CardSetoresComponent = ({ setor, onShowModal }) => {
    return (
        <div id={styles.card}>
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.nome} ${styles.list_item}`}>{setor.nomeSetor}</p>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={() => onShowModal(setor)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardSetoresComponent;
