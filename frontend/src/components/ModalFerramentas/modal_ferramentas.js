import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./modal_ferramentas.module.css";
import logo from "../../assets/imagens/logo.png";
import EditadoComponent from "../Avisos/Editado/editado";
import RemovidoComponent from "../Avisos/Removido/removido";
import FalhaEdicaoComponent from "../Avisos/FalhaEdição/falha_edicao";
import FalhaRemocaoComponent from "../Avisos/FalhaRemoção/falha_remocao";
import ConfirmarRemocaoComponent from "../Avisos/ConfirmarRemoção/confirmar_remocao";
import { useApi } from '../../../src/ApiContext.js';

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const ModalFerramentasComponent = ({ onClose, ferramenta, onShowModal, onRemove = () => { } }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showEditado, setShowEditado] = useState(false);
    const [showRemovido, setShowRemovido] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const [showFalhaRemocao, setShowFalhaRemocao] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [editData, setEditData] = useState({
        Nome: ferramenta.nome,
        NúmeroDeSerie: ferramenta.numSerie,
        Descricao: ferramenta.descricao,
        DataAquisicao: formatDate(ferramenta.dataAquisicao),
    });
    const time = 3000;
    const { apiUrl } = useApi();
    const navigate = useNavigate();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        const token = localStorage.getItem('token');
        let response;

        try {
            const formData = new FormData();
            formData.append('nome', editData.Nome);
            formData.append('numSerie', editData.NúmeroDeSerie);
            formData.append('descricao', editData.Descricao);
            // Formatando a data de volta para o formato yyyy-mm-dd
            const [day, month, year] = editData.DataAquisicao.split('/');
            const formattedDate = `${year}-${month}-${day}`;
            formData.append('dataAquisicao', formattedDate);

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
                    onClose(); // Fechar o modal após a atualização
                    if (onShowModal) onShowModal(false); // Atualiza o estado do modal no componente pai, se necessário
                }, time);
            } else {
                const errorData = await response.json();
                console.error('Erro ao atualizar a ferramenta:', errorData);
                setShowFalhaEdicao(true);
                setTimeout(() => {
                    setShowFalhaEdicao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao atualizar a ferramenta:', error);
            setShowFalhaEdicao(true);
            setTimeout(() => {
                setShowFalhaEdicao(false);
            }, time);
        }

        setIsEditing(false); // Sair do modo de edição após confirmar
    };

    const handleChange = (event, field) => {
        const value = event.target.value;
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleRemove = async () => {
        const token = localStorage.getItem('token');
        let response;

        try {
            const formData = new FormData();
            formData.append('status', 'Baixa');

            response = await fetch(`${apiUrl}/ferramentas/${ferramenta.codFerramenta}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setShowRemovido(true);
                setTimeout(() => {
                    setShowRemovido(false);
                    onRemove(); // Chama a função para recarregar a lista de ferramentas após remoção
                    onClose(); // Fechar o modal após a remoção
                    if (onShowModal) onShowModal(false); // Atualiza o estado do modal no componente pai, se necessário
                }, time);
            } else {
                const errorData = await response.json();
                console.error('Erro ao desativar a ferramenta:', errorData);
                setShowFalhaRemocao(true);
                setTimeout(() => {
                    setShowFalhaRemocao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao desativar a ferramenta:', error);
            setShowFalhaRemocao(true);
            setTimeout(() => {
                setShowFalhaRemocao(false);
            }, time);
        }
    };

    const confirmRemove = () => {
        setShowConfirmacao(true);
    };

    const cancelRemove = () => {
        setShowConfirmacao(false);
    };

    const handleConfirmRemove = () => {
        setShowConfirmacao(false);
        handleRemove();
    };

    const handleRelatorio = () => {
        navigate('/relatorio_ferramenta', { state: { ferramenta } });
    };

    return (
        <>
            {showRemovido && <RemovidoComponent />}
            {showFalhaEdicao && <FalhaEdicaoComponent />}
            {showFalhaRemocao && <FalhaRemocaoComponent />}
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div id={styles.fundo_img}>
                        <img src={ferramenta.imgFerramenta || logo} className={styles.modal_image} alt="Imagem de ferramenta" />
                    </div>
                    <div className={styles.modal_content}>
                        {Object.entries(editData).map(([key, value]) => (
                            <div className={styles.info_row} key={key}>
                                <span className={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                {isEditing && key !== "Nome" && key !== "DataAquisicao" && key !== "NúmeroDeSerie" ? (
                                    <input type="text" id={styles.input_text} value={value} onChange={e => handleChange(e, key)} />
                                ) : (
                                    <p>{value}</p>
                                )}
                            </div>
                        ))}
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            {isEditing ? (
                                <>
                                    <button className={styles.edit_button} onClick={handleConfirmEdit}>CONFIRMAR</button>
                                </>
                            ) : (
                                <>
                                    <button className={styles.edit_button} onClick={handleEdit}>EDITAR</button>
                                    <button className={styles.remove_button} onClick={confirmRemove}>DESATIVAR</button>
                                    <button className={styles.remove_button} onClick={handleRelatorio}>RELATÓRIO</button>
                                </>
                            )}
                        </div>
                    </div>
                    {showEditado && <EditadoComponent />}
                    {showConfirmacao && <ConfirmarRemocaoComponent onConfirm={handleConfirmRemove} onCancel={cancelRemove} />}
                </div>
            </div>
        </>
    );
};

export default ModalFerramentasComponent;
