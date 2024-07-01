import React, { useState, useEffect, useCallback } from 'react';
import styles from "./modal_funcionarios.module.css";
import logo from "../../assets/imagens/logo.png";
import EditadoComponent from "../Avisos/Editado/editado";
import FalhaEdicaoComponent from "../Avisos/FalhaEdição/falha_edicao";
import FalhaRemocaoComponent from "../Avisos/FalhaRemoção/falha_remocao";
import ConfirmarRemocaoComponent from "../Avisos/ConfirmarRemoção/confirmar_remocao";
import { useApi } from '../../../src/ApiContext.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};


const ModalFuncionariosComponent = ({ onClose, funcionario, onShowModal, onStatusUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showEditado, setShowEditado] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [showFalhaRemocao, setShowFalhaRemocao] = useState(false);
    const [codigoSetor, setCodigoSetor] = useState('');
    const [codigoCargo, setCodigoCargo] = useState('');
    const [cargos, setCargos] = useState([]);
    const [setores, setSetores] = useState([]);
    const { apiUrl } = useApi();
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
        if (funcionario) {
            setCodigoSetor(funcionario.codigoSetor ? extractIdFromUrl(funcionario.codigoSetor) : '');
            setCodigoCargo(funcionario.codigoCargo ? extractIdFromUrl(funcionario.codigoCargo) : '');
        }
    }, [funcionario]);

    const [editData, setEditData] = useState({
        Nome: funcionario.nome,
        Matrícula: funcionario.matriculaFuncionario,
        CPF: funcionario.cpf,
    });

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
                }, 3000);
            } else {
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
            const url = `http://127.0.0.1:8000/funcionarios/${funcionario.idFuncionario}/`;
            const formData = new FormData();
            formData.append('status', false);

            console.log('URL:', url);
            console.log('Token:', token);
            console.log('FormData:', formData);

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
                console.error('Falha ao atualizar o status do funcionario. Por favor, tente novamente.');
                console.error('Response status:', response.status);
                console.error('Response text:', await response.text());
                setShowFalhaRemocao(true);
                setTimeout(() => {
                    setShowFalhaRemocao(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao atualizar o status do funcionario:', error);
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


    const gerarRelatorio = () => {
        const formatDate = (dateString) => {
            if (!dateString) return '--/--/----'; // Retorna uma string vazia se dateString for nulo

            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        };

        const documentDefinition = {
            content: [
                { text: `Relatório do funcionário ${funcionario.nome}`, style: 'header' },
                { text: `Matrícula: ${funcionario.matriculaFuncionario}` },
                { text: `CPF: ${funcionario.cpf}` },
                { text: `Status: Ativo` },
                { text: 'Empréstimos:', style: 'subheader' },
                {
                    ul: filteredEmprestimos.map(emprestimo => `Empréstimo ${emprestimo.codigoEmprestimo}: 
                        Duração - ${formatDate(emprestimo.dataEmprestimo)} até ${formatDate(emprestimo.dataDevolucao)} 
                        Ferramenta - ${emprestimo.nomeFerramenta}`)
                }
            ],
            styles: {
                header: { fontSize: 18, bold: true },
                subheader: { fontSize: 16, bold: true, margin: [0, 15, 0, 5] }
            }
        };

        // Define o nome do arquivo PDF
        const fileName = `Relatório_${funcionario.nome.replace(/\s+/g, '_')}.pdf`;

        pdfMake.createPdf(documentDefinition).download(fileName);
    };




    const [manutencoes, setManutencoes] = useState([]);
    const [filteredManutencoes, setFilteredManutencoes] = useState([]);
    const [search, setSearch] = useState('');
    const [emprestimos, setEmprestimos] = useState([]);
    const [filteredEmprestimos, setFilteredEmprestimos] = useState([]);


    const fetchEmprestimos = useCallback(async () => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage

        try {
            const response = await fetch(`${apiUrl}/emprestimos/`, {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar os Emprestimos');
            }
            const data = await response.json();
            const filteredData = data.filter(emprestimo => emprestimo.matriculaFuncionario === `${apiUrl}/funcionarios/${funcionario.idFuncionario}/`);
            setEmprestimos(filteredData);
            setFilteredEmprestimos(filteredData);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [apiUrl]);

    const fetchNome = useCallback(async (url, token) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar o nome');
            }
            const data = await response.json();
            return data.nome;
        } catch (error) {
            console.error('Erro:', error);
            return '';
        }
    }, []);

    useEffect(() => {
        fetchEmprestimos();
    }, [fetchEmprestimos]);

    useEffect(() => {
        const filterEmprestimos = async () => {
            const token = localStorage.getItem('token');
            const filtered = await Promise.all(
                emprestimos.map(async (emprestimo) => {
                    const nomeFerramenta = await fetchNome(`${apiUrl}/ferramentas/${extractIdFromUrl(emprestimo.numSerie)}/`, token);
                    const nomeFuncionario = await fetchNome(`${apiUrl}/funcionarios/${extractIdFromUrl(emprestimo.matriculaFuncionario)}/`, token);

                    return {
                        ...emprestimo,
                        nomeFerramenta,
                        nomeFuncionario
                    };
                })
            );

            const result = filtered.filter(emprestimo => {
                const searchLower = search.toLowerCase();
                const codigoEmprestimoMatch = emprestimo.codigoEmprestimo.toString().includes(searchLower);
                const emprestimoStringMatch = `emprestimo ${emprestimo.codigoEmprestimo}`.toLowerCase().includes(searchLower);
                const emprestimoAcentoStringMatch = `empréstimo ${emprestimo.codigoEmprestimo}`.toLowerCase().includes(searchLower);
                const nomeFuncionarioMatch = emprestimo.nomeFuncionario.toLowerCase().includes(searchLower);
                const nomeFerramentaMatch = emprestimo.nomeFerramenta.toLowerCase().includes(searchLower);

                return (
                    codigoEmprestimoMatch ||
                    emprestimoStringMatch ||
                    emprestimoAcentoStringMatch ||
                    nomeFuncionarioMatch ||
                    nomeFerramentaMatch
                );
            });

            setFilteredEmprestimos(result);
        };

        filterEmprestimos();
    }, [search, emprestimos, fetchNome, apiUrl]);


    return (
        <>
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
                            {isEditing ? (
                                <select
                                    className={styles.select}
                                    name="codigoSetor"
                                    id="codigoSetor"
                                    value={codigoSetor}
                                    onChange={handleSetorChange}
                                >
                                    <option value="" disabled>Selecione</option>
                                    {setores.map(setor => (
                                        <option key={setor.codigoSetor} value={setor.codigoSetor}>
                                            {setor.nomeSetor}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>{setores.length > 0 ? setores.find(setor => setor.codigoSetor === parseInt(codigoSetor))?.nomeSetor : 'Sem setor'}</p>
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
                                    <option value="" disabled>Selecione</option>
                                    {cargos.map(cargo => (
                                        <option key={cargo.codigoCargo} value={cargo.codigoCargo}>
                                            {cargo.nomeCargo}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>{cargos.length > 0 ? cargos.find(cargo => cargo.codigoCargo === parseInt(codigoCargo))?.nomeCargo : 'Sem cargo'}</p>
                            )}
                        </div>
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            {isEditing ? (
                                <button className={styles.edit_button} onClick={handleConfirmEdit}>CONFIRMAR</button>
                            ) : (
                                <>
                                    <button className={styles.edit_button} onClick={handleEdit}>EDITAR</button>
                                    <button className={styles.remove_button} onClick={handleRemove}>DESATIVAR</button>
                                    <button className={styles.relatorio_button} onClick={gerarRelatorio}>RELATÓRIO</button>
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