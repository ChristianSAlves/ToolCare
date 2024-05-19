import React from 'react';
import MenuComponent from '../../../components/Menu/Menu';
import styles from "../Emprestimo/emprestimo.module.css"

export default class Emprestimo extends React.Component {
    render() {
        return (
            <div className={styles.emprestimo_container}>
                <MenuComponent />
                <div className={styles.emprestimo_content}>
                    <h1>Teste</h1>
                    {/* Adicione mais conteúdo aqui */}
                </div>
            </div>
        );
    }
}
