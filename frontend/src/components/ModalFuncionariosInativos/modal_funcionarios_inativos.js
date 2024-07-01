import React, { useState, useEffect, useCallback } from "react";
import styles from "./modal_funcionarios_inativos.module.css";
import logo from "../../assets/imagens/logo.png";
import { useApi } from '../../../src/ApiContext.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const ModalFuncionariosComponent = ({ onClose, funcionario }) => {
    const [codigoSetor, setCodigoSetor] = useState('');
    const [codigoCargo, setCodigoCargo] = useState('');
    const [cargos, setCargos] = useState([]);
    const [setores, setSetores] = useState([]);
    const { apiUrl } = useApi();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const responseCargos = await fetch(`${apiUrl}/cargos/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseCargos.ok) {
                    throw new Error('Erro ao carregar os cargos');
                }
                const dataCargos = await responseCargos.json();
                setCargos(dataCargos);

                const responseSetores = await fetch(`${apiUrl}/setores/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseSetores.ok) {
                    throw new Error('Erro ao carregar os setores');
                }
                const dataSetores = await responseSetores.json();
                setSetores(dataSetores);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        if (funcionario) {
            setCodigoSetor(funcionario.codigoSetor ? extractIdFromUrl(funcionario.codigoSetor) : '');
            setCodigoCargo(funcionario.codigoCargo ? extractIdFromUrl(funcionario.codigoCargo) : '');
        }
    }, [funcionario]);

    const editData = {
        Nome: funcionario.nome,
        Matrícula: funcionario.matriculaFuncionario,
        CPF: funcionario.cpf,
    };

    const gerarRelatorio = () => {
        const formatDate = (dateString) => {
            if (!dateString) return '--/--/----'; // Retorna uma string vazia se dateString for nulo

            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        };

        const documentDefinition = {
            content: [
                { text: `Relatório do funcionário ${funcionario.nome}`, style: 'header' },
                { text: `Matrícula: ${funcionario.matriculaFuncionario}` },
                { text: `CPF: ${funcionario.cpf}` },
                { text: `Status: inativo` },
                { text: 'Empréstimos:', style: 'subheader' },
                {
                    ul: filteredEmprestimos.map(emprestimo => `Empréstimo ${emprestimo.codigoEmprestimo}: 
                        Duração - ${formatDate(emprestimo.dataEmprestimo)} até ${formatDate(emprestimo.dataDevolucao)} 
                        Ferramenta - ${emprestimo.nomeFerramenta}`)
                }
            ],
            styles: {
                header: { fontSize: 18, bold: true },
                subheader: { fontSize: 16, bold: true, margin: [0, 15, 0, 5] }
            }
        };

        // Define o nome do arquivo PDF
        const fileName = `Relatório_${funcionario.nome.replace(/\s+/g, '_')}.pdf`;

        pdfMake.createPdf(documentDefinition).download(fileName);
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
            const filteredData = data.filter(emprestimo => emprestimo.matriculaFuncionario === `${apiUrl}/funcionarios/${funcionario.idFuncionario}/`);
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



    return (
        <>
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div id={styles.fundo_img}>
                        <img src={funcionario.imgFunc || logo} className={styles.modal_image} alt="Imagem de funcionário" />
                    </div>
                    <div className={styles.modal_content}>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Nome</span>
                            <p>{editData.Nome}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Matrícula</span>
                            <p>{editData.Matrícula}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>CPF</span>
                            <p>{editData.CPF}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Setor</span>
                            <p>{setores.length > 0 ? setores.find(setor => setor.codigoSetor === parseInt(codigoSetor))?.nomeSetor : 'Sem setor'}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Cargo</span>
                            <p>{cargos.length > 0 ? cargos.find(cargo => cargo.codigoCargo === parseInt(codigoCargo))?.nomeCargo : 'Sem cargo'}</p>
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            <>
                                <button className={styles.remove_button}>ATIVAR</button>
                                <button className={styles.relatorio_button} onClick={gerarRelatorio}>RELATÓRIO</button>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalFuncionariosComponent;