import React, { useState } from "react";
import styles from "./modal_funcionarios.module.css";
import logo from "../../assets/imagens/logo.png";
import EditadoComponent from "../Avisos/Editado/editado";
import RemovidoComponent from "../Avisos/Removido/removido";
import ConfirmarRemocaoComponent from "../Avisos/ConfirmarRemoção/confirmar_remocao";
import FalhaEdicaoComponent from "../Avisos/FalhaEdição/falha_edicao";
import FalhaRemocaoComponent from "../Avisos/FalhaRemoção/falha_remocao";

const ModalFuncionariosComponent = ({ onClose, funcionario, onShowModal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showEditado, setShowEditado] = useState(false);
    const [showRemovido, setShowRemovido] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const [showFalhaRemocao, setShowFalhaRemocao] = useState(false);
    const [editData, setEditData] = useState({
        Nome: funcionario.nome,
        Matrícula: funcionario.matriculaFuncionario,
        CPF: funcionario.cpf,
        /*Setor: funcionario.setor, // Alterado para usar 'setor' diretamente
        Cargo: funcionario.cargo, // Alterado para usar 'cargo' diretamente*/

    });

    const time = 3000;
    const timeRemovido = 3000;

    console.log(funcionario.setor, funcionario.codigoCargo, funcionario.nome);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        const token = localStorage.getItem('token');
        let response;

        try {
            const formData = new FormData();
            formData.append('nome', editData.Nome);
            formData.append('matriculaFuncionario', editData.Matrícula);
            formData.append('cpf', editData.CPF);
            formData.append('setor', editData.Setor);
            formData.append('cargo', editData.Cargo);

            response = await fetch(`http://127.0.0.1:8000/funcionarios/${funcionario.codFuncionario}/`, {
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
                console.error('Erro ao atualizar o funcionario:', errorData);
                setShowFalhaEdicao(true);
                setTimeout(() => {
                    setShowFalhaEdicao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao atualizar o funcionario:', error);
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
            const response = await fetch(`http://127.0.0.1:8000/funcionarios/${funcionario.codFuncionario}/`, {
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
                console.error('Falha ao remover o funcionario. Por favor, tente novamente.');
                setShowFalhaRemocao(true);
                setTimeout(() => {
                    setShowFalhaRemocao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao remover o funcionario:', error);
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
                    <div id={styles.fundo_img}>
                        <img src={funcionario.imgFunc || logo} className={styles.modal_image} alt="Imagem de funcionário" />
                    </div>
                    <div className={styles.modal_content}>
                        {Object.entries(editData).map(([key, value]) => (
                            <div className={styles.info_row} key={key}>
                                <span className={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                {isEditing && key !== "Matrícula" ? (
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

export default ModalFuncionariosComponent;
