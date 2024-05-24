import React from "react";
import styles from "./modal_ferramentas.module.css";
import logo from "../../assets/imagens/logo.png";

const ModalFerramentasComponent = ({ onClose, ferramenta, defaultFerramenta, onShowModal }) => {
    
    const nome = ferramenta.nome;
    const numSerie = ferramenta.numSerie;
    const descricao = ferramenta.descricao;
    const dataAquisicao = ferramenta.dataAquisicao;
    const status = ferramenta.status;

    const handleRemove = async () => {
        const token = localStorage.getItem('token');
        const confirmRemove = window.confirm(`Você realmente deseja remover a ferramenta ${nome}?`);
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
                // Aqui você pode chamar uma função para atualizar a lista de ferramentas no estado pai, se necessário
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
                    <div className={styles.modal_info}>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Nome</span>
                            <p>{nome}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Número de Série</span>
                            <p>{numSerie}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Descrição</span>
                            <p>{descricao}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Data de Aquisição</span>
                            <p>{dataAquisicao}</p>
                        </div>
                        <div className={styles.info_row}>
                            <span className={styles.label}>Status</span>
                            <p>{status}</p>
                        </div>
                    </div>
                    <p id={styles.fechar} onClick={onClose}>x</p>
                    <div className={styles.modal_buttons}>
                        <button className={styles.edit_button}>EDITAR</button>
                        <button className={styles.remove_button} onClick={handleRemove}>REMOVER</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFerramentasComponent;
