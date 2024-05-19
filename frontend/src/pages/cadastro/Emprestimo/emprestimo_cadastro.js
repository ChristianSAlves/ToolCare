import styles from './emprestimo_cadastro.module.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'



const Emprestimo = () => {
    const [numSerie, setNumSerie] = useState(0);
    const [ferramentas, setFerramentas] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        const fetchData = async () => {
            try {
                // Busca as Ferramentas
                const responseFerramentas = await fetch('http://127.0.0.1:8000/ferramentas/', {
                    headers: {
                        'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                    },
                });
                if (!responseFerramentas.ok) {
                    throw new Error('Erro ao carregar os Ferramentas');
                }
                const dataFerramentas = await responseFerramentas.json();
                setFerramentas(dataFerramentas); 
                
                // Busca Funcionarios
                const responseFuncionarios = await fetch('http://127.0.0.1:8000/funcionarios/', {
                    headers: {
                        'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                    },
                });
                if (!responseFuncionarios.ok) {
                    throw new Error('Erro ao carregar os Funcionarios');
                }
                const dataFuncionarios = await responseFuncionarios.json();
                setFuncionarios(dataFuncionarios);
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className={styles.container}>

            <div id="tela">
                <form action="#" method="post" autoComplete="off" id="cadastro_emprestimo_form">
                        <p id="cadastro">Cadastro de Empréstimo</p>
                        <div className='spacer'>
                        <label>Ferramentas</label>
                        <select name="numSerieFerramenta" id="ferramenta_select" value={numSerie} onChange={evt => setNumSerie(evt.target.value)}>
                            <option value={0}>Selecione</option>
                            {ferramentas.map(ferramenta => (
                                <option key={ferramenta.idFerramenta} value={ferramenta.numSerie}>{ferramenta.numSerie}</option>
                            ))}
                        </select></div>
                        <div className="spacer">
                            <label id='funcionario_label'>Funcionário</label>
                            <select name="funcionario" id="funcionario_select" required>
                                <option value="ferramenta">Funcionario 1</option>
                                <option value="ferramenta2">Funcionario 2</option>
                                <option value="ferramenta3">Funcionario 3</option>
                            </select>
                        </div>
                        <div className="spacer">
                        <label id='data_emprestimo_label'>Data do Empréstimo</label>
                            <input type="date" name='data_emprestimo' id="data_emprestimo_datepicker" required></input>
                        </div>
                        <div className="spacer">
                        <label id='data_devolucao_label'>Data da Devolução</label>
                            <input type="date" name='data_devolucao' id="data_devolucao_datepicker" required></input>
                        </div>
                        <input type="text" id="observacoes" name="observacoes" placeholder="Observações"></input>
                        <button id="enviar" type="submit">ENVIAR</button>
                </form>
            </div>


        </div>


    );

}

export default Emprestimo;