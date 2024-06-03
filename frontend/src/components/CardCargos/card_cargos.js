import React from "react";
import styles from "./card_cargos.module.css";

const CardCargosComponent = ({ cargo, onShowModal }) => {
    return (
        <div id={styles.card}>
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.nome} ${styles.list_item}`}>{cargo.nomeCargo}</p>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={() => onShowModal(cargo)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardCargosComponent;
