import React from "react";
import styles from "./falha_edicao.module.css";

const FalhaEdicaoComponent = () => {
    return (
        <div className={styles.successMessage}>
            <p>Não foi possível editar.</p>
        </div>
    );
};

export default FalhaEdicaoComponent;
