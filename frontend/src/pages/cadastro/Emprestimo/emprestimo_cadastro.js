import styles from './emprestimo_cadastro.module.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import MenuComponent from '../../../components/Menu/Menu'

const Emprestimo = () => {

    const [ferramentas, setFerramentas] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [idFuncionario, setIdFuncionario] = useState(0);
    const [dataEmprestimo, setDataEmprestimo] = useState(new Date());
    const [observacoes, setObservacoes] = useState('');
    const [codFerramenta, setCodFerramenta] = useState(0);
    

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        const fetchData = async () => {
            try {
                // Busca as Ferramentas
                const responseFerramentas = await fetch('http://127.0.0.1:8000/ferramentas/', {
                    headers: {
                        'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                    },
                });
                if (!responseFerramentas.ok) {
                    throw new Error('Erro ao carregar os Ferramentas');
                }
                const dataFerramentas = await responseFerramentas.json();
                setFerramentas(dataFerramentas); 
                
                // Busca Funcionarios
                const responseFuncionarios = await fetch('http://127.0.0.1:8000/funcionarios/', {
                    headers: {
                        'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                    },
                });
                if (!responseFuncionarios.ok) {
                    throw new Error('Erro ao carregar os Funcionarios');
                }
                const dataFuncionarios = await responseFuncionarios.json();
                setFuncionarios(dataFuncionarios);
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
        const linkFerramenta = `http://127.0.0.1:8000/ferramentas/${codFerramenta}/`;
        const linkFuncionario = `http://127.0.0.1:8000/ferramentas/${idFuncionario}/`;
    
        const formData = new FormData();
        formData.append('matriculaFuncionario', linkFuncionario);
        formData.append('dataEmprestimo', dataEmprestimo);
        formData.append('numSerie', linkFerramenta);
        formData.append('dataDevolucao', "");
        formData.append('observacoes', observacoes);
    
        try {
            const response = await fetch('http://127.0.0.1:8000/emprestimos/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`, 
                },
                body: formData,
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log('Success:', responseData);
            } else {
                console.error('Failed to submit form:', response.status, response.statusText);
                const errorData = await response.json();
                console.log('Error details:', errorData);
            }
    
        } catch (error) {
            console.error('Error:', error);
            console.log('Detalhes do erro:', error.message);
        }
    };

    return (
        <div className={styles.container}>
            <MenuComponent id={styles.menu}></MenuComponent>
            <div className={styles.tela}>
                <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off" id={styles.cadastro_emprestimo_form}>
                        <p id={styles.cadastro}>Cadastro de Empréstimo</p>
                        <div className={styles.spacer}>
                        <label id={styles.ferramenta_label}>Ferramentas</label>
                        <select name="codFerramenta" id={styles.ferramenta_select} value={codFerramenta} onChange={evt => setCodFerramenta(evt.target.value)}>
                            <option value={0}>Selecione</option>
                            {ferramentas.map(ferramenta => (
                                <option key={ferramenta.codFerramenta} value={ferramenta.codFerramenta}>{ferramenta.numSerie}</option>
                            ))}
                        </select></div>
                        <div className={styles.spacer}>
                            <label id={styles.funcionario_label}>Funcionário</label>
                            <select name="funcionario" id={styles.funcionario_select} required value={idFuncionario} onChange={evt => setIdFuncionario(evt.target.value)}> 
                            <option value={0}>Selecione</option>
                            {funcionarios.map(funcionario => (
                                <option key={funcionario.idFuncionario} value={funcionario.idFuncionario}>{funcionario.nome}</option>
                            ))}
                            </select>
                        </div>
                        <div className={styles.spacer}>
                        <label id={styles.data_emprestimo_label}>Data Empréstimo</label>
                            <input type="date" name='data_emprestimo' id={styles.data_emprestimo_datepicker} required value={dataEmprestimo} onChange={evt => setDataEmprestimo(evt.target.value)}></input>
                        </div>
                        <input type="text" id={styles.observacoes} name="observacoes" placeholder="Observações" value={observacoes} onChange={evt => setObservacoes(evt.target.value)}></input>
                        <button id={styles.enviar}type="submit">ENVIAR</button>
                </form>
            </div>


        </div>


    );

}

export default Emprestimo;