import React, { useState, useEffect } from "react";
import styles from "./modal_manutencoes.module.css";
import FinalizadoComponent from "../Avisos/Finalizado/finalizado";
import { useApi } from '../../../src/ApiContext.js';

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const ModalManutencaoComponent = ({ onClose, manutencao, onShowModal, onEdit }) => {
    const [showEditado, setShowEditado] = useState(false);
    const [showFalhaRemocao, setShowFalhaRemocao] = useState(false);
    const [codigoFerramenta, setCodigoFerramenta] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [editData, setEditData] = useState({
        CodigoFerramenta: manutencao.codFerramenta || '',
        TipoDeManutencao: manutencao.tipoManutencao || '',
        DataInicio: formatDate(manutencao.dataInicio) || '',
        DataFim: formatDate(manutencao.dataFim) || '',
    });
    const { apiUrl } = useApi();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const responseFerramentas = await fetch(`${apiUrl}/ferramentas/`, {
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
    }, [apiUrl]); // Adicionando apiUrl como dependência

    useEffect(() => {
        if (manutencao && manutencao.codFerramenta) {
            setCodigoFerramenta(extractIdFromUrl(manutencao.codFerramenta));
        }
    }, [manutencao]);

    const handleRemove = async () => {
        const token = localStorage.getItem('token');
        const today = new Date().toISOString().split('T')[0];
        try {
            const url = `${apiUrl}/manutencoes/${manutencao.codigoManutencao}/`;

            const formData = new FormData();
            formData.append('codigoManutencao', manutencao.codigoManutencao);
            formData.append('codFerramenta', manutencao.codFerramenta);
            formData.append('tipoManutencao', manutencao.tipoManutencao);
            formData.append('dataInicio', manutencao.dataInicio);
            formData.append('dataFinal', today);

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setShowEditado(true);
                if (onEdit) onEdit(); // Chama a função para recarregar a lista de manutenções após edição
                setTimeout(() => {
                    setShowEditado(false);
                    onClose();
                    if (onShowModal) onShowModal(false);
                }, 3000);
            } else {
                const errorData = await response.json();
                console.error('Erro ao finalizar a manutenção:', errorData);
                setShowFalhaRemocao(true);
                setTimeout(() => {
                    setShowFalhaRemocao(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao finalizar a manutenção:', error);
            setShowFalhaRemocao(true);
            setTimeout(() => {
                setShowFalhaRemocao(false);
            }, 3000);
        }
    };

    return (
        <>
            {showEditado && <FinalizadoComponent />}
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={styles.modal_content}>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Ferramenta</span>
                            <p>{ferramentas.length > 0 ? ferramentas.find(ferramenta => ferramenta.codFerramenta === parseInt(codigoFerramenta))?.nome : ''}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Tipo</span>
                            <p>{editData.TipoDeManutencao}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data Início</span>
                            <p>{editData.DataInicio}</p>
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            <button className={styles.remove_button} onClick={handleRemove}>FINALIZAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalManutencaoComponent;