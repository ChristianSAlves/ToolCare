import React, { useState, useEffect } from 'react';
import styles from './funcionario_cadastro.module.css';
import MenuComponent from '../../../components/Menu/Menu';
import defaultFuncionario from '../../../assets/imagens/defaultFuncionario.jpg';
import FalhaCadastroComponent from '../../../components/Avisos/FalhaCadastro/falha_cadastro';
import CadastradoComponent from '../../../components/Avisos/Cadastrado/cadastrado';

const Funcionario = () => {
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
        const linksetor = `http://127.0.0.1:8000/setores/${codigoSetor}/`;
        const linkcargo = `http://127.0.0.1:8000/cargos/${codigoCargo}/`;

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('matriculaFuncionario', matriculaFuncionario);
        formData.append('cpf', cpf);
        formData.append('codigoSetor', linksetor);
        formData.append('codigoCargo', linkcargo);

        if (imgFunc) {
            formData.append('imgFunc', imgFunc, imgFunc.name);
        } else {
            const response = await fetch(defaultFuncionario);
            const blob = await response.blob();
            const file = new File([blob], 'defaultFuncionario.jpg', { type: 'image/jpeg' });
            formData.append('imgFunc', file);
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/funcionarios/', {
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
            setTimeout(() => setShowSuccess(false), 3000); // Ocultar após 3 segundos

            // Limpar os inputs após o cadastro bem-sucedido
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
            setTimeout(() => setShowError(false), 3000); // Ocultar após 3 segundos
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const responseCargos = await fetch('http://127.0.0.1:8000/cargos/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                if (!responseCargos.ok) {
                    throw new Error('Erro ao carregar os cargos');
                }
                const dataCargos = await responseCargos.json();
                setCargos(dataCargos);

                const responseSetores = await fetch('http://127.0.0.1:8000/setores/', {
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
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <MenuComponent id={styles.menu}></MenuComponent>
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
                        <input className={styles.input_file} type="file" id="foto" name="foto" accept=".png,.jpg,.jpeg" onChange={(evt) => setImgFunc(evt.target.files[0])}></input>
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
