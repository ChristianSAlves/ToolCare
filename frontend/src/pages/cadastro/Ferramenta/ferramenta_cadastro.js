import React, { useState } from 'react';
import styles from './ferramenta_cadastro.module.css';
import { Link } from 'react-router-dom';
import defaultFerramenta from '../../../assets/imagens/defaultFerramenta.jpg';
import MenuComponent from '../../../components/Menu/Menu';
import CadastradoComponent from '../../../components/Avisos/Cadastrado/cadastrado';
import FalhaCadastroComponent from '../../../components/Avisos/FalhaCadastro/falha_cadastro';
import { useApi } from '../../../../src/ApiContext.js';

const FerramentaCadastro = () => {
    const [nome, setNome] = useState('');
    const [numSerie, setNumSerie] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imgFerramenta, setImgFerramenta] = useState(null);
    const [dataAquisicao, setDataAquisicao] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const { apiUrl } = useApi();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('numSerie', numSerie);
        formData.append('descricao', descricao);

        if (imgFerramenta) {
            formData.append('imgFerramenta', imgFerramenta, imgFerramenta.name);
        } else {
            const response = await fetch(defaultFerramenta);
            const blob = await response.blob();
            const file = new File([blob], 'defaultFerramenta.jpg', { type: 'image/jpeg' });
            formData.append('imgFerramenta', file);
        }

        formData.append('dataAquisicao', dataAquisicao);
        formData.append('status', 'Disponível'); 

        try {
            const response = await fetch(`${apiUrl}/ferramentas/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                console.log('Status da resposta:', response.status);
                console.log('Texto da resposta:', await response.text());
                throw new Error('Erro ao enviar imagem');
            }

            const data = await response.json();
            console.log('Success:', data);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); 
            setNome('');
            setNumSerie('');
            setDescricao('');
            setImgFerramenta(null);
            setDataAquisicao('');
        } catch (error) {
            console.error('Error:', error);
            console.log('Detalhes do erro:', error.message);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000); 
        }
    };

    return (
        <div className={styles.container}>
            <MenuComponent id={styles.menu}></MenuComponent>
            <Link to={'/ferramenta'}>
                <p id={styles.voltar}>  &lt; </p>
            </Link>
            <div id='tela' className={styles.tela}>
                <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off" id={styles.cadastro_ferramenta_form}>
                    <p id={styles.cadastro}>Cadastro de Ferramenta</p>
                    <input id={styles.nome} name="nome" type="text" placeholder="Nome" required value={nome} onChange={(evt) => setNome(evt.target.value)}></input>
                    <input id={styles.numero_serie} name="numero_serie" type="text" placeholder="Número de Série" required value={numSerie} onChange={(evt) => setNumSerie(evt.target.value)}></input>
                    <input id={styles.descricao} name="descricao" type="text" placeholder="Descrição" value={descricao} onChange={(evt) => setDescricao(evt.target.value)}></input>
                    <div className={styles.spacer}>
                        <label id={styles.data_aquisicao_label} className={styles.label_ferrameta}>Data de aquisição</label>
                        <input type="date" id={styles.data_aquisicao_datepicker} required value={dataAquisicao} onChange={(evt) => setDataAquisicao(evt.target.value)}></input>
                    </div>
                    <div className={styles.spacer}>
                        <label id={styles.foto_label} htmlFor="foto">Foto</label>
                        <input type="file" id={styles.foto} name="foto" accept=".png,.jpg,.jpeg" onChange={(evt) => setImgFerramenta(evt.target.files[0])}></input>
                    </div>
                    <button id={styles.enviar} type="submit">ENVIAR</button>
                </form>
                {showSuccess && <CadastradoComponent />}
                {showError && <FalhaCadastroComponent />}
            </div>
        </div>
    );
};

export default FerramentaCadastro;
