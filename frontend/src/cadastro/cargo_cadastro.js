import styles from '../index.css'
import visaoGeralIcon from '../assets/icones/visao_geral.png'
import emprestimosIcon from '../assets/icones/emprestimos.png'
import ferramentasIcon from '../assets/icones/ferramentas.png'
import funcionariosIcon from '../assets/icones/funcionarios.png'
import manutencoesIcon from '../assets/icones/manutencoes.png'
import cargosIcon from '../assets/icones/cargos_laranja.png'
import setoresIcon from '../assets/icones/setores.png'
import logoutIcon from '../assets/icones/logout.png'
import { Link } from 'react-router-dom'
import React from 'react'

export default class CargoCadastro extends React.Component{

    async componentDidMount() {
        const url = 'http://127.0.0.1:8000/cargos/';
    
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        config.headers['Authorization'] = 'Token ' + localStorage.getItem('token');

        const response = await fetch(url, config);
        const data = await response.json();
        console.log(data);
    }

    constructor(props) {
        super(props);
        this.state = {nomeCargo: '', 
        descricao: ''
    };
    
        this.handleChangeNome = this.handleChangeNome.bind(this);
        this.handleChangeDescricao = this.handleChangeDescricao.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    handleChangeNome(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    handleChangeDescricao(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
      
        this.setState({
          [name]: value
        });
      }
    
    
      handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            nomeSetor: this.state.nomeSetor,
            descricaoSetor: this.state.descricaoSetor,
        };
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        config.headers['Authorization'] = 'Token ' + token;
    
        fetch('http://127.0.0.1:8000/setores/', {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }
    
    
    render()
    {
        return (
            <div className={styles.container}>
                
            
              <div id='tela'>
              <form onSubmit={this.handleSubmit} action="#" method="post" autoComplete="off" id="cadastro_cargo_form">
                <p id="cadastro">Cadastro de Cargo</p>
                <input type="text" id="nomeCargo" name="nomeCargo" required placeholder="Nome" value={this.state.nomeCargo} onChange={this.handleChangeNome}></input>
                <input type="text" id="descricao" name="descricao" placeholder="Descrição" value={this.state.descricao} onChange={this.handleChangeDescricao}></input>
                <button id="enviar" type="submit">ENVIAR</button>
              </form></div>

            

              <Link to={"/login"} className='link_adicionar'>
                <p className='adicionar'>+</p>
                      </Link>

            
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
    
}


