import React, { useState, useEffect } from 'react';
import styles from './manutencao_inativo.module.css';
import MenuInativosComponent from '../../../components/MenuInativos/MenuInativos.js';
import CardManutencoesComponent from '../../../components/CardManutencoes/card_manutencoes';
import ModalManutencaoComponent from '../../../components/ModalManutencoes/modal_manutencoes';
import { Link } from 'react-router-dom';

const Manutencao = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('codigo');
    const [Manutencoes, setManutencoes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedManutencao, setSelectedManutencao] = useState(null);

    const filterManutencoes = async (newSearch) => {
        const token = localStorage.getItem('token');
        try {
            const responseManutencoes = await fetch('http://127.0.0.1:8000/manutencoes/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (!responseManutencoes.ok) {
                throw new Error('Erro ao carregar as Manutenções');
            }

            const dataManutencoes = await responseManutencoes.json();
            let filteredManutencoes = dataManutencoes.filter(manutencao => {
                if (manutencao.dataFinal === null) {
                    return false;
                }
                const codigoManutencao = manutencao.codigoManutencao.toString() || '';
                const tipoManutencao = manutencao.tipoManutencao || '';
                return (
                    codigoManutencao.toLowerCase().includes(newSearch.toLowerCase()) ||
                    tipoManutencao.toLowerCase().includes(newSearch.toLowerCase())
                );
            });

            setManutencoes(filteredManutencoes);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const responseManutencoes = await fetch('http://127.0.0.1:8000/manutencoes/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseManutencoes.ok) {
                    throw new Error('Erro ao carregar as Manutenções');
                }
                const dataManutencoes = await responseManutencoes.json();
                setManutencoes(dataManutencoes);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterManutencoes(search);
    }, [search]);

    const toggleModal = (manutencao) => {
        setSelectedManutencao(manutencao);
        setShowModal(!showModal);
    };

    return (
        <div id={styles.div_manutencao}>
            <MenuInativosComponent id={styles.menu} />
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
                    {Manutencoes.map((manutencao, index) => (
                        <CardManutencoesComponent
                            key={manutencao.codigoManutencao ? manutencao.codigoManutencao : index} 
                            manutencao={manutencao} 
                            onShowModal={() => toggleModal(manutencao)}
                        />
                    ))}
                </div>
            </div>
            {showModal && <ModalManutencaoComponent onClose={toggleModal} manutencao={selectedManutencao} />}
        </div>
    );
}

export default Manutencao;
