import React, { useState, useEffect, useCallback } from 'react';
import styles from "./modal_ferramentas_inativos.module.css";
import logo from "../../assets/imagens/logo.png";
import Ativado from "../Avisos/Ativado/ativado";
import { useApi } from '../../../src/ApiContext.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};


const ModalFerramentasInativosComponent = ({ onClose, ferramenta, onShowModal, onRemove }) => {
    const [editData, setEditData] = useState({
        Nome: ferramenta.nome,
        NúmeroDeSerie: ferramenta.numSerie,
        Descricao: ferramenta.descricao,
        DataAquisicao: formatDate(ferramenta.dataAquisicao),
    });

    const [showEditado, setShowEditado] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const time = 3000;
    const { apiUrl } = useApi();

    const handleAtivar = async () => {
        const token = localStorage.getItem('token');
        let response;

        try {
            const formData = new FormData();
            formData.append('status', 'Disponível');

            response = await fetch(`${apiUrl}/ferramentas/${ferramenta.codFerramenta}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setShowEditado(true);
                setTimeout(() => {
                    setShowEditado(false);
                    if (onRemove) onRemove(); // Verifica se onRemove é passado e chama a função para recarregar a lista de ferramentas após ativação
                    onClose(); // Fechar o modal após a ativação
                    if (onShowModal) onShowModal(false); // Atualiza o estado do modal no componente pai, se necessário
                }, time);
            } else {
                const errorData = await response.json();
                console.error('Erro ao ativar a ferramenta:', errorData);
                setShowFalhaEdicao(true);
                setTimeout(() => {
                    setShowFalhaEdicao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao ativar a ferramenta:', error);
            setShowFalhaEdicao(true);
            setTimeout(() => {
                setShowFalhaEdicao(false);
            }, time);
        }
    };

    const gerarRelatorio = () => {
        const formatDate = (dateString) => {
            if (!dateString) return '--/--/----'; // Retorna uma string vazia se dateString for nulo

            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        };

        const documentDefinition = {
            content: [
                { text: `Relatório da ferramenta ${ferramenta.nome}`, style: 'header' },
                { text: `NumSerie: ${ferramenta.numSerie}` },
                { text: `Status: ${ferramenta.status}` },

                { text: 'Emprestimos:', style: 'subheader' },
                {
                    ul: filteredEmprestimos.map(emprestimo => `Empréstimo ${emprestimo.codigoEmprestimo}: 
                        Duração: ${formatDate(emprestimo.dataEmprestimo)} até ${formatDate(emprestimo.dataDevolucao)} 
                        Funcionário: ${emprestimo.nomeFuncionario}`)
                },
                { text: 'Manutenções:', style: 'subheader' },
                {
                    ul: filteredManutencoes.map(manutencao => `Manutenção ${manutencao.codigoManutencao}
                    Tipo de manutenção: ${manutencao.tipoManutencao}
                    Duração: ${formatDate(manutencao.dataInicio)}  até  ${formatDate(manutencao.dataFinal)} `)
                }
            ],
            styles: {
                header: { fontSize: 18, bold: true },
                subheader: { fontSize: 16, bold: true, margin: [0, 15, 0, 5] }
            }
        };

        pdfMake.createPdf(documentDefinition).download(`Relatório_${ferramenta.nome}.pdf`);
    };





    const [manutencoes, setManutencoes] = useState([]);
    const [filteredManutencoes, setFilteredManutencoes] = useState([]);
    const [search, setSearch] = useState('');
    const [emprestimos, setEmprestimos] = useState([]);
    const [filteredEmprestimos, setFilteredEmprestimos] = useState([]);


    const fetchEmprestimos = useCallback(async () => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage

        try {
            const response = await fetch(`${apiUrl}/emprestimos/`, {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar os Emprestimos');
            }
            const data = await response.json();
            const filteredData = data.filter(emprestimo => emprestimo.numSerie === `${apiUrl}/ferramentas/${ferramenta.codFerramenta}/`);
            setEmprestimos(filteredData);
            setFilteredEmprestimos(filteredData);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [apiUrl]);

    const fetchNome = useCallback(async (url, token) => {
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
    }, []);

    useEffect(() => {
        fetchEmprestimos();
    }, [fetchEmprestimos]);

    useEffect(() => {
        const filterEmprestimos = async () => {
            const token = localStorage.getItem('token');
            const filtered = await Promise.all(
                emprestimos.map(async (emprestimo) => {
                    const nomeFerramenta = await fetchNome(`${apiUrl}/ferramentas/${extractIdFromUrl(emprestimo.numSerie)}/`, token);
                    const nomeFuncionario = await fetchNome(`${apiUrl}/funcionarios/${extractIdFromUrl(emprestimo.matriculaFuncionario)}/`, token);

                    return {
                        ...emprestimo,
                        nomeFerramenta,
                        nomeFuncionario
                    };
                })
            );

            const result = filtered.filter(emprestimo => {
                const searchLower = search.toLowerCase();
                const codigoEmprestimoMatch = emprestimo.codigoEmprestimo.toString().includes(searchLower);
                const emprestimoStringMatch = `emprestimo ${emprestimo.codigoEmprestimo}`.toLowerCase().includes(searchLower);
                const emprestimoAcentoStringMatch = `empréstimo ${emprestimo.codigoEmprestimo}`.toLowerCase().includes(searchLower);
                const nomeFuncionarioMatch = emprestimo.nomeFuncionario.toLowerCase().includes(searchLower);
                const nomeFerramentaMatch = emprestimo.nomeFerramenta.toLowerCase().includes(searchLower);

                return (
                    codigoEmprestimoMatch ||
                    emprestimoStringMatch ||
                    emprestimoAcentoStringMatch ||
                    nomeFuncionarioMatch ||
                    nomeFerramentaMatch
                );
            });

            setFilteredEmprestimos(result);
        };

        filterEmprestimos();
    }, [search, emprestimos, fetchNome, apiUrl]);



    const fetchManutencoes = async () => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage

        try {
            const response = await fetch(`${apiUrl}/manutencoes/`, {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
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

            const filteredData = manutencoesComNomes.filter(manutencao => manutencao.codFerramenta === `${apiUrl}/ferramentas/${ferramenta.codFerramenta}/`);
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
                );
            });

            setFilteredManutencoes(filtered);
        };

        filterManutencoes();
    }, [search, manutencoes]);





    return (
        <>
            {showEditado && <Ativado />}
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div id={styles.fundo_img}>
                        <img src={ferramenta.imgFerramenta || logo} className={styles.modal_image} alt="Imagem de ferramenta" />
                    </div>
                    <div className={styles.modal_content}>
                        {Object.entries(editData).map(([key, value]) => (
                            <div className={styles.info_row} key={key}>
                                <span className={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <p>{value}</p>
                            </div>
                        ))}
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            <>
                                <button className={styles.remove_button} onClick={handleAtivar}>ATIVAR</button>
                                <button className={styles.remove_button} onClick={gerarRelatorio}>RELATÓRIO</button>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalFerramentasInativosComponent;
