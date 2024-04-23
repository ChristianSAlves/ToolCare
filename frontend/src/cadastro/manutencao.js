import styles from '../index.css'
import visaoGeral from '../assets/icones/visao_geral.png'
import emprestimos from '../assets/icones/emprestimos.png'
import ferramentas from '../assets/icones/ferramentas.png'
import funcionarios from '../assets/icones/funcionarios.png'
import manutencoes from '../assets/icones/manutencoes_laranja.png'
import cargos from '../assets/icones/cargos.png'
import setores from '../assets/icones/setores.png'
import { Link } from 'react-router-dom'

function Manutencao(){
        return (
            <div className={styles.container}>
              <div id='tela'>
              <form action="#" method="post" autoComplete="off" id="cadastro_manutencao_form">
                <p id="cadastro">Cadastro de Manutencao</p>
                <input id="codigo" name="codigo" type="number" placeholder="Código" required></input>
                <div className='spacer'>
                <label id="ferramenta_label">Ferramenta</label>
                <select name="ferramentas" id="ferramenta_select" required>
                  <option value="ferramenta1">Ferramenta1</option>
                  <option value="ferramenta2">Ferramenta2</option>
                  <option value="ferramenta3">Ferramenta3</option>
                </select></div>
                <div className='spacer'>
                <label id="tipo_manutencao_label">Tipo </label>
                <select name="tipo_manutencao" id="tipo_manutencao_select" required>
                  <option value="emprestada">Tipo1</option>
                  <option value="disponivel">Tipo2</option>
                  <option value="perdida">Tipo3</option>
                </select></div>
                <div className="spacer">
                <label id="data_inicio_label">Data de início</label>
                <input type="date" id="data_inicio_datepicker" required></input>
                </div>
                <div className="spacer">
                <label id="data_fim_label">Data de término</label>
                <input type="date" id="data_fim_datepicker"></input>
                </div>
                <button id="enviar" type="submit">ENVIAR</button>
              </form></div>
          
              <nav id="menu">
                  <ul>
                      <Link to={"/visao_geral"}>
                          <li id="visao_geral" className="div_navbar">
                              <img src={visaoGeral} className="quadradinho quadradinho_visao_geral"
                                  alt="Ícone de visão geral"></img>
                              <h4 id="texto_visao_geral" className="texto_menu">VISÃO GERAL</h4>
                          </li>
                      </Link>
                      <Link to={"/emprestimo"}>
                          <li id="emprestimos" className="div_navbar">
                              <img src={emprestimos} className="quadradinho_emprestimos quadradinho"
                                  alt="Ícone de empréstimos"></img>
                              <h4 id="texto_emprestimos" className="texto_menu">EMPRÉSTIMOS</h4>
                          </li>
                      </Link>
                      <Link to={"/ferramenta"}>
                          <li id="ferramentas" className="div_navbar">
                              <img src={ferramentas} className="quadradinho_ferramentas quadradinho"
                                  alt="Ícone de ferramentas"></img>
                              <h4 id="texto_ferramentas" className="texto_menu">FERRAMENTAS</h4>
                          </li>
                      </Link>
                      <Link to={"/funcionario"}>
                          <li id="funcionarios" className="div_navbar">
                              <img src={funcionarios} className="quadradinho_funcionarios quadradinho"
                                  alt="Ícone de funcionários"></img>
                              <h4 id="texto_funcionarios" className="texto_menu">FUNCIONÁRIOS</h4>
                          </li>
                      </Link>
                      <Link to={"/manutencao"}>
                          <li id="manutencoes" className="div_navbar">
                              <img src={manutencoes} className="quadradinho_manutencoes quadradinho"
                                  alt="Ícone de manutenções"></img>
                              <h4 id="texto_manutencoes" className="texto_menu">MANUTENÇÕES</h4>
                          </li>
                      </Link>
                      <Link to={"/cargo"}>
                          <li id="cargos" className="div_navbar">
                              <img src={cargos} className="quadradinho_cargos quadradinho" alt="Ícone de cargos"></img>
                              <h4 id="texto_cargos" className="texto_menu">CARGOS</h4>
                          </li>
                      </Link>
                      <Link to={"/setor"}>
                          <li id="setores" className="div_navbar">
                              <img src={setores} className="quadradinho_setores quadradinho"
                                  alt="Ícone de setores"></img>
                              <h4 id="texto_setores" className="texto_menu">SETORES</h4>
                          </li>
                      </Link>
                  </ul>
              </nav>
          
              </div>
          
          
            );
    }

export default Manutencao;