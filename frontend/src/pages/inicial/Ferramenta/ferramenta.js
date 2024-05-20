import React, { useState, useEffect } from 'react';
import { dados } from './ferramenta_json';
import styles from '../Ferramenta/ferramenta.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import { Link } from 'react-router-dom';

const Ferramenta = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [Ferramentas, setFerramentas] = useState([]);

    //const searchLowerCase = search.toLowerCase();

    const filterFerramentas = async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        try {
            // Busca as Ferramentas
            const responseFerramentas = await fetch('http://127.0.0.1:8000/ferramentas/', {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });
    
            if (!responseFerramentas.ok) {
                throw new Error('Erro ao carregar os Ferramentas');
            }
    
            const dataFerramentas = await responseFerramentas.json();
            
            let filteredFerramentas = [];
    
            if (newSelectedOption === 'num_serie') {
                filteredFerramentas = dataFerramentas.filter(ferramenta => ferramenta.numSerie.toLowerCase().includes(newSearch.toLowerCase()));
            } else if (newSelectedOption === 'nome') {
                filteredFerramentas = dataFerramentas.filter(ferramenta => ferramenta.nome.toLowerCase().includes(newSearch.toLowerCase()));
            }
    
            setFerramentas(filteredFerramentas);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        const fetchData = async () => {
            try {
                // Busca as Ferramentas
                const responseFerramentas = await fetch('http://127.0.0.1:8000/ferramentas/', {
                    headers: {
                        'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                    },
                });
                if (!responseFerramentas.ok) {
                    throw new Error('Erro ao carregar os Ferramentas');
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
                                checked={selectedOption!== 'num_serie'}
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

            <div className={styles.ferramentas_container}>
                <ul id={styles.ferramentas_list} className={styles.ferramentas_list}>
                {Ferramentas.map(ferramenta => (
                        <li key={ferramenta.numSerie} className={styles.ferramenta_item}>
                            <p className={styles.ferramenta_nome}>{ferramenta.nome}</p>
                            <p className={styles.ferramenta_numSerie}>{ferramenta.numSerie}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Ferramenta;
