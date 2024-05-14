import styles from '../index.css'
import visaoGeralIcon from '../assets/icones/visao_geral.png'
import emprestimosIcon from '../assets/icones/emprestimos_laranja.png'
import ferramentasIcon from '../assets/icones/ferramentas.png'
import funcionariosIcon from '../assets/icones/funcionarios.png'
import manutencoesIcon from '../assets/icones/manutencoes.png'
import cargosIcon from '../assets/icones/cargos.png'
import setoresIcon from '../assets/icones/setores.png'
import logoutIcon from '../assets/icones/logout.png'
import { Link } from 'react-router-dom'
import { MultiSelect } from '../components/ferramentas_multiselect'
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

            <nav id="menu">
            <ul>
                      <Link to={"/visao_geral"}>
                          <li id="visao_geral" className="div_navbar">
                              <img src={visaoGeralIcon} className="quadradinho quadradinho_visao_geral"
                                  alt="Ícone de visão geral"></img>
                              <h4 id="texto_visao_geral" className="texto_menu">VISÃO GERAL</h4>
                          </li>
                      </Link>
                      <Link to={"/emprestimo"}>
                          <li id="emprestimos" className="div_navbar">
                              <img src={emprestimosIcon} className="quadradinho_emprestimos quadradinho"
                                  alt="Ícone de empréstimos"></img>
                              <h4 id="texto_emprestimos" className="texto_menu">EMPRÉSTIMOS</h4>
                          </li>
                      </Link>
                      <Link to={"/ferramenta"}>
                          <li id="ferramentas" className="div_navbar">
                              <img src={ferramentasIcon} className="quadradinho_ferramentas quadradinho"
                                  alt="Ícone de ferramentas"></img>
                              <h4 id="texto_ferramentas" className="texto_menu">FERRAMENTAS</h4>
                          </li>
                      </Link>
                      <Link to={"/funcionario"}>
                          <li id="funcionarios" className="div_navbar">
                              <img src={funcionariosIcon} className="quadradinho_funcionarios quadradinho"
                                  alt="Ícone de funcionários"></img>
                              <h4 id="texto_funcionarios" className="texto_menu">FUNCIONÁRIOS</h4>
                          </li>
                      </Link>
                      <Link to={"/manutencao"}>
                          <li id="manutencoes" className="div_navbar">
                              <img src={manutencoesIcon} className="quadradinho_manutencoes quadradinho"
                                  alt="Ícone de manutenções"></img>
                              <h4 id="texto_manutencoes" className="texto_menu">MANUTENÇÕES</h4>
                          </li>
                      </Link>
                      <Link to={"/cargo"}>
                          <li id="cargos" className="div_navbar">
                              <img src={cargosIcon} className="quadradinho_cargos quadradinho" alt="Ícone de cargos"></img>
                              <h4 id="texto_cargos" className="texto_menu">CARGOS</h4>
                          </li>
                      </Link>
                      <Link to={"/setor"}>
                          <li id="setores" className="div_navbar">
                              <img src={setoresIcon} className="quadradinho_setores quadradinho"
                                  alt="Ícone de setores"></img>
                              <h4 id="texto_setores" className="texto_menu">SETORES</h4>
                          </li>
                      </Link>
                      <Link to={"/login"}>
                      <li id="logout" className="div_navbar">
                              <img src={logoutIcon} className="quadradinho_logout quadradinho"
                                  alt="Ícone de logout"></img>
                              <h4 id="texto_logout" className="texto_menu">SAIR</h4>
                          </li>
                          </Link>
                  </ul>
            </nav>

        </div>


    );

}

export default Emprestimo;
