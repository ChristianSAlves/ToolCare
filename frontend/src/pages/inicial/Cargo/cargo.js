import React, { useState, useEffect } from 'react';
import styles from './cargo.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CardCargos from '../../../components/CardCargos/card_cargos';
import ModalCargosComponent from '../../../components/ModalCargos/modal_cargos';
import { Link } from 'react-router-dom';

const Cargo = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('nome');
    const [Cargos, setCargos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCargo, setSelectedCargo] = useState(null);

    const filterCargos = async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token');
        try {
            const responseCargos = await fetch('http://127.0.0.1:8000/cargos/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (!responseCargos.ok) {
                throw new Error('Erro ao carregar os Cargos');
            }

            const dataCargos = await responseCargos.json();
            let filteredCargos = dataCargos.filter(cargo =>
                newSelectedOption === 'nome' && cargo.nomeCargo.toLowerCase().includes(newSearch.toLowerCase())
            );

            setCargos(filteredCargos);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const responseCargos = await fetch('http://127.0.0.1:8000/cargos/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseCargos.ok) {
                    throw new Error('Erro ao carregar os Cargos');
                }
                const dataCargos = await responseCargos.json();
                setCargos(dataCargos);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterCargos(search, selectedOption);
    }, [search, selectedOption]);

    const toggleModal = (cargo) => {
        setSelectedCargo(cargo);
        setShowModal(!showModal);
    };

    return (
        <div id={styles.div_cargo}>
            <MenuComponent id="menu" />
            <Link to={'/cargo_cadastro'}>
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
                    {Cargos.map((cargo, index) => (
                        <CardCargos 
                            key={cargo.idCargo ? cargo.idCargo : index} 
                            cargo={cargo} 
                            onShowModal={() => toggleModal(cargo)}
                        />
                    ))}
                </div>
            </div>
            {showModal && <ModalCargosComponent onClose={toggleModal} cargo={selectedCargo} />}
        </div>
    );
}

export default Cargo;
