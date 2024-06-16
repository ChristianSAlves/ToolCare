import React, { useState, useEffect } from 'react';
import styles from '../Emprestimo/emprestimo_inativo.module.css';
import MenuInativosComponent from '../../../components/MenuInativos/MenuInativos.js';
import CardEmprestimosComponent from '../../../components/CardEmprestimos/card_emprestimos';
import ModalFerramentasComponent from '../../../components/ModalFerramentas/modal_ferramentas';
import { Link } from 'react-router-dom';

const Emprestimo = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [Emprestimos, setEmprestimos] = useState([]);
    const [showModal, setShowModal] = useState(false);  // Estado para controle da visibilidade do modal
    const [selectedEmprestimo, setSelectedEmprestimo] = useState(null);

    const filterEmprestimos = async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token');
        try {
            const responseEmprestimos = await fetch('http://127.0.0.1:8000/emprestimos/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
    
            if (!responseEmprestimos.ok) {
                throw new Error('Erro ao carregar os Emprestimos');
            }
    
            const dataEmprestimos = await responseEmprestimos.json();
            {/*let filteredEmprestimos = dataEmprestimos.filter(emprestimo => 
                (newSelectedOption === 'nomeFuncionario' && emprestimo.codigoEmprestimo.toLowerCase().includes(newSearch.toLowerCase())) ||
                (newSelectedOption === 'nomeFerramenta' && emprestimo.codigoEmprestimo.toLowerCase().includes(newSearch.toLowerCase()))||
                (!newSelectedOption && (emprestimo.numSerie.toLowerCase().includes(newSearch.toLowerCase()) ||
            emprestimo.nome.toLowerCase().includes(newSearch.toLowerCase())))
            );
    
        setEmprestimos(filteredEmprestimos);*/}
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        const fetchData = async () => {
            try {
            
                const responseEmprestimos = await fetch('http://127.0.0.1:8000/emprestimos/', {
                    headers: {
                        'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                    },
                });
                if (!responseEmprestimos.ok) {
                    throw new Error('Erro ao carregar os Emprestimos');
                }
                const dataEmprestimos = await responseEmprestimos.json();
                setEmprestimos(dataEmprestimos);              
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        filterEmprestimos(search, selectedOption);
    }, [search, selectedOption]);

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
                {/*<p
                    id={styles.filtro}
                    onClick={() => setShowOptions(!showOptions)}
                    className="conteudo_searchbar"
                >Filtro</p>
                {showOptions && (
                    <div className={styles.options_box}>
                        <div className={styles.option_row}>
                            <label htmlFor="radio_nome" className={styles.label_searchbar}>Nome</label>
                            <input
                                id="radio_nome"
                                className={styles.radio}
                                type="radio"
                                name="option"
                                value="nome"
                                checked={selectedOption === 'nome'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                        </div>
                        <div className={styles.option_row}>
                            <label htmlFor="radio_num_serie" className={styles.label_searchbar}>Número de série</label>
                            <input
                                id="radio_num_serie"
                                className={styles.radio}
                                type="radio"
                                name="option"
                                value="num_serie"
                                checked={selectedOption === 'num_serie'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                        </div>
                        <div className={styles.option_row}>
                            <label htmlFor="radio_status" className={styles.label_searchbar}>Status</label>
                            <input
                                id="radio_status"
                                className={styles.radio}
                                type="radio"
                                name="option"
                                value="status"
                                checked={selectedOption === 'status'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                        </div>
                    </div>
                )}*/}
            </div>
            <div className={styles.div_pai}>
                <div className={styles.card_container}>
                    {Emprestimos.map((emprestimo, index) => (
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

export default Emprestimo;