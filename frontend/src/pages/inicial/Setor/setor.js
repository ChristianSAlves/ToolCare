import React, { useState, useEffect, useCallback } from 'react';
import styles from './setor.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CardSetores from '../../../components/CardSetores/card_setores';
import ModalSetoresComponent from '../../../components/ModalSetores/modal_setores';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../src/ApiContext.js';

const Setor = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('nome');
    const [Setores, setSetores] = useState([]);
    const [showModal, setShowModal] = useState(false);  
    const [selectedSetor, setSelectedSetor] = useState(null);
    const { apiUrl } = useApi();

    const filterSetores = useCallback(async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token');
        try {
            const responseSetores = await fetch(`${apiUrl}/setores/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
    
            if (!responseSetores.ok) {
                throw new Error('Erro ao carregar o setores');
            }

            const dataSetores = await responseSetores.json();
            let filteredSetores = dataSetores.filter(setor =>
                newSelectedOption === 'nome' && setor.nomeSetor.toLowerCase().includes(newSearch.toLowerCase())
            );

            setSetores(filteredSetores);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [apiUrl]);
    
    const reloadSetores = useCallback(async () => {
        const token = localStorage.getItem('token');
    
        try {
            const responseSetores = await fetch(`${apiUrl}/setores/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
    
            if (!responseSetores.ok) {
                throw new Error('Erro ao carregar os Setores');
            }

            const dataSetores = await responseSetores.json();
            setSetores(dataSetores);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [apiUrl]);

    useEffect(() => {
        reloadSetores();
    }, [reloadSetores]);

    useEffect(() => {
        filterSetores(search, selectedOption);
    }, [search, selectedOption, filterSetores]);

    const toggleModal = (setor) => {
        setSelectedSetor(setor);
        setShowModal(!showModal);
    };


    return (
        <div id={styles.div_setor}>
            <MenuComponent id="menu" />
            <Link to={'/setor_cadastro'}>
                <p id={styles.adicionar}>+</p>
            </Link>
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
                    {Setores.map((setor, index) => (
                        <CardSetores 
                            key={setor.idSetor ? setor.idSetor : index} 
                            setor={setor} 
                            onShowModal={() => toggleModal(setor)}
                        />
                    ))}
                </div>
            </div>
            {showModal && <ModalSetoresComponent onClose={toggleModal} setor={selectedSetor} onRemoveSuccess={reloadSetores} />}
        </div>
    );
}

export default Setor;
