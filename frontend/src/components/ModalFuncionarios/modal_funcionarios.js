import React, { useState, useEffect } from "react";
import styles from "./modal_funcionarios.module.css";
import logo from "../../assets/imagens/logo.png";
import EditadoComponent from "../Avisos/Editado/editado";
import RemovidoComponent from "../Avisos/Removido/removido";
import ConfirmarRemocaoComponent from "../Avisos/ConfirmarRemoção/confirmar_remocao";
import FalhaEdicaoComponent from "../Avisos/FalhaEdição/falha_edicao";
import FalhaRemocaoComponent from "../Avisos/FalhaRemoção/falha_remocao";

const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const ModalFuncionariosComponent = ({ onClose, funcionario, onShowModal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showEditado, setShowEditado] = useState(false);
    const [showRemovido, setShowRemovido] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const [showFalhaRemocao, setShowFalhaRemocao] = useState(false);
    const [codigoSetor, setCodigoSetor] = useState(0);
    const [codigoCargo, setCodigoCargo] = useState(0);
    const [cargos, setCargos] = useState([]);
    const [setores, setSetores] = useState([]);

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

    useEffect(() => {
        setCodigoSetor(extractIdFromUrl(funcionario.codigoSetor));
        setCodigoCargo(extractIdFromUrl(funcionario.codigoCargo));
    }, [funcionario]);

    const [editData, setEditData] = useState({
        Nome: funcionario.nome,
        Matrícula: funcionario.matriculaFuncionario,
        CPF: funcionario.cpf,
    });

    const handleChange = (event, field) => {
        const value = event.target.value;
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleSetorChange = (e) => {
        setCodigoSetor(e.target.value);
    };

    const handleCargoChange = (e) => {
        setCodigoCargo(e.target.value);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        const token = localStorage.getItem('token');
        try {

            const url = `http://127.0.0.1:8000/funcionarios/${funcionario.idFuncionario}/`;
            const linksetor = `http://127.0.0.1:8000/setores/${codigoSetor}/`;
            const linkcargo = `http://127.0.0.1:8000/cargos/${codigoCargo}/`;

            const formData = new FormData();
            formData.append('nome', editData.Nome);
            formData.append('matriculaFuncionario', editData.Matrícula);
            formData.append('cpf', editData.CPF);
            formData.append('codigoSetor', linksetor);
            formData.append('codigoCargo', linkcargo);

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setShowEditado(true);
                setTimeout(() => {
                    setShowEditado(false);
                    onClose();
                    if (onShowModal) onShowModal(false);
                }, 3000);
            } else {
                for (var pair of formData.entries()) {
                    console.log(pair[0]+ ', '+ pair[1]); 
                }
                const errorData = await response.json();
                console.error('Erro ao atualizar o funcionario:', errorData);
                setShowFalhaEdicao(true);
                setTimeout(() => {
                    setShowFalhaEdicao(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao atualizar o funcionario:', error);
            setShowFalhaEdicao(true);
            setTimeout(() => {
                setShowFalhaEdicao(false);
            }, 3000);
        }

        setIsEditing(false);
    };

    const handleRemove = () => {
        setShowConfirmacao(true);
    };

    const confirmRemove = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://127.0.0.1:8000/funcionarios/${funcionario.codFuncionario}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                setShowRemovido(true);
                setTimeout(() => {
                    setShowRemovido(false);
                    onClose();
                    if (onShowModal) onShowModal(false);
                }, 3000);
            } else {
                console.error('Falha ao remover o funcionario. Por favor, tente novamente.');
                setShowFalhaRemocao(true);
                setTimeout(() => {
                    setShowFalhaRemocao(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao remover o funcionario:', error);
            setShowFalhaRemocao(true);
            setTimeout(() => {
                setShowFalhaRemocao(false);
            }, 3000);
        }

        setShowConfirmacao(false);
    };

    const cancelRemove = () => {
        setShowConfirmacao(false);
    };

    return (
        <>
            {showRemovido && <RemovidoComponent />}
            {showFalhaEdicao && <FalhaEdicaoComponent />}
            {showFalhaRemocao && <FalhaRemocaoComponent />}
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div id={styles.fundo_img}>
                        <img src={funcionario.imgFunc || logo} className={styles.modal_image} alt="Imagem de funcionário" />
                    </div>
                    <div className={styles.modal_content}>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Nome</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    id={styles.input_text}
                                    value={editData.Nome}
                                    onChange={e => handleChange(e, 'Nome')}
                                />
                            ) : (
                                <p>{editData.Nome}</p>
                            )}
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Matrícula</span>
                            <p>{editData.Matrícula}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>CPF</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    id={styles.input_text}
                                    value={editData.CPF}
                                    onChange={e => handleChange(e, 'CPF')}
                                />
                            ) : (
                                <p>{editData.CPF}</p>
                            )}
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Setor</span>
                            {isEditing ? (
                                <select
                                    className={styles.select}
                                    name="codigoSetor"
                                    id="codigoSetor"
                                    value={codigoSetor}
                                    onChange={handleSetorChange}
                                >
                                    {setores.map(setor => (
                                        <option key={setor.codigoSetor} value={setor.codigoSetor}>
                                            {setor.nomeSetor}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>{setores.find(setor => setor.codigoSetor === codigoSetor)?.nomeSetor}</p>
                            )}
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Cargo</span>
                            {isEditing ? (
                                <select
                                    className={styles.select}
                                    name="codigoCargo"
                                    id="codigoCargo"
                                    value={codigoCargo}
                                    onChange={handleCargoChange}
                                >
                                    {cargos.map(cargo => (
                                        <option key={cargo.codigoCargo} value={cargo.codigoCargo}>
                                            {cargo.nomeCargo}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>{cargos.find(cargo => cargo.codigoCargo === codigoCargo)?.nomeCargo}</p>
                            )}
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            {isEditing ? (
                                <button className={styles.edit_button} onClick={handleConfirmEdit}>CONFIRMAR</button>
                            ) : (
                                <>
                                    <button className={styles.edit_button} onClick={handleEdit}>EDITAR</button>
                                    <button className={styles.remove_button} onClick={handleRemove}>REMOVER</button>
                                </>
                            )}
                        </div>
                    </div>
                    {showEditado && <EditadoComponent />}
                    {showConfirmacao && <ConfirmarRemocaoComponent onConfirm={confirmRemove} onCancel={cancelRemove} />}
                </div>
            </div>
        </>
    );
};

export default ModalFuncionariosComponent;