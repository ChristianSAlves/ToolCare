import { Link } from 'react-router-dom'
import React from 'react'
import styles from './cargo_cadastro.module.css'
import MenuComponent from '../../../components/Menu/Menu';
import CadastradoComponent from '../../../components/Avisos/Cadastrado/cadastrado';
import FalhaCadastroComponent from '../../../components/Avisos/FalhaCadastro/falha_cadastro';

export default class Cargo extends React.Component{

    async componentDidMount() {
        const url = 'http://127.0.0.1:8000/cargos/';
    
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        };

        const response = await fetch(url, config);
        const data = await response.json();
        console.log(data);
    }

    constructor(props) {
        super(props);
        this.state = {
            nomeCargo: '', 
            descricaoCargo: '',
            showSuccess: false,
            showError: false
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
    
    
    handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            nomeCargo: this.state.nomeCargo,
            descricaoCargo: this.state.descricaoCargo,
        };
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        };
    
        try {
            const response = await fetch('http://127.0.0.1:8000/cargos/', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao cadastrar cargo');
            }
    
            const responseData = await response.json();
            console.log('Success:', responseData);
            this.setState({ showSuccess: true, showError: false });
            setTimeout(() => this.setState({ showSuccess: false }), 3000); // Ocultar após 3 segundos
    
            // Limpar os inputs após o cadastro bem-sucedido
            this.setState({
                nomeCargo: '',
                descricaoCargo: '',
            });
        } catch (error) {
            console.error('Error:', error);
            this.setState({ showError: true, showSuccess: false });
            setTimeout(() => this.setState({ showError: false }), 3000); // Ocultar após 3 segundos
        }
    }
    
    
    render() {
        return (
            <div className={styles.container}>
                <MenuComponent></MenuComponent>
              <div id='tela' className={styles.tela}>
              <form onSubmit={this.handleSubmit} action="#" method="post" autoComplete="off" id={styles.cadastro_cargo_form}>
                <p id={styles.cadastro}>Cadastro de Cargo</p>
                <input type="text" id={styles.nomeCargo} name="nomeCargo" required placeholder="Nome" value={this.state.nomeCargo} onChange={this.handleChangeNome}></input>
                <input type="text" id={styles.descricaoCargo} name="descricaoCargo" placeholder="Descrição" value={this.state.descricaoCargo} onChange={this.handleChangeDescricao}></input>
                <button id={styles.enviar} type="submit">ENVIAR</button>
              </form>
              {this.state.showSuccess && <CadastradoComponent />}
              {this.state.showError && <FalhaCadastroComponent />}
              </div>
            </div>
          );
        }
}
