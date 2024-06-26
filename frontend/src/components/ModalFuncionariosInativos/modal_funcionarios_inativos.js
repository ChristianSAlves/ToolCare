import React, { useState, useEffect } from "react";
import styles from "./modal_funcionarios_inativos.module.css";
import logo from "../../assets/imagens/logo.png";
import { useApi } from '../../../src/ApiContext.js';


const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const ModalFuncionariosComponent = ({ onClose, funcionario }) => {
    const [codigoSetor, setCodigoSetor] = useState('');
    const [codigoCargo, setCodigoCargo] = useState('');
    const [cargos, setCargos] = useState([]);
    const [setores, setSetores] = useState([]);
    const { apiUrl } = useApi();

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
            }
        };

        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        if (funcionario) {
            setCodigoSetor(funcionario.codigoSetor ? extractIdFromUrl(funcionario.codigoSetor) : '');
            setCodigoCargo(funcionario.codigoCargo ? extractIdFromUrl(funcionario.codigoCargo) : '');
        }
    }, [funcionario]);

    const editData = {
        Nome: funcionario.nome,
        Matrícula: funcionario.matriculaFuncionario,
        CPF: funcionario.cpf,
    };

    return (
        <>
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div id={styles.fundo_img}>
                        <img src={funcionario.imgFunc || logo} className={styles.modal_image} alt="Imagem de funcionário" />
                    </div>
                    <div className={styles.modal_content}>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Nome</span>
                            <p>{editData.Nome}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Matrícula</span>
                            <p>{editData.Matrícula}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>CPF</span>
                            <p>{editData.CPF}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Setor</span>
                            <p>{setores.length > 0 ? setores.find(setor => setor.codigoSetor === parseInt(codigoSetor))?.nomeSetor : 'Sem setor'}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Cargo</span>
                            <p>{cargos.length > 0 ? cargos.find(cargo => cargo.codigoCargo === parseInt(codigoCargo))?.nomeCargo : 'Sem cargo'}</p>
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            <>
                                <button className={styles.remove_button}>ATIVAR</button>
                                <button className={styles.relatorio_button}>RELATÓRIO</button>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalFuncionariosComponent;