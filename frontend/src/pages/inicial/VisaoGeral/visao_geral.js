import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuComponent from '../../../components/Menu/Menu';
import GraficoFuncionario from '../../../components/GraficoFuncionarios/grafico_funcionarios';
import GraficoFerramentas from '../../../components/GraficoFerramentas/grafico_ferramentas';
import styles from './visao_geral.module.css';
import { useApi } from '../../../../src/ApiContext.js';

const VisaoGeral = () => {
    const [funcionarios, setFuncionarios] = useState(0);
    const [ferramentas, setFerramentas] = useState(0);
    const [dadosVisaoGeral, setDadosVisaoGeral] = useState({
        semEmprestimo: 0,
        comEmprestimo: 0,
        ferramentasDisponiveis: 0,
        ferramentasEmprestadas: 0,
        ferramentasManutencao: 0,
        ferramentasBaixa: 0
    });
    const { apiUrl } = useApi();

    useEffect(() => {
        const token = localStorage.getItem('token');

        
        const fetchData = async () => {
            try {
                const responseFuncionarios = await axios.get(`${apiUrl}/funcionarios/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const responseFerramentas = await axios.get(`${apiUrl}/ferramentas/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const responseEmprestimos = await axios.get(`${apiUrl}/emprestimos/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const funcionariosData = responseFuncionarios.data.filter(funcionario => funcionario.status);
                const ferramentasData = responseFerramentas.data.filter(f => f.status !== 'Baixa'); 
                const emprestimosData = responseEmprestimos.data.filter(e => !e.dataDevolucao);

                function isValidUrl(string) {
                    try {
                        new URL(string);
                        return true;
                    } catch (_) {
                        return false; 
                    }
                }

                const emprestimosDetalhados = await Promise.all(
                    emprestimosData
                       .filter(emprestimo => emprestimo.matriculaFuncionario && isValidUrl(emprestimo.matriculaFuncionario))
                       .map(async (emprestimo) => {
                            const response = await axios.get(emprestimo.matriculaFuncionario, {
                                headers: {
                                    'Authorization': `Token ${token}`
                                }
                            });
                            return {...emprestimo, matriculaFuncionario: response.data.matriculaFuncionario };
                        })
                );

                const semEmprestimo = funcionariosData.filter(f => !emprestimosDetalhados.some(e => e.matriculaFuncionario === f.matriculaFuncionario)).length;
                const comEmprestimo = funcionariosData.length - semEmprestimo;

                const ferramentasDisponiveis = ferramentasData.filter(f => f.status === 'Disponível').length;
                const ferramentasEmprestadas = ferramentasData.filter(f => f.status === 'Emprestada').length;
                const ferramentasManutencao = ferramentasData.filter(f => f.status === 'Manutenção').length;
                const ferramentasBaixa = responseFerramentas.data.filter(f => f.status === 'Baixa').length;

                setFuncionarios(funcionariosData.length);
                setFerramentas(ferramentasData.length); 
                setDadosVisaoGeral({
                    semEmprestimo,
                    comEmprestimo,
                    ferramentasDisponiveis,
                    ferramentasEmprestadas,
                    ferramentasManutencao,
                    ferramentasBaixa
                });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    const calculatePercentage = (value, total) => {
        if (total === 0) {
            return 0;
        }
        return ((value / total) * 100).toFixed(0);
    };

    const seriesFerramentas = [
        dadosVisaoGeral.ferramentasDisponiveis,
        dadosVisaoGeral.ferramentasEmprestadas,
        dadosVisaoGeral.ferramentasManutencao,
    ];

    const seriesFuncionarios = [
        dadosVisaoGeral.semEmprestimo,
        dadosVisaoGeral.comEmprestimo,
    ]

    return (
        <div id={styles.tela}>
            <MenuComponent id={styles.menu} />
            <div className={styles.chartWrapper}>
                <GraficoFuncionario series={seriesFuncionarios}/>
                <div id={styles.funcionarios}>
                    <p className={styles.quantidade}>{funcionarios}</p>
                    <p className={styles.funcionarios}>funcionários<br /> cadastrados</p>
                </div>
                <GraficoFerramentas series={seriesFerramentas}/>
                <div id={styles.ferramentas}>
                    <p className={styles.quantidade}>{ferramentas}</p>
                    <p className={styles.ferramentas}>ferramentas<br /> cadastradas</p>
                </div>
            </div>
            <div id={styles.info_visao_geral}>
                <div id={styles.info_funcionarios}>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>{calculatePercentage(dadosVisaoGeral.semEmprestimo, funcionarios)}%</p>
                        <p className={styles.texto}>dos funcionários não têm<br />nenhum empréstimo</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.semEmprestimo}</p>
                        <p className={styles.texto}>funcionários não têm<br />nenhum empréstimo</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>{calculatePercentage(dadosVisaoGeral.comEmprestimo, funcionarios)}%</p>
                        <p className={styles.texto}>dos funcionários têm ao<br />menos um empréstimo</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.comEmprestimo}</p>
                        <p className={styles.texto}>funcionários têm ao<br />menos um empréstimo</p>
                    </div>
                </div>
                <div id={styles.info_ferramentas}>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>{calculatePercentage(dadosVisaoGeral.ferramentasDisponiveis, ferramentas)}%</p>
                        <p className={styles.texto}>das ferramentas<br />estão disponíveis</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.ferramentasDisponiveis}</p>
                        <p className={styles.texto}>ferramentas<br />estão disponíveis</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>{calculatePercentage(dadosVisaoGeral.ferramentasEmprestadas, ferramentas)}%</p>
                        <p className={styles.texto}>das ferramentas<br />estão emprestadas</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.ferramentasEmprestadas}</p>
                        <p className={styles.texto}>ferramentas estão<br />emprestadas</p>
                    </div>
                    <div className={styles.info_row}>
                    <p className={styles.porcentagem}>{calculatePercentage(dadosVisaoGeral.ferramentasManutencao, ferramentas)}%</p>
                        <p className={styles.texto}>das ferramentas<br />estão em manutenção</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.ferramentasManutencao}</p>
                        <p className={styles.texto}>ferramentas<br />em manutenção</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaoGeral;
