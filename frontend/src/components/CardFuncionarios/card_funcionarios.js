import React from "react";
import styles from "./card_funcionarios.module.css";

const CardFuncionariosComponent = ({ funcionario, defaultFuncionario, onShowModal }) => {
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
                <button id={styles.button_card} onClick={() => onShowModal(funcionario)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardFuncionariosComponent;
