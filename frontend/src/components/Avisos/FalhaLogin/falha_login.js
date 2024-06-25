import React from "react";
import styles from "./falha_login.module.css";

const FalhaLoginComponent = () => {
    return (
        <div className={styles.successMessage}>
            <p>Usuário ou senha inválidos.</p>
        </div>
    );
};

export default FalhaLoginComponent;
