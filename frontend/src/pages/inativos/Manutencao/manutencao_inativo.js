import React, { useState, useEffect } from 'react';
import styles from './manutencao_inativo.module.css';
import MenuInativosComponent from '../../../components/MenuInativos/MenuInativos.js';
import CardManutencoesComponent from '../../../components/CardManutencoes/card_manutencoes';
import ModalManutencaoComponent from '../../../components/ModalManutencoes/modal_manutencoes';
import { useApi } from '../../../../src/ApiContext.js';

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const ManutencaoInativo = () => {
    const [search, setSearch] = useState('');
    const [manutencoes, setManutencoes] = useState([]);
    const [filteredManutencoes, setFilteredManutencoes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedManutencao, setSelectedManutencao] = useState(null);
    const { apiUrl } = useApi();

    const fetchNome = async (url, token) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar o nome');
            }
            const data = await response.json();
            return data.nome;
        } catch (error) {
            console.error('Erro:', error);
            return '';
        }
    };

    const fetchManutencoes = async () => {
        const token = localStorage.getItem('token'); 

        try {
            const response = await fetch(`${apiUrl}/manutencoes/`, {
                headers: {
                    'Authorization': `Token ${token}`, 
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar as Manutenções');
            }

            const data = await response.json();
            const manutencoesComNomes = await Promise.all(data.map(async (manutencao) => {
                const nomeFerramenta = await fetchNome(`${apiUrl}/ferramentas/${extractIdFromUrl(manutencao.codFerramenta)}/`, token);
                return {
                    ...manutencao,
                    nomeFerramenta,
                };
            }));

            const filteredData = manutencoesComNomes.filter(manutencao => manutencao.dataFinal !== null);
            setManutencoes(filteredData);
            setFilteredManutencoes(filteredData);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        fetchManutencoes();
    }, []);

    useEffect(() => {
        const filterManutencoes = () => {
            const searchLower = search.toLowerCase();
            const filtered = manutencoes.filter(manutencao => {
                const codigoManutencaoMatch = manutencao.codigoManutencao.toString().includes(searchLower);
                const manutencaoStringMatch = `manutencao ${manutencao.codigoManutencao}`.toLowerCase().includes(searchLower);
                const manutencaoAcentoStringMatch = `manutenção ${manutencao.codigoManutencao}`.toLowerCase().includes(searchLower);
                const tipoManutencaoMatch = manutencao.tipoManutencao.toLowerCase().includes(searchLower);
                const nomeFerramentaMatch = manutencao.nomeFerramenta.toLowerCase().includes(searchLower);

                return (
                    codigoManutencaoMatch || 
                    manutencaoStringMatch || 
                    manutencaoAcentoStringMatch || 
                    tipoManutencaoMatch || 
                    nomeFerramentaMatch
                ) && manutencao.dataFinal !== null;
            });

            setFilteredManutencoes(filtered);
        };

        filterManutencoes();
    }, [search, manutencoes]);

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
                    {filteredManutencoes.map((manutencao, index) => (
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

export default ManutencaoInativo;
