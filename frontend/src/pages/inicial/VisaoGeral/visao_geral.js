import MenuComponent from '../../../components/Menu/Menu'
import GraficoFuncionario from '../../../components/GraficoFuncionarios/grafico_funcionarios';
import GraficoFerramentas from '../../../components/GraficoFerramentas/grafico_ferramentas';
import styles from './visao_geral.module.css';

const VisaoGeral = () =>{
  return (
    <div id={styles.tela}>
        <MenuComponent id={styles.menu} />
        <div className={styles.chartWrapper}>
            <GraficoFuncionario />
            <div id={styles.funcionarios}>
                <p className={styles.quantidade}>153</p>
                <p className={styles.funcionarios}>funcionários <br /> cadastrados</p>
            </div>
            <GraficoFerramentas/>
            <div id={styles.ferramentas}>
                <p className={styles.quantidade}>42</p>
                <p className={styles.ferramentas}>ferramentas <br /> cadastradas</p>
            </div>
        </div>
    </div>
);
    }

export default VisaoGeral;
