import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuComponent from '../../../components/Menu/Menu';
import GraficoFuncionario from '../../../components/GraficoFuncionarios/grafico_funcionarios';
import GraficoFerramentas from '../../../components/GraficoFerramentas/grafico_ferramentas';
import styles from './visao_geral.module.css';

const VisaoGeral = () => {
    const [funcionarios, setFuncionarios] = useState(0);
    const [ferramentas, setFerramentas] = useState(0);
    const [dadosVisaoGeral, setDadosVisaoGeral] = useState({
        semEmprestimo: 0,
        comEmprestimo: 0,
        ferramentasDisponiveis: 0,
        ferramentasEmprestadas: 0,
        ferramentasManutencao: 0,
        ferramentasPerdidas: 0
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Fetch data for the overview
        const fetchData = async () => {
            try {
                const responseFuncionarios = await axios.get('http://127.0.0.1:8000/funcionarios/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const responseFerramentas = await axios.get('http://127.0.0.1:8000/ferramentas/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const responseEmprestimos = await axios.get('http://127.0.0.1:8000/emprestimos/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const funcionariosData = responseFuncionarios.data;
                const ferramentasData = responseFerramentas.data;
                const emprestimosData = responseEmprestimos.data;

                console.log(emprestimosData);
                console.log(funcionariosData)

                function isValidUrl(string) {
                    try {
                        new URL(string);
                        return true;
                    } catch (_) {
                        return false; // Não é uma URL válida
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
                
                

                console.log('Funcionários:', funcionariosData);
                console.log('Emprestimos:', emprestimosDetalhados);

                const semEmprestimo = funcionariosData.filter(f => !emprestimosDetalhados.some(e => e.matriculaFuncionario === f.matriculaFuncionario)).length;
                const comEmprestimo = funcionariosData.length - semEmprestimo;

                const ferramentasDisponiveis = ferramentasData.filter(f => f.status === 'Disponível').length;
                const ferramentasEmprestadas = ferramentasData.filter(f => f.status === 'Emprestada').length;
                const ferramentasManutencao = ferramentasData.filter(f => f.status === 'Manutenção').length;
                const ferramentasPerdidas = ferramentasData.filter(f => f.status === 'Perdida').length;

                setFuncionarios(funcionariosData.length);
                setFerramentas(ferramentasData.length);
                setDadosVisaoGeral({
                    semEmprestimo,
                    comEmprestimo,
                    ferramentasDisponiveis,
                    ferramentasEmprestadas,
                    ferramentasManutencao,
                    ferramentasPerdidas
                });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const seriesFerramentas = [
        dadosVisaoGeral.ferramentasDisponiveis,
        dadosVisaoGeral.ferramentasEmprestadas,
        dadosVisaoGeral.ferramentasManutencao,
        dadosVisaoGeral.ferramentasPerdidas
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
                        <p className={styles.porcentagem}>{((dadosVisaoGeral.semEmprestimo / funcionarios) * 100).toFixed(0)}%</p>
                        <p className={styles.texto}>dos funcionários não têm<br />nenhum empréstimo</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.semEmprestimo}</p>
                        <p className={styles.texto}>funcionários não têm<br />nenhum empréstimo</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>{((dadosVisaoGeral.comEmprestimo / funcionarios) * 100).toFixed(0)}%</p>
                        <p className={styles.texto}>dos funcionários têm ao<br />menos um empréstimo</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.comEmprestimo}</p>
                        <p className={styles.texto}>funcionários têm ao<br />menos um empréstimo</p>
                    </div>
                </div>
                <div id={styles.info_ferramentas}>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>{((dadosVisaoGeral.ferramentasDisponiveis / ferramentas) * 100).toFixed(0)}%</p>
                        <p className={styles.texto}>das ferramentas<br />estão disponíveis</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.ferramentasDisponiveis}</p>
                        <p className={styles.texto}>ferramentas<br />estão disponíveis</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>{((dadosVisaoGeral.ferramentasEmprestadas / ferramentas) * 100).toFixed(0)}%</p>
                        <p className={styles.texto}>das ferramentas<br />estão emprestadas</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.ferramentasEmprestadas}</p>
                        <p className={styles.texto}>ferramentas estão<br />emprestadas</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>{dadosVisaoGeral.ferramentasManutencao}</p>
                        <p className={styles.texto}>ferramentas<br />em manutenção</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>{dadosVisaoGeral.ferramentasPerdidas}</p>
                        <p className={styles.texto}>ferramentas<br />estão perdidas</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaoGeral;