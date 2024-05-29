import React, { useState } from "react";
import styles from "./modal_cargos.module.css";
import EditadoComponent from "../Avisos/Editado/editado";
import RemovidoComponent from "../Avisos/Removido/removido";
import ConfirmarRemocaoComponent from "../Avisos/ConfirmarRemoção/confirmar_remocao";
import FalhaEdicaoComponent from "../Avisos/FalhaEdição/falha_edicao";
import FalhaRemocaoComponent from "../Avisos/FalhaRemoção/falha_remocao";

const ModalCargosComponent = ({ onClose, cargo, onShowModal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showEditado, setShowEditado] = useState(false);
    const [showRemovido, setShowRemovido] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const [showFalhaRemocao, setShowFalhaRemocao] = useState(false);
    const [editData, setEditData] = useState({
        Nome: cargo.nomeCargo,
        Descricao: cargo.descricaoCargo,
    });

    const time = 3000;
    const timeRemovido = 3000;

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        const token = localStorage.getItem('token');
        let response;

        try {
            const formData = new FormData();
            formData.append('descricao', editData.Descricao);

            response = await fetch(`http://127.0.0.1:8000/cargos/${cargo.idCargo}/`, {
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
                console.error('Erro ao atualizar o cargo:', errorData);
                setShowFalhaEdicao(true);
                setTimeout(() => {
                    setShowFalhaEdicao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao atualizar o cargo:', error);
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

    const handleRemove = () => {
        setShowConfirmacao(true);
    };

    const confirmRemove = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://127.0.0.1:8000/cargos/${cargo.idCargo}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                setShowRemovido(true);
                setTimeout(() => {
                    setShowRemovido(false);
                    onClose(); // Fechar o modal após a remoção
                    if (onShowModal) onShowModal(false); // Atualiza o estado do modal no componente pai, se necessário
                }, timeRemovido);
            } else {
                console.error('Falha ao remover o cargo. Por favor, tente novamente.');
                setShowFalhaRemocao(true);
                setTimeout(() => {
                    setShowFalhaRemocao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao remover o cargo:', error);
            setShowFalhaRemocao(true);
            setTimeout(() => {
                setShowFalhaRemocao(false);
            }, time);
        }

        setShowConfirmacao(false);
    };

    const cancelRemove = () => {
        setShowConfirmacao(false);
    };

    return (
        <>
            {showRemovido && <RemovidoComponent />}
            {showFalhaEdicao && <FalhaEdicaoComponent />}
            {showFalhaRemocao && <FalhaRemocaoComponent />}
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={styles.modal_content}>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Nome</span>
                            <p>{editData.Nome}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Descrição</span>
                            {isEditing ? (
                                <input type="text" id={styles.input_text} value={editData.Descricao} onChange={e => handleChange(e, 'Descricao')} />
                            ) : (
                                <p>{editData.Descricao}</p>
                            )}
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            {isEditing ? (
                                <>
                                    <button className={styles.edit_button} onClick={handleConfirmEdit}>CONFIRMAR</button>
                                </>
                            ) : (
                                <>
                                    <button className={styles.edit_button} onClick={handleEdit}>EDITAR</button>
                                    <button className={styles.remove_button} onClick={handleRemove}>REMOVER</button>
                                </>
                            )}
                        </div>
                    </div>
                    {showEditado && <EditadoComponent />}
                    {showConfirmacao && <ConfirmarRemocaoComponent onConfirm={confirmRemove} onCancel={cancelRemove} />}
                </div>
            </div>
        </>
    );
};

export default ModalCargosComponent;
