import styles from '../index.css'
import visaoGeral from '../assets/icones/visao_geral.png'
import emprestimos from '../assets/icones/emprestimos.png'
import ferramentas from '../assets/icones/ferramentas.png'
import funcionarios from '../assets/icones/funcionarios_laranja.png'
import manutencoes from '../assets/icones/manutencoes.png'
import cargos from '../assets/icones/cargos.png'
import setores from '../assets/icones/setores.png'
import { Link } from 'react-router-dom'
import React from 'react'
//import React, { useState } from 'react';
//import axios from 'axios';

export default class Funcionario extends React.Component{

    async componentDidMount(){
        var url = 'http://127.0.0.1:8000/funcionarios/';
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }

    constructor(props) {
        super(props);
        this.state = {
        nome: '', 
        matriculaFuncionario: '',
        cpf: '',
        codigoSetor: '',
        codigoCargo: '',
        imgFunc: ''
    };
    
        this.handleChangeNome = this.handleChangeNome.bind(this);
        this.handleChangeMatricula = this.handleChangeMatricula.bind(this);
        this.handleChangeCodCargo = this.handleChangeCodCargo.bind(this);
        this.handleChangeCodSetor = this.handleChangeCodSetor.bind(this);
        this.handleChangeCpf = this.handleChangeCpf.bind(this);
        this.handleChangeImage = this. handleChangeImage.bind(this);
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

    handleChangeCpf(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    handleChangeCodSetor(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    handleChangeCodCargo(event) {
        this.setState({ cargo: event.target.value });
     }


    handleChangeMatricula(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    handleChangeImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const binaryString = reader.result;
        const blob = new Blob([binaryString], { type: file.type });
        this.setState({ imgFunc: blob });
    };

    reader.readAsArrayBuffer(file);
      };
    
    
      handleSubmit = async (event) => {
        event.preventDefault();

    const formData = new FormData();
    formData.append('nome', this.state.nome);
    formData.append('matriculaFuncionario', this.state.matriculaFuncionario);
    formData.append('cpf', this.state.cpf);
    formData.append('codigoSetor', this.state.codigoSetor);
    formData.append('codigoCargo', this.state.codigoCargo);
    formData.append('imgFunc', this.state.imgFunc);

    try {
        const response = await fetch('http://127.0.0.1:8000/funcionarios/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar imagem');
        }

        const data = await response.json();
        console.log('Success:', data);
        this.setState({ imgFunc: null });
    } catch (error) {
        console.error('Error:', error);
        this.setState({ imgFunc: null });
    }
      }
    render(){
        return (
            
            <div className={styles.container}>
              <div id='tela'>
              <form onSubmit={this.handleSubmit} action="#" method="post" autoComplete="off" id="cadastro_funcionario_form">
                <p id="cadastro">Cadastro de Funcionário</p>
                <input id="nome" name="nome" type="text" placeholder="Nome" required value={this.state.nome} onChange={this.handleChangeNome}></input>
                <input id="matriculaFuncionario" name="matriculaFuncionario" type="text" placeholder="Matrícula" required value={this.state.matriculaFuncionario} onChange={this.handleChangeMatricula}></input>
                <input id="cpf" name="cpf" type="text" placeholder="CPF" required value={this.state.cpf} onChange={this.handleChangeCpf}></input>
                <div id='spacer'>
                <label id="setor_label">Setor</label>
                <select name="setor" id="setor_select" required value={this.state.setor} onChange={this.handleChangeCodSetor}>
                  <option value="setor1">1</option>
                  <option value="setor2">1</option>
                  <option value="setor3">1</option>
                </select></div>
                <div id="spacer">
                <label id="cargo_label">Cargo</label>
                <select name="cargo" id="cargo_select" onChange={this.handleChangeCodCargo} value={this.state.cargo}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select></div>
                <div id='spacer'>
                <label id='foto_label'>Foto</label>
                <input type="file" id="foto" name="foto" accept=".png,.jpg,.jpeg" onChange={this.handleChangeImage}></input>
                <span>{this.state.imgFunc ? this.state.imgFunc.name : 'Nenhum arquivo selecionado'}</span>
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
}


