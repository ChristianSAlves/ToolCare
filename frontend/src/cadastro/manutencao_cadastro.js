import styles from '../index.css'
import visaoGeralIcon from '../assets/icones/visao_geral.png'
import emprestimosIcon from '../assets/icones/emprestimos.png'
import ferramentasIcon from '../assets/icones/ferramentas.png'
import funcionariosIcon from '../assets/icones/funcionarios.png'
import manutencoesIcon from '../assets/icones/manutencoes_laranja.png'
import cargosIcon from '../assets/icones/cargos.png'
import setoresIcon from '../assets/icones/setores.png'
import logoutIcon from '../assets/icones/logout.png'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

const Manutencao = () => {

    const [Ferramentas, setFerramentas] = useState([]);
    const [idFerramenta, setIdFerramenta] = useState(0);
    const [tipoManutencao, setTipoManutencao] = useState('');
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());

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
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        const linkferramenta = `http://127.0.0.1:8000/setores/${idFerramenta}/`;
    
        const formData = new FormData();
        formData.append('idFerramenta', linkferramenta);
        formData.append('tipoManutencao', tipoManutencao);
        formData.append('dataInicio', dataInicio);
        formData.append('dataFim', dataFim);
    
        try {
            const response = await fetch('http://127.0.0.1:8000/manutencoes/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
                body: formData,
            });
    
        } catch (error) {
            console.error('Error:', error);
            console.log('Detalhes do erro:', error.message);
        }
    };
    

    
        return (
            <div className={styles.container}>
              <div id='tela'>
              <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off" id="cadastro_manutencao_form">
                <p id="cadastro">Cadastro de Manutencao</p>
                <div className='spacer'>
                <label id="ferramenta_label">Ferramenta</label>
                <select name="ferramentas" id="ferramenta_select" required value={idFerramenta} onChange={(evt) => setIdFerramenta(evt.target.value)}>
                <option value={0}>Selecione</option>
                            {Ferramentas.map(ferramenta => (
                                <option key={ferramenta.idFerramenta} value={ferramenta.idFerramenta}>{ferramenta.numSerie}</option>
                            ))}
                </select></div>
                <div className='spacer'>
                <label id="tipo_manutencao_label">Tipo Manutenção</label>
                <select name="tipo_manutencao" id="tipo_manutencao_select" required value={tipoManutencao} onChange={(evt) => setTipoManutencao(evt.target.value)}>
                  <option value="preventiva">Preventiva</option>
                  <option value="corretiva">Corretiva</option>
                </select></div>
                <div className="spacer">
                <label id="data_inicio_label">Data de início</label>
                <input type="date" id="data_inicio_datepicker" required value={dataInicio} onChange={(evt) => setDataInicio(evt.target.value)}></input>
                </div>
                <div className="spacer">
                <label id="data_fim_label">Data de término</label>
                <input type="date" id="data_fim_datepicker" value={dataFim} onChange={(evt) => setDataFim(evt.target.value)}></input>
                </div>
                <button id="enviar" type="submit">ENVIAR</button>
              </form></div>
          
              <nav id="menu">
              <ul>
                      <Link to={"/visao_geral"}>
                          <li id="visao_geral" className="div_navbar">
                              <img src={visaoGeralIcon} className="quadradinho quadradinho_visao_geral"
                                  alt="Ícone de visão geral"></img>
                              <h4 id="texto_visao_geral" className="texto_menu">VISÃO GERAL</h4>
                          </li>
                      </Link>
                      <Link to={"/emprestimo_cadastro"}>
                          <li id="emprestimos" className="div_navbar">
                              <img src={emprestimosIcon} className="quadradinho_emprestimos quadradinho"
                                  alt="Ícone de empréstimos"></img>
                              <h4 id="texto_emprestimos" className="texto_menu">EMPRÉSTIMOS</h4>
                          </li>
                      </Link>
                      <Link to={"/ferramenta_cadastro"}>
                          <li id="ferramentas" className="div_navbar">
                              <img src={ferramentasIcon} className="quadradinho_ferramentas quadradinho"
                                  alt="Ícone de ferramentas"></img>
                              <h4 id="texto_ferramentas" className="texto_menu">FERRAMENTAS</h4>
                          </li>
                      </Link>
                      <Link to={"/funcionario_cadastro"}>
                          <li id="funcionarios" className="div_navbar">
                              <img src={funcionariosIcon} className="quadradinho_funcionarios quadradinho"
                                  alt="Ícone de funcionários"></img>
                              <h4 id="texto_funcionarios" className="texto_menu">FUNCIONÁRIOS</h4>
                          </li>
                      </Link>
                      <Link to={"/manutencao_cadastro"}>
                          <li id="manutencoes" className="div_navbar">
                              <img src={manutencoesIcon} className="quadradinho_manutencoes quadradinho"
                                  alt="Ícone de manutenções"></img>
                              <h4 id="texto_manutencoes" className="texto_menu">MANUTENÇÕES</h4>
                          </li>
                      </Link>
                      <Link to={"/cargo_cadastro"}>
                          <li id="cargos" className="div_navbar">
                              <img src={cargosIcon} className="quadradinho_cargos quadradinho" alt="Ícone de cargos"></img>
                              <h4 id="texto_cargos" className="texto_menu">CARGOS</h4>
                          </li>
                      </Link>
                      <Link to={"/setor_cadastro"}>
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

export default Manutencao;