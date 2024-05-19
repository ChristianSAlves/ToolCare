import { Link } from 'react-router-dom'
import React from 'react'
import styles from './cargo_cadastro.module.css'
import MenuComponent from '../../../components/Menu/Menu';

export default class Cargo extends React.Component{

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
                <MenuComponent></MenuComponent>
              <div id='tela' className={styles.tela}>
              <form onSubmit={this.handleSubmit} action="#" method="post" autoComplete="off" id={styles.cadastro_cargo_form}>
                <p id={styles.cadastro}>Cadastro de Cargo</p>
                <input type="text" id={styles.nomeCargo} name="nomeCargo" required placeholder="Nome" value={this.state.nomeCargo} onChange={this.handleChangeNome}></input>
                <input type="text" id={styles.descricaoCargo} name="descricao" placeholder="Descrição" value={this.state.descricao} onChange={this.handleChangeDescricao}></input>
                <button id={styles.enviar} type="submit">ENVIAR</button>
              </form></div>
            
              
          
              </div>
          
          
            );
        }
    
}

