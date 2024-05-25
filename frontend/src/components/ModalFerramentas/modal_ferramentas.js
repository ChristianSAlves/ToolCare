import React, { useState } from "react";
import styles from "./modal_ferramentas.module.css";
import logo from "../../assets/imagens/logo.png";

const ModalFerramentasComponent = ({ onClose, ferramenta, onShowModal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        Nome: ferramenta.nome,
        NúmeroDeSerie: ferramenta.numSerie,
        Descricao: ferramenta.descricao,
        DataAquisicao: ferramenta.dataAquisicao,
        Status: ferramenta.status,
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        console.log('Confirmando edições:', editData);
        alert('Edições confirmadas com sucesso!');
        setIsEditing(false); // Sair do modo de edição após confirmar
    };

    const handleChange = (event, field) => {
        const value = field === "NúmeroDeSerie" ? parseInt(event.target.value, 10) : event.target.value;
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleRemove = async () => {
        const token = localStorage.getItem('token');
        const confirmRemove = window.confirm(`Você realmente deseja remover a ferramenta ${ferramenta.nome}?`);
        if (!confirmRemove) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/ferramentas/${ferramenta.codFerramenta}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                alert('Ferramenta removida com sucesso!');
                onClose(); // Fechar o modal após a remoção
                onShowModal(false); // Atualiza o estado do modal no componente pai, se necessário
            } else {
                alert('Falha ao remover a ferramenta. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao remover a ferramenta:', error);
            alert('Erro ao remover a ferramenta. Por favor, tente novamente.');
        }
    };

    return (
        <div className={styles.tela_cheia} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div id={styles.fundo_img}>
                    <img src={ferramenta.imgFerramenta || logo} className={styles.modal_image} alt="Imagem de ferramenta" />
                </div>
                <div className={styles.modal_content}>
                    {Object.entries(editData).map(([key, value]) => (
                        <div className={styles.info_row} key={key}>
                            <span className={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            {isEditing ? (
                                key === "DataAquisicao" ? (
                                    <input type="date" value={value} id={styles.datepicker_aquisicao} onChange={e => handleChange(e, key)} />
                                ) : key === "Status" ? (
                                    <select value={value} id={styles.select_status} onChange={e => handleChange(e, key)}>
                                        <option value="Emprestada">Emprestada</option>
                                        <option value="Disponível">Disponível</option>
                                        <option value="Perdida">Perdida</option>
                                        <option value="Manutenção">Manutenção</option>
                                    </select>
                                ) : (
                                    <input type={key === "NúmeroDeSerie" ? "number" : "text"} id={styles.input_text} value={value} onChange={e => handleChange(e, key)} />
                                )
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
                                <button className={styles.remove_button} onClick={handleRemove}>REMOVER</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFerramentasComponent;
