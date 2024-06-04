import React, { useEffect, useState } from "react";
import styles from "./card_emprestimos.module.css";

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const CardEmprestimosComponent = ({ emprestimo, onShowModal }) => {
    const [codFerramenta, setCodigoFerramenta] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [idFuncionario, setCodigoFuncionario] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        if (emprestimo && emprestimo.codFerramenta) {
            setCodigoFerramenta(extractIdFromUrl(emprestimo.codFerramenta));
        }
    }, [emprestimo]);

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
                        <p className={`${styles.codigoManutencao} ${styles.list_item}`}>{`Empréstimo ${emprestimo.codigoEmprestimo}`}</p>
                        <div id={styles.card_item}>
                            <p className={`${styles.nomeFerramenta} ${styles.list_item}`}>
                                {ferramentas.length > 0 
                                    ? ferramentas.find(ferramenta => ferramenta.numSerie
                                        .toString() === codFerramenta)?.nome 
                                    : 'Carregando...'}
                            </p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={() => onShowModal(emprestimo)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardEmprestimosComponent;
