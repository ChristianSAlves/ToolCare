import React, { useState, useEffect } from 'react';
import styles from '../Ferramenta/ferramenta.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CardFerramentas from '../../../components/CardFerramentas/card_ferramentas';
import ModalFerramentasComponent from '../../../components/ModalFerramentas/modal_ferramentas';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../src/ApiContext.js';

const Ferramenta = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [Ferramentas, setFerramentas] = useState([]);
    const [showModal, setShowModal] = useState(false);  // Estado para controle da visibilidade do modal
    const [selectedFerramenta, setSelectedFerramenta] = useState(null);
    const { apiUrl } = useApi();

    const filterFerramentas = async (newSearch, newSelectedOption) => {
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
            let filteredFerramentas = dataFerramentas.filter(ferramenta => 
                ferramenta.status.toLowerCase() !== 'baixa' &&
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
    
            setFerramentas(filteredFerramentas);
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        const fetchData = async () => {
            try {
            
                const responseFerramentas = await fetch(`${apiUrl}/ferramentas/`, {
                    headers: {
                        'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                    },
                });
                if (!responseFerramentas.ok) {
                    throw new Error('Erro ao carregar as Ferramentas');
                }
                const dataFerramentas = await responseFerramentas.json();
                setFerramentas(dataFerramentas);              
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        filterFerramentas(search, selectedOption);
    }, [search, selectedOption]);

    const defaultFerramenta = 'url_to_default_image';
    const toggleModal = (ferramenta) => {
        setSelectedFerramenta(ferramenta);
        setShowModal(!showModal);
    };

    const reloadFerramentas = async () => {
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
            setFerramentas(dataFerramentas);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div id={styles.div_ferramenta}>
            <MenuComponent id="menu" />
            <Link to={'/ferramenta_cadastro'}>
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
                    {Ferramentas.map((ferramenta, index) => (
                        <CardFerramentas 
                            key={ferramenta.idFerramenta ? ferramenta.idFerramenta : index} 
                            ferramenta={ferramenta} 
                            defaultFerramenta={defaultFerramenta} 
                            onShowModal={() => toggleModal(ferramenta)}
                        />
                    ))}
                </div>
            </div>
            {showModal && (
                <ModalFerramentasComponent
                    onClose={toggleModal}
                    ferramenta={selectedFerramenta}
                    onShowModal={setShowModal}
                    onRemove={reloadFerramentas}
                />
            )}
        </div>
    );
}

export default Ferramenta;