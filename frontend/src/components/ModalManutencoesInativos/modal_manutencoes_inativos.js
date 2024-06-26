import React, { useState, useEffect } from "react";
import styles from "./modal_manutencoes_inativos.module.css";
import { useApi } from '../../../src/ApiContext.js'

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

const ModalManutencaoInativoComponent = ({ onClose, manutencao }) => {
    const [codigoFerramenta, setCodigoFerramenta] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [editData, setEditData] = useState({
        CodigoFerramenta: manutencao.codFerramenta || '',
        TipoDeManutencao: manutencao.tipoManutencao || '',
        DataInicio: formatDate(manutencao.dataInicio) || '',
        DataFim: formatDate(manutencao.dataFinal) || '',
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
    }, [apiUrl]);

    useEffect(() => {
        if (manutencao && manutencao.codFerramenta) {
            setCodigoFerramenta(extractIdFromUrl(manutencao.codFerramenta));
        }
    }, [manutencao]);

    return (
        <>
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
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data Fim</span>
                            <p>{editData.DataFim}</p>
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalManutencaoInativoComponent;