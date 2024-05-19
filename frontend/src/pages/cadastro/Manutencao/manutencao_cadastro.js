import styles from './manutencao_cadastro.module.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import MenuComponent from '../../../components/Menu/Menu';

const Manutencao = () => {

    const [Ferramentas, setFerramentas] = useState([]);
    const [idFerramenta, setIdFerramenta] = useState(0);
    const [tipoManutencao, setTipoManutencao] = useState('');
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());

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
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        const linkferramenta = `http://127.0.0.1:8000/setores/${idFerramenta}/`;
    
        const formData = new FormData();
        formData.append('idFerramenta', linkferramenta);
        formData.append('tipoManutencao', tipoManutencao);
        formData.append('dataInicio', dataInicio);
        formData.append('dataFim', dataFim);
    
        try {
            const response = await fetch('http://127.0.0.1:8000/manutencoes/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
                body: formData,
            });
    
        } catch (error) {
            console.error('Error:', error);
            console.log('Detalhes do erro:', error.message);
        }
    };
    

    
        return (
            <div className={styles.container}>

            <MenuComponent id={styles.menu}></MenuComponent>

              <div id='tela' className={styles.tela}>
              <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off" id={styles.cadastro_manutencao_form}>
                <p id={styles.cadastro}>Cadastro de Manutencão</p>
                <div className={styles.spacer}>
                <label id={styles.ferramenta_label}>Ferramenta</label>
                <select name="ferramentas" id={styles.ferramenta_select} required value={idFerramenta} onChange={(evt) => setIdFerramenta(evt.target.value)}>
                <option value={0}>Selecione</option>
                            {Ferramentas.map(ferramenta => (
                                <option key={ferramenta.idFerramenta} value={ferramenta.idFerramenta}>{ferramenta.numSerie}</option>
                            ))}
                </select></div>
                <div className={styles.spacer}>
                <label id={styles.tipo_manutencao_label} >Tipo Manutenção</label>
                <select name="tipo_manutencao" id={styles.tipo_manutencao_select} required value={tipoManutencao} onChange={(evt) => setTipoManutencao(evt.target.value)}>
                  <option value="preventiva">Preventiva</option>
                  <option value="corretiva">Corretiva</option>
                </select></div>
                <div className={styles.spacer}>
                <label id={styles.data_inicio_label}>Data de início</label>
                <input type="date" id={styles.data_inicio_datepicker} required value={dataInicio} onChange={(evt) => setDataInicio(evt.target.value)}></input>
                </div>
                <div className={styles.spacer}>
                <label id={styles.data_fim_label}>Data de término</label>
                <input type="date" id={styles.data_fim_datepicker} value={dataFim} onChange={(evt) => setDataFim(evt.target.value)}></input>
                </div>
                <button id={styles.enviar} type="submit">ENVIAR</button>
              </form></div>
        
          
              </div>
          
          
            );
    }

export default Manutencao;