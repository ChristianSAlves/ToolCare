import React from "react";
import styles from "./card_manutencoes.module.css";

const CardManutencoesComponent = ({ manutencao, onShowModal }) => {
    return (
        <div id={styles.card}>
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.nome_ferramenta} ${styles.list_item}`}>{manutencao.nomeFerramenta}</p>
                        <div id={styles.card_item}>
                        <p className={`${styles.tipoManutencao} ${styles.list_item}`}>{manutencao.tipoManutencao}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={() => onShowModal(manutencao)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardManutencoesComponent;
