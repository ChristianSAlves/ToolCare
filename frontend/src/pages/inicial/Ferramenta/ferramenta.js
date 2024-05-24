import React, { useState, useEffect } from 'react';
import styles from '../Ferramenta/ferramenta.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CardTeste from '../../../components/CardFerramentas/card_ferramentas';
import ModalFerramentasComponent from '../../../components/ModalFerramentas/modal_ferramentas';
import { Link } from 'react-router-dom';

const Ferramenta = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [Ferramentas, setFerramentas] = useState([]);
    const [showModal, setShowModal] = useState(false);  // Estado para controle da visibilidade do modal

    const filterFerramentas = async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token');
        try {
            const responseFerramentas = await fetch('http://127.0.0.1:8000/ferramentas/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
    
            if (!responseFerramentas.ok) {
                throw new Error('Erro ao carregar as Ferramentas');
            }
    
            const dataFerramentas = await responseFerramentas.json();
            let filteredFerramentas = dataFerramentas.filter(ferramenta => 
                (newSelectedOption === 'num_serie' && ferramenta.numSerie.toLowerCase().includes(newSearch.toLowerCase())) ||
                (newSelectedOption === 'nome' && ferramenta.nome.toLowerCase().includes(newSearch.toLowerCase())) ||
                (!newSelectedOption && (ferramenta.numSerie.toLowerCase().includes(newSearch.toLowerCase()) ||
                ferramenta.nome.toLowerCase().includes(newSearch.toLowerCase())))
            );
    
            setFerramentas(filteredFerramentas);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        filterFerramentas(search, selectedOption);
    }, [search, selectedOption]);

    const defaultFerramenta = 'url_to_default_image';
    const toggleModal = () => setShowModal(!showModal);

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
                <p
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
                    </div>
                )}
            </div>
            <div className={styles.div_pai}>
                <div className={styles.card_container}>
                    {Ferramentas.map(ferramenta => (
                        <CardTeste 
                            key={ferramenta.idFerramenta} 
                            ferramenta={ferramenta} 
                            defaultFerramenta={defaultFerramenta} 
                            onShowModal={toggleModal}
                        />
                    ))}
                </div>
            </div>
            {showModal && <ModalFerramentasComponent onClose={toggleModal} />}
        </div>
    );
}

export default Ferramenta;
