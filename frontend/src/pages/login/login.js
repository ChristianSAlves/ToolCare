import styles from '../../../src/index.css'
import login from '../../../src/assets/imagens/mario.png'
import React from 'react'
import { Route, Navigate } from "react-router-dom";


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
      alert(this.state.username);
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
  
  logout(){
    localStorage.removeItem('token');
    this.setState({token: null});
}

    render() {
        var token = localStorage.getItem('token');

        if(!token)
        return (
            <div className={styles.container}>
                <div className="login_container">
                    <img id="logo" src={login} alt=""></img>
                    <form id="form_login" action="#" onSubmit={this.handleSubmit}>
                        <input type="text" id="username" className="login_item input" placeholder="token de acesso" value={this.state.username} onChange={this.handleChange}></input>
                        <input type="password" id="password" className="login_item input senha" placeholder="senha" value={this.state.password} onChange={this.handleChangePassword}></input>
                        <button type="submit" value="submit" className="login_item" id="botao_entrar">ENTRAR</button>
                    </form>
                </div>
            </div>
        );
        else
        return(
            <Navigate to="/funcionario" />
    )
    }
}
