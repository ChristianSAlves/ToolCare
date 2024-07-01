// pages/RelatorioFerramenta/relatorio_ferramenta.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './relatorio_ferramenta.module.css'
import MenuComponent from '../../../components/Menu/Menu';
import { useApi } from '../../../ApiContext';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};


const RelatorioFerramenta = () => {

    const pdf = useRef();
    const downloadPDF = () => {
        const input = pdf.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('teste.pdf');

        });


    };


    const location = useLocation();
    const { ferramenta } = location.state || {};


    const [manutencoes, setManutencoes] = useState([]);
    const [filteredManutencoes, setFilteredManutencoes] = useState([]);
    const [search, setSearch] = useState('');
    const [emprestimos, setEmprestimos] = useState([]);
    const [filteredEmprestimos, setFilteredEmprestimos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmprestimo, setSelectedEmprestimo] = useState(null);
    const [selectedManutencao, setSelectedManutencao] = useState(null);


    const { apiUrl } = useApi();

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
        <div className={styles.container}>
            <MenuComponent />

            <div className={styles.container2} ref={pdf}>
                <h1>Relatório da ferramenta: {ferramenta.nome}-{ferramenta.numSerie}</h1>
                <div>
                    <h2>Emprestimos da ferramenta:</h2>
                    {filteredEmprestimos.map((emprestimo, index) => (
                        <div key={index} className={styles.itens_relatorio}>
                            <h3>Empréstimo {emprestimo.codigoEmprestimo}</h3>
                            <p>{emprestimo.dataEmprestimo}  até  {emprestimo.dataDevolucao} - {emprestimo.nomeFuncionario}</p>
                            <p>Observações: {emprestimo.observacoes}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>Manutenções da ferramenta:</h2>
                    {filteredManutencoes.map((manutencao, index) => (
                        <div key={index} className={styles.itens_relatorio}>
                            <h3> Manutenção {manutencao.codigoManutencao}</h3>
                            <p>{manutencao.dataInicio}  até  {manutencao.dataFinal}-{manutencao.tipoManutencao}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="row text-center mt-5">
                <button id={styles.button_pdf} onClick={downloadPDF}>Baixar PDF</button>
            </div>


        </div>


    );
};

export default RelatorioFerramenta;
