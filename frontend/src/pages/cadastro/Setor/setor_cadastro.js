import styles from './setor_cadastro.module.css'
import { Link } from 'react-router-dom'
import React from 'react'
import MenuComponent from '../../../components/Menu/Menu';

export default class Setor extends React.Component {

    async componentDidMount() {
        var url = 'http://127.0.0.1:8000/setores/';
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }

    constructor(props) {
        super(props);
        this.state = {
            nomeSetor: '',
            descricaoSetor: ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescricao = this.handleChangeDescricao.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeName(event) {
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


    handleSubmit(event) {
        event.preventDefault();
        const data = {
            nomeSetor: this.state.nomeSetor,
            descricaoSetor: this.state.descricaoSetor,
        };

        fetch('http://127.0.0.1:8000/setores/', {
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
    render() {
        return (
            <div className={styles.container}>
                <MenuComponent></MenuComponent>

                <div id='tela' className={styles.tela}>
                    <form onSubmit={this.handleSubmit} action="#" method="post" autoComplete="off" id={styles.cadastro_setor_form}>
                        <p id={styles.cadastro}>Cadastro de Setor</p>
                        <input type="text" id={styles.nomeSetor} name="nomeSetor" required placeholder="Nome" value={this.state.nomeSetor} onChange={this.handleChangeName}></input>
                        <input type="text" id={styles.descricaoSetor} name="descricaoSetor" placeholder="Descrição" value={this.state.descricaoSetor} onChange={this.handleChangeDescricao}></input>
                        <button id={styles.enviar} type="submit">ENVIAR</button>
                    </form></div>

            </div>


        );
    }

}