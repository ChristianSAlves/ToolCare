import React, { useState, useEffect } from 'react';
import styles from '../Emprestimo/emprestimo.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CardEmprestimosComponent from '../../../components/CardEmprestimos/card_emprestimos';
import ModalEmprestimosComponent from '../../../components/ModalEmprestimos/modal_emprestimos.js';
import { Link } from 'react-router-dom';

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const Emprestimo = () => {
    const [search, setSearch] = useState('');
    const [emprestimos, setEmprestimos] = useState([]);
    const [filteredEmprestimos, setFilteredEmprestimos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmprestimo, setSelectedEmprestimo] = useState(null);

    const fetchEmprestimos = async () => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        try {
            const response = await fetch('http://127.0.0.1:8000/emprestimos/', {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar os Emprestimos');
            }

            const data = await response.json();
            setEmprestimos(data.filter(emprestimo => emprestimo.dataDevolucao === null));
            setFilteredEmprestimos(data.filter(emprestimo => emprestimo.dataDevolucao === null));
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const fetchNome = async (url, token) => {
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
    };

    useEffect(() => {
        fetchEmprestimos();
    }, []);

    useEffect(() => {
        const filterEmprestimos = async () => {
            const token = localStorage.getItem('token');
            const filtered = await Promise.all(
                emprestimos.map(async (emprestimo) => {
                    const nomeFerramenta = await fetchNome(`http://127.0.0.1:8000/ferramentas/${extractIdFromUrl(emprestimo.numSerie)}/`, token);
                    const nomeFuncionario = await fetchNome(`http://127.0.0.1:8000/funcionarios/${extractIdFromUrl(emprestimo.matriculaFuncionario)}/`, token);

                    return {
                        ...emprestimo,
                        nomeFerramenta,
                        nomeFuncionario
                    };
                })
            );

            const result = filtered.filter(emprestimo => {
                const searchLower = search.toLowerCase();
                const codigoEmprestimoMatch = emprestimo.codigoEmprestimo.toString().includes(searchLower);
                const emprestimoStringMatch = `emprestimo ${emprestimo.codigoEmprestimo}`.toLowerCase().includes(searchLower);
                const emprestimoAcentoStringMatch = `empréstimo ${emprestimo.codigoEmprestimo}`.toLowerCase().includes(searchLower);
                const nomeFuncionarioMatch = emprestimo.nomeFuncionario.toLowerCase().includes(searchLower);
                const nomeFerramentaMatch = emprestimo.nomeFerramenta.toLowerCase().includes(searchLower);

                return (
                    codigoEmprestimoMatch || 
                    emprestimoStringMatch || 
                    emprestimoAcentoStringMatch || 
                    nomeFuncionarioMatch || 
                    nomeFerramentaMatch
                ) && emprestimo.dataDevolucao === null;
            });

            setFilteredEmprestimos(result);
        };

        filterEmprestimos();
    }, [search, emprestimos]);

    const defaultFerramenta = 'url_to_default_image';
    const toggleModal = (emprestimo) => {
        setSelectedEmprestimo(emprestimo);
        setShowModal(!showModal);
    };

    return (
        <div id={styles.div_emprestimo}>
            <MenuComponent id="menu" />
            <Link to={'/emprestimo_cadastro'}>
                <p id={styles.adicionar}>+</p>
            </Link>
            <div id={styles.searchbar}>
                <input
                    id={styles.input_searchbar}
                    className="conteudo_searchbar"
                    type='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por código, número de série, nome do funcionário ou nome da ferramenta"
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
            {showModal && <ModalEmprestimosComponent onClose={toggleModal} emprestimo={selectedEmprestimo} />}
        </div>
    );
}

export default Emprestimo;
