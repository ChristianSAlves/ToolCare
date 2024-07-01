import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ModalManutencaoComponent from "../ModalManutencoes/modal_manutencoes";
import ModalManutencaoInativoComponent from "../ModalManutencoesInativos/modal_manutencoes_inativos";
import styles from "./card_manutencoes.module.css";

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const CardManutencoesComponent = ({ manutencao }) => {
    const [codFerramenta, setCodigoFerramenta] = useState('Ferramenta');
    const [ferramentas, setFerramentas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (manutencao && manutencao.codFerramenta) {
            setCodigoFerramenta(extractIdFromUrl(manutencao.codFerramenta));
        }
    }, [manutencao]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const responseFerramentas = await fetch('http://192.168.7.17:8000/ferramentas/', {
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

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isManutencaoPage = location.pathname === "/manutencao";

    return (
        <div id={styles.card}>
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.codigoManutencao} ${styles.list_item} ${styles.list_tittle}`}>{`Manutenção ${manutencao.codigoManutencao}`}</p>
                        <div id={styles.card_item}>
                            <p className={`${styles.tipoManutencao} ${styles.list_item}`}>{manutencao.tipoManutencao}</p>
                            <p className={`${styles.nomeFerramenta} ${styles.list_item}`}>{ferramentas.length > 0 ? ferramentas.find(ferramenta => ferramenta.codFerramenta === parseInt(codFerramenta))?.nome : 'Carregando...'}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={handleShowModal}>VER MAIS</button>
            </div>
            {showModal && isManutencaoPage && (
                <ModalManutencaoComponent
                    onClose={handleCloseModal}
                    manutencao={manutencao}
                />
            )}
            {showModal && !isManutencaoPage && (
                <ModalManutencaoInativoComponent
                    onClose={handleCloseModal}
                    manutencao={manutencao}
                />
            )}
        </div>
    );
};

export default CardManutencoesComponent;
