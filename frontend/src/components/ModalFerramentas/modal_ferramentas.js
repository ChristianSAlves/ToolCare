import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./modal_ferramentas.module.css";
import logo from "../../assets/imagens/logo.png";
import EditadoComponent from "../Avisos/Editado/editado";
import RemovidoComponent from "../Avisos/Removido/removido";
import FalhaEdicaoComponent from "../Avisos/FalhaEdição/falha_edicao";
import FalhaRemocaoComponent from "../Avisos/FalhaRemoção/falha_remocao";
import ConfirmarRemocaoComponent from "../Avisos/ConfirmarRemoção/confirmar_remocao";
import { useApi } from '../../../src/ApiContext.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};


const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const ModalFerramentasComponent = ({ onClose, ferramenta, onShowModal, onRemove = () => { } }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showEditado, setShowEditado] = useState(false);
    const [showRemovido, setShowRemovido] = useState(false);
    const [showFalhaEdicao, setShowFalhaEdicao] = useState(false);
    const [showFalhaRemocao, setShowFalhaRemocao] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [editData, setEditData] = useState({
        Nome: ferramenta.nome,
        NúmeroDeSerie: ferramenta.numSerie,
        Descricao: ferramenta.descricao,
        DataAquisicao: formatDate(ferramenta.dataAquisicao),
    });
    const time = 3000;
    const { apiUrl } = useApi();
    const navigate = useNavigate();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        const token = localStorage.getItem('token');
        let response;

        try {
            const formData = new FormData();
            formData.append('nome', editData.Nome);
            formData.append('numSerie', editData.NúmeroDeSerie);
            formData.append('descricao', editData.Descricao);
            // Formatando a data de volta para o formato yyyy-mm-dd
            const [day, month, year] = editData.DataAquisicao.split('/');
            const formattedDate = `${year}-${month}-${day}`;
            formData.append('dataAquisicao', formattedDate);

            response = await fetch(`${apiUrl}/ferramentas/${ferramenta.codFerramenta}/`, {
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
                    onClose(); // Fechar o modal após a atualização
                    if (onShowModal) onShowModal(false); // Atualiza o estado do modal no componente pai, se necessário
                }, time);
            } else {
                const errorData = await response.json();
                console.error('Erro ao atualizar a ferramenta:', errorData);
                setShowFalhaEdicao(true);
                setTimeout(() => {
                    setShowFalhaEdicao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao atualizar a ferramenta:', error);
            setShowFalhaEdicao(true);
            setTimeout(() => {
                setShowFalhaEdicao(false);
            }, time);
        }

        setIsEditing(false); // Sair do modo de edição após confirmar
    };

    const handleChange = (event, field) => {
        const value = event.target.value;
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleRemove = async () => {
        const token = localStorage.getItem('token');
        let response;

        try {
            const formData = new FormData();
            formData.append('status', 'Baixa');

            response = await fetch(`${apiUrl}/ferramentas/${ferramenta.codFerramenta}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setShowRemovido(true);
                setTimeout(() => {
                    setShowRemovido(false);
                    onRemove(); // Chama a função para recarregar a lista de ferramentas após remoção
                    onClose(); // Fechar o modal após a remoção
                    if (onShowModal) onShowModal(false); // Atualiza o estado do modal no componente pai, se necessário
                }, time);
            } else {
                const errorData = await response.json();
                console.error('Erro ao desativar a ferramenta:', errorData);
                setShowFalhaRemocao(true);
                setTimeout(() => {
                    setShowFalhaRemocao(false);
                }, time);
            }
        } catch (error) {
            console.error('Erro ao desativar a ferramenta:', error);
            setShowFalhaRemocao(true);
            setTimeout(() => {
                setShowFalhaRemocao(false);
            }, time);
        }
    };

    const confirmRemove = () => {
        setShowConfirmacao(true);
    };

    const cancelRemove = () => {
        setShowConfirmacao(false);
    };

    const handleConfirmRemove = () => {
        setShowConfirmacao(false);
        handleRemove();
    };

    const gerarRelatorio = () => {
        const formatDate = (dateString) => {
            if (!dateString) return '--/--/----'; // Retorna uma string vazia se dateString for nulo

            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        };

        const documentDefinition = {
            content: [
                { text: `Relatório da ferramenta ${ferramenta.nome}`, style: 'header' },
                { text: `NumSerie: ${ferramenta.numSerie}` },
                { text: `Status: ${ferramenta.status}` },

                { text: 'Emprestimos:', style: 'subheader' },
                {
                    ul: filteredEmprestimos.map(emprestimo => `Empréstimo ${emprestimo.codigoEmprestimo}: 
                        Duração: ${formatDate(emprestimo.dataEmprestimo)} até ${formatDate(emprestimo.dataDevolucao)} 
                        Funcionário: ${emprestimo.nomeFuncionario}`)
                },
                { text: 'Manutenções:', style: 'subheader' },
                {
                    ul: filteredManutencoes.map(manutencao => `Manutenção ${manutencao.codigoManutencao}
                    Tipo de manutenção: ${manutencao.tipoManutencao}
                    Duração: ${formatDate(manutencao.dataInicio)}  até  ${formatDate(manutencao.dataFinal)} `)
                }
            ],
            styles: {
                header: { fontSize: 18, bold: true },
                subheader: { fontSize: 16, bold: true, margin: [0, 15, 0, 5] }
            }
        };

        pdfMake.createPdf(documentDefinition).download(`Relatório_${ferramenta.nome}.pdf`);
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
            const filteredData = data.filter(emprestimo => emprestimo.numSerie === `${apiUrl}/ferramentas/${ferramenta.codFerramenta}/`);
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



    const fetchManutencoes = async () => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage

        try {
            const response = await fetch(`${apiUrl}/manutencoes/`, {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar as Manutenções');
            }

            const data = await response.json();
            const manutencoesComNomes = await Promise.all(data.map(async (manutencao) => {
                const nomeFerramenta = await fetchNome(`${apiUrl}/ferramentas/${extractIdFromUrl(manutencao.codFerramenta)}/`, token);
                return {
                    ...manutencao,
                    nomeFerramenta,
                };
            }));

            const filteredData = manutencoesComNomes.filter(manutencao => manutencao.codFerramenta === `${apiUrl}/ferramentas/${ferramenta.codFerramenta}/`);
            setManutencoes(filteredData);
            setFilteredManutencoes(filteredData);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        fetchManutencoes();
    }, []);

    useEffect(() => {
        const filterManutencoes = () => {
            const searchLower = search.toLowerCase();
            const filtered = manutencoes.filter(manutencao => {
                const codigoManutencaoMatch = manutencao.codigoManutencao.toString().includes(searchLower);
                const manutencaoStringMatch = `manutencao ${manutencao.codigoManutencao}`.toLowerCase().includes(searchLower);
                const manutencaoAcentoStringMatch = `manutenção ${manutencao.codigoManutencao}`.toLowerCase().includes(searchLower);
                const tipoManutencaoMatch = manutencao.tipoManutencao.toLowerCase().includes(searchLower);
                const nomeFerramentaMatch = manutencao.nomeFerramenta.toLowerCase().includes(searchLower);

                return (
                    codigoManutencaoMatch ||
                    manutencaoStringMatch ||
                    manutencaoAcentoStringMatch ||
                    tipoManutencaoMatch ||
                    nomeFerramentaMatch
                );
            });

            setFilteredManutencoes(filtered);
        };

        filterManutencoes();
    }, [search, manutencoes]);


    return (
        <>
            {showRemovido && <RemovidoComponent />}
            {showFalhaEdicao && <FalhaEdicaoComponent />}
            {showFalhaRemocao && <FalhaRemocaoComponent />}
            <div className={styles.tela_cheia} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div id={styles.fundo_img}>
                        <img src={ferramenta.imgFerramenta || logo} className={styles.modal_image} alt="Imagem de ferramenta" />
                    </div>
                    <div className={styles.modal_content}>
                        {Object.entries(editData).map(([key, value]) => (
                            <div className={styles.info_row} key={key}>
                                <span className={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                {isEditing && key !== "Nome" && key !== "DataAquisicao" && key !== "NúmeroDeSerie" ? (
                                    <input type="text" id={styles.input_text} value={value} onChange={e => handleChange(e, key)} />
                                ) : (
                                    <p>{value}</p>
                                )}
                            </div>
                        ))}
                        <p id={styles.fechar} onClick={onClose}>x</p>
                        <div className={styles.modal_buttons}>
                            {isEditing ? (
                                <>
                                    <button className={styles.edit_button} onClick={handleConfirmEdit}>CONFIRMAR</button>
                                </>
                            ) : (
                                <>
                                    <button className={styles.edit_button} onClick={handleEdit}>EDITAR</button>
                                    <button className={styles.remove_button} onClick={confirmRemove}>DESATIVAR</button>
                                    <button className={styles.remove_button} onClick={gerarRelatorio}>RELATÓRIO</button>
                                </>
                            )}
                        </div>
                    </div>
                    {showEditado && <EditadoComponent />}
                    {showConfirmacao && <ConfirmarRemocaoComponent onConfirm={handleConfirmRemove} onCancel={cancelRemove} />}
                </div>
            </div>
        </>
    );
};

export default ModalFerramentasComponent;