import styles from '../index.css'
import visaoGeral from '../assets/icones/visao_geral.png'
import emprestimos from '../assets/icones/emprestimos.png'
import ferramentas from '../assets/icones/ferramentas_laranja.png'
import funcionarios from '../assets/icones/funcionarios.png'
import manutencoes from '../assets/icones/manutencoes.png'
import cargos from '../assets/icones/cargos.png'
import setores from '../assets/icones/setores.png'
import { Link } from 'react-router-dom'

function Ferramenta(){
        return (
            <div className={styles.container}>
              <div id='tela'>
              <form action="#" method="post" autocomplete="off" id="cadastro_ferramenta_form">
                <p id="cadastro">Cadastro de Ferramenta</p>
                <input id="nome" name="nome" type="text" placeholder="Nome" required></input>
                <input id="numero_serie" name="numero_serie" type="number" placeholder="Número de Série" required></input>
                <input id="descricao" name="descricao" type="text" placeholder="Descrição" ></input>
                <div className='spacer'>
                <label for = "status" id="status_label">Status</label>
                <select name="status" id="status_select" required>
                  <option value="emprestada">Emprestada</option>
                  <option value="disponivel">Disponível</option>
                  <option value="perdida">Perdida</option>
                  <option value="manutencao">Manutenção</option>
                </select></div>
                <div className="spacer">
                <label for = "data_aquisicao_datepicker" id="data_aquisicao_label">Data de aquisição</label>
                <input type="date" id="data_aquisicao_datepicker" required></input>
                </div>
                <div className="spacer">
                <label for = "data_baixa_datepicker" id="data_baixa_label">Data de baixa</label>
                <input type="date" id="data_baixa_datepicker"></input>
                </div>
                <div className='spacer'>
                <label for="foto" id='foto_label'>Foto</label>
                <input type="file" id="foto" name="foto" accept=".png,.jpg,.jpeg" required></input></div>
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

export default Ferramenta;
