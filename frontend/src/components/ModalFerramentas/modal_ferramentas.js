import React from "react";
import styles from "./modal_ferramentas.module.css";
import logo from "../../assets/imagens/logo.png";

const ModalFerramentasComponent = ({ onClose, ferramenta, defaultFerramenta, onShowModal }) => {
    return (
        <div className={styles.tela_cheia} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div id={styles.fundo_img}>
                    <img src={logo} className={styles.modal_image} alt="Imagem de ferramenta" />
                </div>
                <div className={styles.modal_content}>
                    <div className={styles.modal_info}>
                    <div className={styles.info_row}>
                            <span className={styles.label}>Nome</span>
                            <p>Alicate 01</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Número de Série</span>
                            <p>1233412</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Descrição</span>
                            <p>Alicate pra apertar prego</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data de Aquisição</span>
                            <p>12/09/2020</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data de Baixa</span>
                            <p>12/09/2020</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Status</span>
                            <p>Disponível</p>
                        </div>
                    </div>
                    <p id={styles.fechar} onClick={onClose}>x</p>
                    <div className={styles.modal_buttons}>
                        <button className={styles.edit_button}>EDITAR</button>
                        <button className={styles.remove_button}>REMOVER</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFerramentasComponent;
