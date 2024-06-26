import React, { useState, useEffect } from "react";
import styles from "./modal_emprestimos_inativos.module.css";
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

const ModalEmprestimosInativosComponent = ({ onClose, emprestimo }) => {
    const [editData, setEditData] = useState({
        DataEmprestimo: '',
        DataDevolucao: '',
        Observacoes: '',
    });

    const [nomeFerramenta, setNomeFerramenta] = useState('');
    const [nomeFuncionario, setNomeFuncionario] = useState('');
    const { apiUrl } = useApi();

    useEffect(() => {
        if (emprestimo) {
            setEditData({
                DataEmprestimo: formatDate(emprestimo.dataEmprestimo) || '',
                DataDevolucao: emprestimo.dataDevolucao ? formatDate(emprestimo.dataDevolucao) : '',
                Observacoes: emprestimo.observacoes || '',
            });
        }

        const token = localStorage.getItem('token');
        const numSerie = extractIdFromUrl(emprestimo.numSerie);
        const matriculaFuncionario = extractIdFromUrl(emprestimo.matriculaFuncionario);

        const fetchFerramenta = async () => {
            try {
                const response = await fetch(`${apiUrl}/ferramentas/${numSerie}/`, {
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
                const response = await fetch(`${apiUrl}/funcionarios/${matriculaFuncionario}/`, {
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
    }, [emprestimo, apiUrl]); 

    if (!emprestimo) {
        return null;
    }

    return (
        <>
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={styles.modal_content}>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Funcionário</span>
                            <p>{nomeFuncionario}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Ferramenta</span>
                            <p>{nomeFerramenta}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data Empréstimo</span>
                            <p>{editData.DataEmprestimo}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data Devolução</span>
                            <p>{editData.DataDevolucao}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Observações</span>
                            <p>{editData.Observacoes}</p>
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalEmprestimosInativosComponent;
