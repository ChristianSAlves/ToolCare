import styles from './login.module.css'
import logo from '../../../src/assets/imagens/logo/logo_500.png'
import React from 'react'
import { Navigate } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChange(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        //alert(this.state.username);
        var url = 'http://127.0.0.1:8000/api-token-auth/';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Usuário ou senha inválidos.');
                }
            })
            .then(data => {
                localStorage.setItem('token', data.token);
                this.setState({ token: data.token });
                // Redirecionar para a página visao_geral
            })
            .catch(error => {
                // Exibir um alerta na tela caso o login falhe
                alert('Falha no login: ' + error.message);
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.setState({ token: null });
    }

    render() {
        var token = localStorage.getItem('token');

        if (!token)
            return (
                <div className={styles.container}>
                    <div className={styles.login_container}>
                        <img id={styles.logo} src={logo} alt="logo"></img>
                        <form id={styles.form_login} action="#" onSubmit={this.handleSubmit}>
                            <input type="text" id={styles.username} className={styles.login_item} placeholder="token de acesso" value={this.state.username} onChange={this.handleChange}></input>
                            <input type="password" id={styles.password} className={styles.login_item} placeholder="senha" value={this.state.password} onChange={this.handleChangePassword}></input>
                            <button  type="submit" value="submit" className={styles.login_item} id={styles.botao_entrar}>ENTRAR</button>
                            
                        </form>
                    </div>
                </div>
            );
        else
            return (
                
                <Navigate to="/visao_geral" />
            )
    }
}