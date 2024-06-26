import React, { useState, useEffect, useCallback } from 'react';
import styles from '../Ferramenta/ferramenta_inativo.module.css';
import MenuInativosComponent from '../../../components/MenuInativos/MenuInativos.js';
import CardFerramentas from '../../../components/CardFerramentas/card_ferramentas';
import ModalFerramentasComponent from '../../../components/ModalFerramentas/modal_ferramentas';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../src/ApiContext.js';

const FerramentaInativa = () => {
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [ferramentas, setFerramentas] = useState([]);
    const [filteredFerramentas, setFilteredFerramentas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFerramenta, setSelectedFerramenta] = useState(null);
    const { apiUrl } = useApi();

    const filterFerramentas = useCallback(async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token');
        try {
            const responseFerramentas = await fetch(`${apiUrl}/ferramentas/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (!responseFerramentas.ok) {
                throw new Error('Erro ao carregar as Ferramentas');
            }

            const dataFerramentas = await responseFerramentas.json();
            const filtered = dataFerramentas.filter(ferramenta => 
                ferramenta.status.toLowerCase() === 'baixa' &&
                (
                    (newSelectedOption === 'num_serie' && ferramenta.numSerie.toLowerCase().includes(newSearch.toLowerCase())) ||
                    (newSelectedOption === 'nome' && ferramenta.nome.toLowerCase().includes(newSearch.toLowerCase())) ||
                    (newSelectedOption === 'status' && ferramenta.status.toLowerCase().includes(newSearch.toLowerCase())) ||
                    (!newSelectedOption && (
                        ferramenta.numSerie.toLowerCase().includes(newSearch.toLowerCase()) ||
                        ferramenta.nome.toLowerCase().includes(newSearch.toLowerCase()) ||
                        ferramenta.status.toLowerCase().includes(newSearch.toLowerCase())
                    ))
                )
            );

            setFilteredFerramentas(filtered);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [apiUrl]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const responseFerramentas = await fetch(`${apiUrl}/ferramentas/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseFerramentas.ok) {
                    throw new Error('Erro ao carregar as Ferramentas');
                }
                const dataFerramentas = await responseFerramentas.json();
                const filteredData = dataFerramentas.filter(ferramenta => ferramenta.status.toLowerCase() === 'baixa');
                setFerramentas(filteredData);
                setFilteredFerramentas(filteredData);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        filterFerramentas(search, selectedOption);
    }, [search, selectedOption, filterFerramentas]);

    const defaultFerramenta = 'url_to_default_image';
    const toggleModal = (ferramenta) => {
        setSelectedFerramenta(ferramenta);
        setShowModal(!showModal);
    };

    return (
        <div id={styles.div_ferramenta}>
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
                    {filteredFerramentas.map((ferramenta, index) => (
                        <CardFerramentas 
                            key={ferramenta.idFerramenta ? ferramenta.idFerramenta : index} 
                            ferramenta={ferramenta} 
                            defaultFerramenta={defaultFerramenta} 
                            onShowModal={() => toggleModal(ferramenta)}
                        />
                    ))}
                </div>
            </div>
            {showModal && <ModalFerramentasComponent onClose={toggleModal} ferramenta={selectedFerramenta} />}
        </div>
    );
}

export default FerramentaInativa;
