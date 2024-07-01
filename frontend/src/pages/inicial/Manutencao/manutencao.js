import React, { useState, useEffect, useCallback } from 'react';
import styles from './manutencao.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CardManutencoesComponent from '../../../components/CardManutencoes/card_manutencoes';
import ModalManutencaoComponent from '../../../components/ModalManutencoes/modal_manutencoes';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../src/ApiContext.js';

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const Manutencao = () => {
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

            setManutencoes(manutencoesComNomes);
            setFilteredManutencoes(manutencoesComNomes.filter(manutencao => manutencao.dataFinal === null));
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        fetchManutencoes();
    }, []);

    useEffect(() => {
        const filterManutencoes = async () => {
            const searchLower = search.toLowerCase();
            const filtered = manutencoes.filter(manutencao => {
                const codigoManutencaoMatch = manutencao.codigoManutencao.toString().includes(searchLower);
                const manutencaoStringMatch = `manutencao ${manutencao.codigoManutencao}`.includes(searchLower);
                const manutencaoAcentoStringMatch = `manutenção ${manutencao.codigoManutencao}`.includes(searchLower);
                const tipoManutencaoMatch = manutencao.tipoManutencao.toLowerCase().includes(searchLower);
                const nomeFerramentaMatch = manutencao.nomeFerramenta.toLowerCase().includes(searchLower);

                return (
                    codigoManutencaoMatch || 
                    manutencaoStringMatch || 
                    manutencaoAcentoStringMatch || 
                    tipoManutencaoMatch || 
                    nomeFerramentaMatch
                ) && manutencao.dataFinal === null;
            });

            setFilteredManutencoes(filtered);
        };

        filterManutencoes();
    }, [search, manutencoes]);

    const toggleModal = (manutencao) => {
        setSelectedManutencao(manutencao);
        setShowModal(!showModal);
    };

    const reloadManutencoes = () => {
        fetchManutencoes();
    };

    return (
        <div id={styles.div_manutencao}>
            <MenuComponent id={styles.menu} />
            <Link to={'/manutencao_cadastro'}>
                <p id={styles.adicionar}>+</p>
            </Link>
            <div id={styles.searchbar}>
                <input
                    id={styles.input_searchbar}
                    className="conteudo_searchbar"
                    type='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por código, tipo de manutenção ou nome da ferramenta"
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
            {showModal && (
                <ModalManutencaoComponent
                    onClose={toggleModal}
                    manutencao={selectedManutencao}
                    onShowModal={setShowModal}
                    onRemove={reloadManutencoes}
                    onEdit={reloadManutencoes}
                />
            )}
        </div>
    );
}

export default Manutencao;
