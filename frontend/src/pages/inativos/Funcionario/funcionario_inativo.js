import React, { useState, useEffect } from 'react';
import styles from './funcionario_inativo.module.css';
import MenuInativosComponent from '../../../components/MenuInativos/MenuInativos.js';
import CardFuncionarios from '../../../components/CardFuncionarios/card_funcionarios';
import ModalFuncionariosComponent from '../../../components/ModalFuncionarios/modal_funcionarios';
import { Link } from 'react-router-dom';

const Funcionario = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [Funcionarios, setFuncionarios] = useState([]);
    const [showModal, setShowModal] = useState(false);  // Estado para controle da visibilidade do modal
    const [selectedFuncionario, setSelectedFuncionario] = useState(null);

    const filterFuncionarios = async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage

        try {
            const responseFuncionarios = await fetch('http://127.0.0.1:8000/funcionarios/', {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });

            if (!responseFuncionarios.ok) {
                throw new Error('Erro ao carregar os Funcionarios');
            }

            const dataFuncionarios = await responseFuncionarios.json();
            
            // Filtrando apenas os funcionários com status igual a false
            let filteredFuncionarios = dataFuncionarios.filter(funcionario => funcionario.status === false);

            if (newSelectedOption === 'nome') {
                filteredFuncionarios = filteredFuncionarios.filter(funcionario => funcionario.nome.toLowerCase().includes(newSearch.toLowerCase()));
            } else if (newSelectedOption === 'matriculaFuncionario') {
                filteredFuncionarios = filteredFuncionarios.filter(funcionario => funcionario.matriculaFuncionario.toLowerCase().includes(newSearch.toLowerCase()));
            } else if (newSelectedOption === 'cpf') {
                filteredFuncionarios = filteredFuncionarios.filter(funcionario => funcionario.cpf.toLowerCase().includes(newSearch.toLowerCase()));
            } else if (newSearch) {
                filteredFuncionarios = filteredFuncionarios.filter(funcionario =>
                    funcionario.matriculaFuncionario.toLowerCase().includes(newSearch.toLowerCase()) ||
                    funcionario.nome.toLowerCase().includes(newSearch.toLowerCase()) ||
                    funcionario.cpf.toLowerCase().includes(newSearch.toLowerCase())
                );
            }

            setFuncionarios(filteredFuncionarios);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const fetchData = async () => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        try {
            // Busca os funcionarios
            const responseFuncionarios = await fetch('http://127.0.0.1:8000/funcionarios/', {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });
            if (!responseFuncionarios.ok) {
                throw new Error('Erro ao carregar os Funcionarios');
            }
            const dataFuncionarios = await responseFuncionarios.json();
            
            // Filtrando apenas os funcionários com status igual a false
            const activeFuncionarios = dataFuncionarios.filter(funcionario => funcionario.status === false);

            setFuncionarios(activeFuncionarios);              
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        filterFuncionarios(search, selectedOption);
    }, [search, selectedOption]);

    const defaultFuncionario = 'url_to_default_image';
    const toggleModal = (funcionario) => {
        setSelectedFuncionario(funcionario);
        setShowModal(!showModal);
    };

    return (
        <div id={styles.div_funcionario}>
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
                            <label htmlFor="radio_mat_func" className={styles.label_searchbar}>Matrícula</label>
                            <input
                                id="radio_mat_func"
                                className={styles.radio}
                                type="radio"
                                name="option"
                                value="matriculaFuncionario"
                                checked={selectedOption === 'matriculaFuncionario'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                        </div>
                        <div className={styles.option_row}>
                            <label htmlFor="radio_cpf" className={styles.label_searchbar}>CPF</label>
                            <input
                                id="radio_cpf"
                                className={styles.radio}
                                type="radio"
                                name="option"
                                value="cpf"
                                checked={selectedOption === 'cpf'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                        </div>
                    </div>
                )} */}
            </div>
            <div className={styles.div_pai}>
                <div className={styles.card_container}>
                    {Funcionarios.map((funcionario, index) => (
                        <CardFuncionarios 
                            key={funcionario.idFuncionario ? funcionario.idFuncionario : index} 
                            funcionario={funcionario} 
                            defaultFuncionario={defaultFuncionario} 
                            onShowModal={() => toggleModal(funcionario)}
                        />
                    ))}
                </div>
            </div>
            {showModal && <ModalFuncionariosComponent onClose={toggleModal} funcionario={selectedFuncionario} />}
        </div>
    );
}

export default Funcionario;
