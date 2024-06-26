import React, { useState } from "react";
import styles from "./modal_ferramentas_inativos.module.css";
import logo from "../../assets/imagens/logo.png";
import Ativado from "../Avisos/Ativado/ativado";
import { useApi } from '../../../src/ApiContext.js';

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const ModalFerramentasInativosComponent = ({ onClose, ferramenta, onShowModal, onRemove }) => {
    const [editData, setEditData] = useState({
        Nome: ferramenta.nome,
        NúmeroDeSerie: ferramenta.numSerie,
        Descricao: ferramenta.descricao,
        DataAquisicao: formatDate(ferramenta.dataAquisicao),
    });

    const [showEditado, setShowEditado] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const time = 3000;
    const { apiUrl } = useApi();

    const handleAtivar = async () => {
        const token = localStorage.getItem('token');
        let response;

        try {
            const formData = new FormData();
            formData.append('status', 'Disponível');

            response = await fetch(`${apiUrl}/ferramentas/${ferramenta.codFerramenta}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setShowEditado(true);
                setTimeout(() => {
                    setShowEditado(false);
                    if (onRemove) onRemove(); // Verifica se onRemove é passado e chama a função para recarregar a lista de ferramentas após ativação
                    onClose(); // Fechar o modal após a ativação
                    if (onShowModal) onShowModal(false); // Atualiza o estado do modal no componente pai, se necessário
                }, time);
            } else {
                const errorData = await response.json();
                console.error('Erro ao ativar a ferramenta:', errorData);
                setShowFalhaEdicao(true);
                setTimeout(() => {
                    setShowFalhaEdicao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao ativar a ferramenta:', error);
            setShowFalhaEdicao(true);
            setTimeout(() => {
                setShowFalhaEdicao(false);
            }, time);
        }
    };

    return (
        <>
            {showEditado && <Ativado />}
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div id={styles.fundo_img}>
                        <img src={ferramenta.imgFerramenta || logo} className={styles.modal_image} alt="Imagem de ferramenta" />
                    </div>
                    <div className={styles.modal_content}>
                        {Object.entries(editData).map(([key, value]) => (
                            <div className={styles.info_row} key={key}>
                                <span className={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <p>{value}</p>
                            </div>
                        ))}
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            <>
                                <button className={styles.remove_button} onClick={handleAtivar}>ATIVAR</button>
                                <button className={styles.relatorio_button}>RELATÓRIO</button>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalFerramentasInativosComponent;
