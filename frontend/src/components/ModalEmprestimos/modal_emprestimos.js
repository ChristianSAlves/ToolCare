import React, { useState, useEffect } from "react";
import styles from "./modal_emprestimos.module.css";
import EditadoComponent from "../Avisos/Editado/editado";
import RemovidoComponent from "../Avisos/Removido/removido";
import ConfirmarRemocaoComponent from "../Avisos/ConfirmarRemoção/confirmar_remocao";
import FalhaEdicaoComponent from "../Avisos/FalhaEdição/falha_edicao";
import FalhaRemocaoComponent from "../Avisos/FalhaRemoção/falha_remocao";

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const ModalEmprestimoComponent = ({ onClose, emprestimo, onShowModal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showEditado, setShowEditado] = useState(false);
    const [showRemovido, setShowRemovido] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const [showFalhaRemocao, setShowFalhaRemocao] = useState(false);
    const [nomeFerramenta, setNomeFerramenta] = useState('Carregando...');
    const [nomeFuncionario, setNomeFuncionario] = useState('Carregando...');
    const [editData, setEditData] = useState({
        DataEmprestimo: '',
        DataDevolucao: '',
        Observacoes: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const numSerie = extractIdFromUrl(emprestimo.numSerie);
        const matriculaFuncionario = extractIdFromUrl(emprestimo.matriculaFuncionario);

        const fetchFerramenta = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/ferramentas/${numSerie}/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Erro ao carregar a ferramenta');
                }
                const data = await response.json();
                setNomeFerramenta(data.nome);
            } catch (error) {
                console.error('Erro:', error);
                setNomeFerramenta('Erro ao carregar');
            }
        };

        const fetchFuncionario = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/funcionarios/${matriculaFuncionario}/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Erro ao carregar o funcionário');
                }
                const data = await response.json();
                setNomeFuncionario(data.nome);
            } catch (error) {
                console.error('Erro:', error);
                setNomeFuncionario('Erro ao carregar');
            }
        };

        fetchFerramenta();
        fetchFuncionario();

        setEditData({
            DataEmprestimo: emprestimo.dataEmprestimo,
            DataDevolucao: emprestimo.dataDevolucao,
            Observacoes: emprestimo.observacoes,
        });
    }, [emprestimo]);

    const handleChange = (event, field) => {
        const value = event.target.value;
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        const token = localStorage.getItem('token');
        try {
            const url = `http://127.0.0.1:8000/emprestimos/${emprestimo.codigoEmprestimo}/`;
            const formData = new FormData();
            formData.append('dataEmprestimo', editData.DataEmprestimo);
            formData.append('dataDevolucao', editData.DataDevolucao);
            formData.append('observacoes', editData.Observacoes);

            const response = await fetch(url, {
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
                    onClose();
                    if (onShowModal) onShowModal(false);
                }, 3000);
            } else {
                const errorData = await response.json();
                console.error('Erro ao atualizar o empréstimo:', errorData);
                setShowFalhaEdicao(true);
                setTimeout(() => {
                    setShowFalhaEdicao(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao atualizar o empréstimo:', error);
            setShowFalhaEdicao(true);
            setTimeout(() => {
                setShowFalhaEdicao(false);
            }, 3000);
        }

        setIsEditing(false);
    };

    const handleRemove = () => {
        setShowConfirmacao(true);
    };

    const confirmRemove = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://127.0.0.1:8000/emprestimos/${emprestimo.codigoEmprestimo}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                setShowRemovido(true);
                setTimeout(() => {
                    setShowRemovido(false);
                    onClose();
                    if (onShowModal) onShowModal(false);
                }, 3000);
            } else {
                console.error('Falha ao remover o empréstimo. Por favor, tente novamente.');
                setShowFalhaRemocao(true);
                setTimeout(() => {
                    setShowFalhaRemocao(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao remover o empréstimo:', error);
            setShowFalhaRemocao(true);
            setTimeout(() => {
                setShowFalhaRemocao(false);
            }, 3000);
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
                            <span className={styles.label}>Código do Empréstimo</span>
                            <p>{emprestimo.codigoEmprestimo}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Nome da Ferramenta</span>
                            <p>{nomeFerramenta}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Nome do Funcionário</span>
                            <p>{nomeFuncionario}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data de Empréstimo</span>
                            {isEditing ? (
                                <input type="date" id={styles.input_text} value={editData.DataEmprestimo} onChange={e => handleChange(e, 'DataEmprestimo')} />
                            ) : (
                                <p>{editData.DataEmprestimo}</p>
                            )}
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data de Devolução</span>
                            {isEditing ? (
                                <input type="date" id={styles.input_text} value={editData.DataDevolucao} onChange={e => handleChange(e, 'DataDevolucao')} />
                            ) : (
                                <p>{editData.DataDevolucao}</p>
                            )}
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Observações</span>
                            {isEditing ? (
                                <textarea id={styles.textarea} value={editData.Observacoes} onChange={e => handleChange(e, 'Observacoes')}></textarea>
                            ) : (
                                <p>{editData.Observacoes}</p>
                            )}
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            {isEditing ? (
                                <button className={styles.edit_button} onClick={handleConfirmEdit}>CONFIRMAR</button>
                            ) : (
                                <>
                                    <button className={styles.edit_button} onClick={handleEdit}>EDITAR</button>
                                    <button className={styles.remove_button} onClick={handleRemove}>DESATIVAR</button>
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

export default ModalEmprestimoComponent;
