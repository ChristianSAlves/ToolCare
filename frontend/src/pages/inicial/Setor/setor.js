import React, { useState, useEffect } from 'react';
import styles from './setor.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CardSetores from '../../../components/CardSetores/card_setores';
import ModalSetoresComponent from '../../../components/ModalSetores/modal_setores';
import { Link } from 'react-router-dom';

const Setor = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('nome');
    const [Setores, setSetores] = useState([]);
    const [showModal, setShowModal] = useState(false);  // Estado para controle da visibilidade do modal
    const [selectedSetor, setSelectedSetor] = useState(null);

    const filterSetores = async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token');
        try {
            const responseSetores = await fetch('http://127.0.0.1:8000/setores/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
    
            if (!responseSetores.ok) {
                throw new Error('Erro ao carregar os Setores');
            }
    
            const dataSetores = await responseSetores.json();
            let filteredSetores = dataSetores.filter(setor => 
                newSelectedOption === 'nome' && setor.nomeSetor.toLowerCase().includes(newSearch.toLowerCase())
            );
    
            setSetores(filteredSetores);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        const fetchData = async () => {
            try {
                const responseSetores = await fetch('http://127.0.0.1:8000/setores/', {
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
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        filterSetores(search, selectedOption);
    }, [search, selectedOption]);

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
                    </div>
                )}
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
            {showModal && <ModalSetoresComponent onClose={toggleModal} setor={selectedSetor} />}
        </div>
    );
}

export default Setor;
