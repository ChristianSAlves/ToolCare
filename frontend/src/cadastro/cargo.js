import styles from '../index.css'
import visaoGeral from '../assets/icones/visao_geral.png'
import emprestimos from '../assets/icones/emprestimos.png'
import ferramentas from '../assets/icones/ferramentas.png'
import funcionarios from '../assets/icones/funcionarios.png'
import manutencoes from '../assets/icones/manutencoes.png'
import cargos from '../assets/icones/cargos_laranja.png'
import setores from '../assets/icones/setores.png'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Cargo extends React.Component{

    async componentDidMount(){
        var url = 'http://127.0.0.1:8000/cargos/';
        const response = await fetch(url);
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
        const data = {
            nomeCargo: this.state.nomeCargo,
            descricaoCargo: this.state.descricao,
           };
           
           fetch('http://127.0.0.1:8000/cargos/', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
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
    
}

