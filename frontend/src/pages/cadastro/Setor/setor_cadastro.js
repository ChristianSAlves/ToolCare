import React from 'react';
import styles from './setor_cadastro.module.css';
import { Link } from 'react-router-dom';
import MenuComponent from '../../../components/Menu/Menu';
import CadastradoComponent from '../../../components/Avisos/Cadastrado/cadastrado';
import FalhaCadastroComponent from '../../../components/Avisos/FalhaCadastro/falha_cadastro';
import withApi from '../../../withApi'; 

class Setor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nomeSetor: '',
            descricaoSetor: '',
            showSuccess: false,
            showError: false,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescricao = this.handleChangeDescricao.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { apiUrl } = this.props.apiContext; 
        const url = `${apiUrl}/setores/`;
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
            },
        };

        const response = await fetch(url, config);
        const data = await response.json();
        console.log(data);
    }

    handleChangeName(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleChangeDescricao(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { apiUrl } = this.props.apiContext; 
        const token = localStorage.getItem('token');
        const data = {
            nomeSetor: this.state.nomeSetor,
            descricaoSetor: this.state.descricaoSetor,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        };

        try {
            const response = await fetch(`${apiUrl}/setores/`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar setor');
            }

            const responseData = await response.json();
            console.log('Success:', responseData);
            this.setState({ showSuccess: true, showError: false });
            setTimeout(() => this.setState({ showSuccess: false }), 3000); 
            this.setState({
                nomeSetor: '',
                descricaoSetor: '',
            });
        } catch (error) {
            console.error('Error:', error);
            this.setState({ showError: true, showSuccess: false });
            setTimeout(() => this.setState({ showError: false }), 3000);
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <MenuComponent></MenuComponent>
                <Link to={'/setor'}>
                <p id={styles.voltar}>  &lt; </p>
                </Link>
                <div id='tela' className={styles.tela}>
                    <form onSubmit={this.handleSubmit} action="#" method="post" autoComplete="off" id={styles.cadastro_setor_form}>
                        <p id={styles.cadastro}>Cadastro de Setor</p>
                        <input type="text" id={styles.nomeSetor} name="nomeSetor" required placeholder="Nome" value={this.state.nomeSetor} onChange={this.handleChangeName}></input>
                        <input type="text" id={styles.descricaoSetor} name="descricaoSetor" placeholder="Descrição" value={this.state.descricaoSetor} onChange={this.handleChangeDescricao}></input>
                        <button id={styles.enviar} type="submit">ENVIAR</button>
                    </form>
                    {this.state.showSuccess && <CadastradoComponent />}
                    {this.state.showError && <FalhaCadastroComponent />}
                </div>
            </div>
        );
    }
}

export default withApi(Setor);
