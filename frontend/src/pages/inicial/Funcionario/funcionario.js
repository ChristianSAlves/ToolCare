import React, { useState, useEffect, useCallback } from 'react';
import styles from './funcionario.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CardFuncionarios from '../../../components/CardFuncionarios/card_funcionarios';
import ModalFuncionariosComponent from '../../../components/ModalFuncionarios/modal_funcionarios';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../src/ApiContext.js';

const Funcionario = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [Funcionarios, setFuncionarios] = useState([]);
    const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
    const [showModal, setShowModal] = useState(false);  // Estado para controle da visibilidade do modal
    const [selectedFuncionario, setSelectedFuncionario] = useState(null);
    const { apiUrl } = useApi();

    const filterFuncionarios = useCallback(async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage

        try {
            const responseFuncionarios = await fetch(`${apiUrl}/funcionarios/`, {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });

            if (!responseFuncionarios.ok) {
                throw new Error('Erro ao carregar os Funcionarios');
            }

            const dataFuncionarios = await response.json();
            
            // Filtrando apenas os funcionários com status igual a true
            let filteredFuncionarios = dataFuncionarios.filter(funcionario => funcionario.status === true);

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

            setFilteredFuncionarios(filteredFuncionarios);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [apiUrl]);

    const fetchData = useCallback(async () => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        try {
            // Busca os funcionarios
            const responseFuncionarios = await fetch(`${apiUrl}/funcionarios/`, {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });
            if (!responseFuncionarios.ok) {
                throw new Error('Erro ao carregar os Funcionarios');
            }
            const dataFuncionarios = await response.json();
            
            // Filtrando apenas os funcionários com status igual a true
            const activeFuncionarios = dataFuncionarios.filter(funcionario => funcionario.status === true);

            setFuncionarios(activeFuncionarios);
            setFilteredFuncionarios(activeFuncionarios);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [apiUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        filterFuncionarios(search, selectedOption);
    }, [search, selectedOption, filterFuncionarios]);

    const defaultFuncionario = 'url_to_default_image';
    const toggleModal = (funcionario) => {
        setSelectedFuncionario(funcionario);
        setShowModal(!showModal);
    };

    const reloadFuncionarios = () => {
        fetchData();
    };

    return (
        <div id={styles.div_funcionario}>
            <MenuComponent id="menu" />
            <Link to={'/funcionario_cadastro'}>
                <p id={styles.adicionar}>+</p>
            </Link>
            <div id={styles.searchbar}>
                <input
                    id={styles.input_searchbar}
                    className="conteudo_searchbar"
                    type='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por nome, matrícula ou CPF"
                />
            </div>
            <div className={styles.div_pai}>
                <div className={styles.card_container}>
                    {filteredFuncionarios.map((funcionario, index) => (
                        <CardFuncionarios 
                            key={funcionario.idFuncionario ? funcionario.idFuncionario : index} 
                            funcionario={funcionario} 
                            defaultFuncionario={defaultFuncionario} 
                            onShowModal={() => toggleModal(funcionario)}
                        />
                    ))}
                </div>
            </div>
            {showModal && (
                <ModalFuncionariosComponent
                    onClose={toggleModal}
                    funcionario={selectedFuncionario}
                    onShowModal={setShowModal}
                    onRemove={reloadFuncionarios}
                />
            )}
        </div>
    );
}

export default Funcionario;
