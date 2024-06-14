import React, { useState, useEffect } from "react";
import styles from "./modal_manutencoes.module.css";
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

const ModalManutencaoComponent = ({ onClose, manutencao, onShowModal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showEditado, setShowEditado] = useState(false);
    const [showRemovido, setShowRemovido] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const [showFalhaRemocao, setShowFalhaRemocao] = useState(false);
    const [codigoFerramenta, setCodigoFerramenta] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [editData, setEditData] = useState({
        TipoDeManutencao: manutencao.tipoManutencao || '',
        DataInicio: manutencao.dataInicio || '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const responseFerramentas = await fetch('http://127.0.0.1:8000/ferramentas/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseFerramentas.ok) {
                    throw new Error('Erro ao carregar as ferramentas');
                }
                const dataFerramentas = await responseFerramentas.json();
                setFerramentas(dataFerramentas);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (manutencao && manutencao.codFerramenta) {
            setCodigoFerramenta(extractIdFromUrl(manutencao.codFerramenta));
        }
    }, [manutencao]);

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
            const url = `http://127.0.0.1:8000/manutencoes/${manutencao.codigoManutencao}/`;
            const linkFerramenta = `http://127.0.0.1:8000/ferramentas/${codigoFerramenta}/`;

            const formData = new FormData();
            formData.append('tipoManutencao', editData.TipoDeManutencao);
            formData.append('codigoFerramenta', linkFerramenta);

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
                console.error('Erro ao atualizar a manutenção:', errorData);
                setShowFalhaEdicao(true);
                setTimeout(() => {
                    setShowFalhaEdicao(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao atualizar a manutenção:', error);
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
            const response = await fetch(`http://127.0.0.1:8000/manutencoes/${manutencao.codigoManutencao}/`, {
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
                console.error('Falha ao remover a manutenção. Por favor, tente novamente.');
                setShowFalhaRemocao(true);
                setTimeout(() => {
                    setShowFalhaRemocao(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao remover a manutenção:', error);
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
                            <span className={styles.label}>Nome da Ferramenta</span>
                            <p>{ferramentas.length > 0 ? ferramentas.find(ferramenta => ferramenta.codFerramenta === parseInt(codigoFerramenta))?.nome : 'Carregando...'}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Tipo de Manutenção</span>
                            {isEditing ? (
                                <select
                                    className={styles.select}
                                    name="tipoManutencao"
                                    id="tipoManutencao"
                                    value={editData.TipoDeManutencao}
                                    onChange={e => handleChange(e, 'TipoDeManutencao')}
                                >
                                    <option value="Corretiva">Corretiva</option>
                                    <option value="Preventiva">Preventiva</option>
                                </select>
                            ) : (
                                <p>{editData.TipoDeManutencao}</p>
                            )}
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data Início</span>
                            <p>{editData.DataInicio}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data Fim</span>
                            <p>{editData.DataFim}</p>
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            {isEditing ? (
                                <button className={styles.edit_button} onClick={handleConfirmEdit}>CONFIRMAR</button>
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

export default ModalManutencaoComponent;
