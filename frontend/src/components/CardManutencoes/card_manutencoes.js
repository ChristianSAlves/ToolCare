import React, { useEffect, useState } from "react";
import styles from "./card_manutencoes.module.css";

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const CardManutencoesComponent = ({ manutencao, onShowModal }) => {
    const [codFerramenta, setCodigoFerramenta] = useState('');
    const [ferramentas, setFerramentas] = useState([]);

    useEffect(() => {
        if (manutencao && manutencao.codFerramenta) {
            setCodigoFerramenta(extractIdFromUrl(manutencao.codFerramenta));
        }
    }, [manutencao]);

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
                    throw new Error('Erro ao carregar a ferramenta');
                }
                const dataFerramentas = await responseFerramentas.json();
                setFerramentas(dataFerramentas);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div id={styles.card}>
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.codigoManutencao} ${`${styles.list_item} ${styles.list_tittle}`}`}>{`Manutenção ${manutencao.codigoManutencao}`}</p>
                        <div id={styles.card_item}>
                            <p className={`${styles.tipoManutencao} ${styles.list_item}`}>{manutencao.tipoManutencao}</p>
                            <p className={`${styles.nomeFerramenta} ${styles.list_item}`}>{ferramentas.length > 0 ? ferramentas.find(ferramenta => ferramenta.codFerramenta === parseInt(codFerramenta))?.nome : 'Carregando...'}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={() => onShowModal(manutencao)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardManutencoesComponent;
