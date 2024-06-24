import React, { useState, useEffect, useCallback } from 'react';
import styles from '../Emprestimo/emprestimo_inativo.module.css';
import MenuInativosComponent from '../../../components/MenuInativos/MenuInativos.js';
import CardEmprestimosComponent from '../../../components/CardEmprestimos/card_emprestimos';
import ModalFerramentasComponent from '../../../components/ModalFerramentas/modal_ferramentas';
import { useApi } from '../../../../src/ApiContext.js';

const EmprestimoInativo = () => {
    const [search, setSearch] = useState('');
    const [emprestimos, setEmprestimos] = useState([]);
    const [filteredEmprestimos, setFilteredEmprestimos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmprestimo, setSelectedEmprestimo] = useState(null);

    const { apiUrl } = useApi();

    const fetchEmprestimos = useCallback(async () => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        try {
            const response = await fetch(`${apiUrl}/emprestimos/`, {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar os Emprestimos');
            }

            const data = await response.json();
            const filteredData = data.filter(emprestimo => emprestimo.dataDevolucao !== null);
            setEmprestimos(filteredData);
            setFilteredEmprestimos(filteredData);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [apiUrl]);

    const fetchNome = useCallback(async (url, token) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar o nome');
            }
            const data = await response.json();
            return data.nome;
        } catch (error) {
            console.error('Erro:', error);
            return '';
        }
    }, []);

    useEffect(() => {
        fetchEmprestimos();
    }, [fetchEmprestimos]);

    useEffect(() => {
        const filterEmprestimos = async () => {
            const token = localStorage.getItem('token');
            const filtered = await Promise.all(
                emprestimos.map(async (emprestimo) => {
                    const nomeFerramenta = await fetchNome(`${apiUrl}/ferramentas/${emprestimo.numSerie}/`, token);
                    const nomeFuncionario = await fetchNome(`${apiUrl}/funcionarios/${emprestimo.matriculaFuncionario}/`, token);

                    return {
                        ...emprestimo,
                        nomeFerramenta,
                        nomeFuncionario
                    };
                })
            );

            const result = filtered.filter(emprestimo => {
                const codigoEmprestimoMatch = emprestimo.codigoEmprestimo.toString().includes(search);

                return (codigoEmprestimoMatch) && emprestimo.dataDevolucao !== null;
            });

            setFilteredEmprestimos(result);
        };

        filterEmprestimos();
    }, [search, emprestimos, fetchNome, apiUrl]);

    const defaultFerramenta = 'url_to_default_image';
    const toggleModal = (emprestimo) => {
        setSelectedEmprestimo(emprestimo);
        setShowModal(!showModal);
    };

    return (
        <div id={styles.div_emprestimo}>
            <MenuInativosComponent id="menu" />
            <div id={styles.searchbar}>
                <input
                    id={styles.input_searchbar}
                    className="conteudo_searchbar"
                    type='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className={styles.div_pai}>
                <div className={styles.card_container}>
                    {filteredEmprestimos.map((emprestimo, index) => (
                        <CardEmprestimosComponent
                            key={emprestimo.codigoEmprestimo ? emprestimo.codigoEmprestimo : index} 
                            emprestimo={emprestimo} 
                            defaultFerramenta={defaultFerramenta} 
                            onShowModal={() => toggleModal(emprestimo)}
                        />
                    ))}
                </div>
            </div>
            {showModal && <ModalFerramentasComponent onClose={toggleModal} ferramenta={selectedEmprestimo} />}
        </div>
    );
}

export default EmprestimoInativo;
