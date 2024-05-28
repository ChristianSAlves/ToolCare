import React from "react";
import styles from "./confirmar_remocao.module.css";

const ConfirmarRemocaoComponent = ({ onConfirm, onCancel }) => {
    return (
        <div className={styles.removeMessage}>
            <p className={styles.messageText}>Realmente deseja remover?</p>
            <div className={styles.buttonContainer}>
                <button className={styles.confirmButton} onClick={onConfirm}>Sim</button>
                <button className={styles.cancelButton} onClick={onCancel}>Não</button>
            </div>
        </div>
    );
};

export default ConfirmarRemocaoComponent;
