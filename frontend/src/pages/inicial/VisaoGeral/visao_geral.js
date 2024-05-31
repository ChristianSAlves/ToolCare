import MenuComponent from '../../../components/Menu/Menu';
import GraficoFuncionario from '../../../components/GraficoFuncionarios/grafico_funcionarios';
import GraficoFerramentas from '../../../components/GraficoFerramentas/grafico_ferramentas';
import styles from './visao_geral.module.css';

const VisaoGeral = () => {
    return (
        <div id={styles.tela}>
            <MenuComponent id={styles.menu} />
            <div className={styles.chartWrapper}>
                <GraficoFuncionario />
                <div id={styles.funcionarios}>
                    <p className={styles.quantidade}>153</p>
                    <p className={styles.funcionarios}>funcionários<br /> cadastrados</p>
                </div>
                <GraficoFerramentas />
                <div id={styles.ferramentas}>
                    <p className={styles.quantidade}>42</p>
                    <p className={styles.ferramentas}>ferramentas<br /> cadastradas</p>
                </div>
            </div>
            <div id={styles.info_visao_geral}>
                <div id={styles.info_funcionarios}>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>60%</p>
                        <p className={styles.texto}>dos funcionários não têm<br />nenhum empréstimo</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>92</p>
                        <p className={styles.texto}>funcionários não têm<br />nenhum empréstimo</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>40%</p>
                        <p className={styles.texto}>dos funcionários têm ao<br />menos um empréstimo</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>61</p>
                        <p className={styles.texto}>funcionários têm ao<br />menos um empréstimo</p>
                    </div>
                </div>
                <div id={styles.info_ferramentas}>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>50%</p>
                        <p className={styles.texto}>das ferramentas<br />estão disponíveis</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>21</p>
                        <p className={styles.texto}>ferramentas<br />estão disponíveis</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.porcentagem}>40%</p>
                        <p className={styles.texto}>das ferramentas<br />estão emprestadas</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>17</p>
                        <p className={styles.texto}>ferramentas estão<br />emprestadas</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>2</p>
                        <p className={styles.texto}>ferramentas estão<br />danificadas</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={styles.numero}>2</p>
                        <p className={styles.texto}>ferramentas<br />estão perdidas</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisaoGeral;
