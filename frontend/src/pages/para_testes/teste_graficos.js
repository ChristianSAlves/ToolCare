import React from 'react';
import GraficoFuncionario from '../../components/GraficoFuncionarios/grafico_funcionarios';
import styles from './teste_graficos.module.css';
import MenuComponent from '../../components/Menu/Menu';

export default class Grafico extends React.Component {
    render() {
        return (
            <div id={styles.tela}>
                <MenuComponent id={styles.menu} />
                <div className={styles.chartWrapper}>
                    <GraficoFuncionario />
                    <div id={styles.funcionarios}>
                        <p className={styles.quantidade}>153</p>
                        <p className={styles.funcionarios}>funcionários <br /> cadastrados</p>
                    </div>
                    <GraficoFuncionario />
                </div>
            </div>
        );
    }
}
