import React from "react";
import styles from "./falha_remocao.module.css";

const FalhaRemocaoComponent = () => {
    return (
        <div className={styles.successMessage}>
            <p>Não foi possível desativar.</p>
        </div>
    );
};

export default FalhaRemocaoComponent;
