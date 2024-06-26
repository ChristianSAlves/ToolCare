import React, { useState, useEffect } from 'react';
import styles from './funcionario_cadastro.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import { Link } from 'react-router-dom';
import defaultFuncionario from '../../../assets/imagens/defaultFuncionario.jpg';
import FalhaCadastroComponent from '../../../components/Avisos/FalhaCadastro/falha_cadastro';
import CadastradoComponent from '../../../components/Avisos/Cadastrado/cadastrado';
import { useApi } from '../../../../src/ApiContext.js';

const Funcionario = () => {
    const { apiUrl } = useApi(); 
    const [nome, setNome] = useState('');
    const [matriculaFuncionario, setMatriculaFuncionario] = useState('');
    const [cpf, setCpf] = useState('');
    const [codigoSetor, setCodigoSetor] = useState(0);
    const [codigoCargo, setCodigoCargo] = useState(0);
    const [imgFunc, setImgFunc] = useState(null);
    const [cargos, setCargos] = useState([]);
    const [setores, setSetores] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const linksetor = `${apiUrl}/setores/${codigoSetor}/`; 
        const linkcargo = `${apiUrl}/cargos/${codigoCargo}/`; 

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('matriculaFuncionario', matriculaFuncionario);
        formData.append('cpf', cpf);
        formData.append('codigoSetor', linksetor);
        formData.append('codigoCargo', linkcargo);
        formData.append('status', true);

        if (imgFunc) {
            formData.append('imgFunc', imgFunc, imgFunc.name);
        } else {
            
            const response = await fetch(defaultFuncionario);
            const blob = await response.blob();
            const file = new File([blob], 'defaultFuncionario.jpg', { type: 'image/jpeg' });
            formData.append('imgFunc', file);
        }

        try {
            const response = await fetch(`${apiUrl}/funcionarios/`, { 
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
            setMatriculaFuncionario('');
            setCpf('');
            setCodigoSetor(0);
            setCodigoCargo(0);
            setImgFunc(null);
        } catch (error) {
            console.error('Error:', error);
            console.log('Detalhes do erro:', error.message);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000); 
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const responseCargos = await fetch(`${apiUrl}/cargos/`, { 
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseCargos.ok) {
                    throw new Error('Erro ao carregar os cargos');
                }
                const dataCargos = await responseCargos.json();
                setCargos(dataCargos);

                const responseSetores = await fetch(`${apiUrl}/setores/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseSetores.ok) {
                    throw new Error('Erro ao carregar os setores');
                }
                const dataSetores = await responseSetores.json();
                setSetores(dataSetores);
            } catch (error) {
                console.error('Erro:', error);
                setShowError(true);
            }
        };

        fetchData();
    }, [apiUrl]); 

    return (
        <div className={styles.container}>
            <MenuComponent id={styles.menu}></MenuComponent>
            <Link to={'/funcionario'}>
                <p id={styles.voltar}>  &lt; </p>
            </Link>
            <div className={styles.tela}>
                <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off" className={styles.cadastro_funcionario_form}>
                    <p id={styles.cadastro}>Cadastro de Funcionário</p>
                    <input className={styles.input} name="nome" type="text" placeholder="Nome" required value={nome} onChange={(evt) => setNome(evt.target.value)}></input>
                    <input className={styles.input} name="matriculaFuncionario" type="text" placeholder="Matrícula" required value={matriculaFuncionario} onChange={(evt) => setMatriculaFuncionario(evt.target.value)}></input>
                    <input className={styles.input} name="cpf" type="text" placeholder="CPF" required value={cpf} onChange={(evt) => setCpf(evt.target.value)}></input>
                    <div className={styles.spacer}>
                        <label id={styles.setor_label} htmlFor="codigoSetor">Setor</label>
                        <select className={styles.select} name="codigoSetor" id="codigoSetor" value={codigoSetor} onChange={evt => setCodigoSetor(evt.target.value)}>
                            <option value={0}>Selecione</option>
                            {setores.map(setor => (
                                <option key={setor.codigoSetor} value={setor.codigoSetor}>{setor.nomeSetor}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.spacer}>
                        <label id={styles.cargo_label} htmlFor="codigoCargo">Cargo</label>
                        <select className={styles.select} name="codigoCargo" id="codigoCargo" value={codigoCargo} onChange={evt => setCodigoCargo(evt.target.value)}>
                            <option value={0}>Selecione</option>
                            {cargos.map(cargo => (
                                <option key={cargo.codigoCargo} value={cargo.codigoCargo}>{cargo.nomeCargo}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.spacer}>
                        <label id={styles.foto_label} htmlFor="foto">Foto</label>
                        <input className={styles.input_file} type="file" id={styles.foto} name="foto" accept=".png,.jpg,.jpeg" onChange={(evt) => setImgFunc(evt.target.files[0])}></input>
                    </div>
                    <button className={styles.button} type="submit">ENVIAR</button>
                </form>
                {showSuccess && <CadastradoComponent />}
                {showError && <FalhaCadastroComponent />}
            </div>
        </div>
    );
};

export default Funcionario;
