import React from "react";
import styles from "./falha_cadastro.module.css";

const FalhaCadastroComponent = () => {
    return (
        <div className={styles.successMessage}>
            <p>Não foi possível cadastrar.</p>
        </div>
    );
};

export default FalhaCadastroComponent;
