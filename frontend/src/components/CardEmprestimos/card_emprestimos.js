import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModalEmprestimosComponent from "../ModalEmprestimos/modal_emprestimos";
import ModalEmprestimosInativosComponent from "../ModalEmprestimosInativos/modal_emprestimos_inativos";
import styles from "./card_emprestimos.module.css";

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const CardEmprestimosComponent = ({ emprestimo }) => {
    const [nomeFerramenta, setNomeFerramenta] = useState('Ferramenta');
    const [matriculaFuncionario, setMatriculaFuncionario] = useState('Funcionario');
    const [showModal, setShowModal] = useState(false);

    const location = useLocation();

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
                setMatriculaFuncionario(data.nome);
            } catch (error) {
                console.error('Erro:', error);
                setMatriculaFuncionario('Erro ao carregar');
            }
        };

        fetchFerramenta();
        fetchFuncionario();
    }, [emprestimo.numSerie, emprestimo.matriculaFuncionario]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const isEmprestimoPage = location.pathname === "/emprestimo";

    return (
        <div id={styles.card}>
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.codigoEmprestimo} ${styles.list_item} ${styles.list_tittle}`}>{`Empréstimo ${emprestimo.codigoEmprestimo}`}</p>
                        <div id={styles.card_item}>
                            <p className={`${styles.nomeFerramenta} ${styles.list_item}`}>{nomeFerramenta}</p>
                            <p className={`${styles.nomeFuncionario} ${styles.list_item}`}>{matriculaFuncionario}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={handleShowModal}>VER MAIS</button>
            </div>
            {showModal && isEmprestimoPage && (
                <ModalEmprestimosComponent
                    onClose={handleCloseModal}
                    emprestimo={emprestimo}
                />
            )}
            {showModal && !isEmprestimoPage && (
                <ModalEmprestimosInativosComponent
                    onClose={handleCloseModal}
                    emprestimo={emprestimo}
                />
            )}
        </div>
    );
};

export default CardEmprestimosComponent;
