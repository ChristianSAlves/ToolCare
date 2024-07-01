import React, { useState, useEffect, useCallback } from 'react';
import styles from './funcionario_inativo.module.css';
import MenuInativosComponent from '../../../components/MenuInativos/MenuInativos.js';
import CardFuncionarios from '../../../components/CardFuncionarios/card_funcionarios';
import ModalFuncionariosComponent from '../../../components/ModalFuncionarios/modal_funcionarios';
import { useApi } from '../../../../src/ApiContext.js';

const FuncionarioInativo = () => {
    const [search, setSearch] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);
    const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFuncionario, setSelectedFuncionario] = useState(null);
    const { apiUrl } = useApi();

    const fetchFuncionarios = useCallback(async () => {
        const token = localStorage.getItem('token'); 
    
        try {
            const response = await fetch(`${apiUrl}/funcionarios/`, {
                headers: {
                    'Authorization': `Token ${token}`, 
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar os Funcionarios');
            }

            const data = await response.json();
            const filteredData = data.filter(funcionario => funcionario.status === false);
            setFuncionarios(filteredData);
            setFilteredFuncionarios(filteredData);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [apiUrl]);

    useEffect(() => {
        fetchFuncionarios();
    }, [fetchFuncionarios]);

    useEffect(() => {
        const filterFuncionarios = () => {
            const searchLower = search.toLowerCase();

            const result = funcionarios.filter(funcionario => {
                const nomeMatch = funcionario.nome.toLowerCase().includes(searchLower);
                const matriculaFuncionarioMatch = funcionario.matriculaFuncionario.toLowerCase().includes(searchLower);
                const cpfMatch = funcionario.cpf.toLowerCase().includes(searchLower);

                return nomeMatch || matriculaFuncionarioMatch || cpfMatch;
            });

            setFilteredFuncionarios(result);
        };

        filterFuncionarios();
    }, [search, funcionarios]);

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
            {showModal && <ModalFuncionariosComponent onClose={toggleModal} funcionario={selectedFuncionario} />}
        </div>
    );
}

export default FuncionarioInativo;
