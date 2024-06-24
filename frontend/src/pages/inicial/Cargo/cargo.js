import React, { useState, useEffect, useCallback } from 'react';
import styles from './cargo.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CardCargos from '../../../components/CardCargos/card_cargos';
import ModalCargosComponent from '../../../components/ModalCargos/modal_cargos';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../src/ApiContext.js';

const Cargo = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('nome');
    const [Cargos, setCargos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCargo, setSelectedCargo] = useState(null);

    const { apiUrl } = useApi();

    const filterCargos = useCallback(async (newSearch, newSelectedOption) => {
        const token = localStorage.getItem('token');
        try {
            const responseCargos = await fetch(`${apiUrl}/cargos/`, {
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
    }, [apiUrl]);
    
    const reloadCargos = useCallback(async () => {
        const token = localStorage.getItem('token');
    
        try {
            const responseCargos = await fetch(`${apiUrl}/cargos/`, {
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
    }, [apiUrl]);

    useEffect(() => {
        reloadCargos();
    }, [reloadCargos]);

    useEffect(() => {
        filterCargos(search, selectedOption);
    }, [search, selectedOption, filterCargos]);

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
            {showModal && (
                <ModalCargosComponent
                    onClose={toggleModal}
                    cargo={selectedCargo}
                    onShowModal={setShowModal}
                    onRemove={reloadCargos}
                />
            )}
        </div>
    );
}

export default Cargo;
