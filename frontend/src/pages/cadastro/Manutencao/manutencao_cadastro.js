import React, { useState, useEffect } from 'react';
import styles from './manutencao_cadastro.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import CadastradoComponent from '../../../components/Avisos/Cadastrado/cadastrado';
import FalhaCadastroComponent from '../../../components/Avisos/FalhaCadastro/falha_cadastro';

const Manutencao = () => {
    const [Ferramentas, setFerramentas] = useState([]);
    const [codFerramenta, setCodFerramenta] = useState(0);
    const [tipoManutencao, setTipoManutencao] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const responseFerramentas = await fetch('http://127.0.0.1:8000/ferramentas/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseFerramentas.ok) {
                    throw new Error('Erro ao carregar as Ferramentas');
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

        const token = localStorage.getItem('token');
        const linkferramenta = `http://127.0.0.1:8000/ferramentas/${codFerramenta}/`;
        const dataInicio = new Date().toISOString().split('T')[0];

        const formData = new FormData();
        formData.append('codFerramenta', linkferramenta);
        formData.append('tipoManutencao', tipoManutencao);
        formData.append('dataInicio', dataInicio);
        formData.append('dataFim', '');

        try {
            const response = await fetch('http://127.0.0.1:8000/manutencoes/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Success:', responseData);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000); // Ocultar após 3 segundos

                // Limpar os inputs após o cadastro bem-sucedido
                setCodFerramenta(0);
                setTipoManutencao('');
            } else {
                console.error('Failed to submit form:', response.status, response.statusText);
                const errorData = await response.json();
                console.log('Error details:', errorData);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000); // Ocultar após 3 segundos
            }

        } catch (error) {
            console.error('Error:', error);
            console.log('Detalhes do erro:', error.message);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000); // Ocultar após 3 segundos
        }
    };

    return (
        <div className={styles.container}>
            <MenuComponent id={styles.menu}></MenuComponent>
            <div id='tela' className={styles.tela}>
                <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off" id={styles.cadastro_manutencao_form}>
                    <p id={styles.cadastro}>Cadastro de Manutenção</p>
                    <div className={styles.spacer}>
                        <label id={styles.ferramenta_label}>Ferramenta</label>
                        <select name="ferramentas" id={styles.ferramenta_select} required value={codFerramenta} onChange={(evt) => setCodFerramenta(evt.target.value)}>
                            <option value={0}>Selecione</option>
                            {Ferramentas.filter(ferramenta => ferramenta.status.toLowerCase() === 'disponível').map(ferramenta => (
                                <option key={ferramenta.codFerramenta} value={ferramenta.codFerramenta}>{ferramenta.numSerie}</option>
                            ))}
                        </select>

                    </div>
                    <div className={styles.spacer}>
                        <label id={styles.tipo_manutencao_label}>Tipo</label>
                        <select name="tipo_manutencao" id={styles.tipo_manutencao_select} required value={tipoManutencao} onChange={(evt) => setTipoManutencao(evt.target.value)}>
                            <option value={0}>Selecione</option>
                            <option value="Preventiva">Preventiva</option>
                            <option value="Corretiva">Corretiva</option>
                        </select>
                    </div>
                    <button id={styles.enviar} type="submit">ENVIAR</button>
                </form>
                {showSuccess && <CadastradoComponent />}
                {showError && <FalhaCadastroComponent />}
            </div>
        </div>
    );
}

export default Manutencao;
