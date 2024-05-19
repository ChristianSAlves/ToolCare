import styles from '../../../index.css'
import visaoGeralIcon from '../../../assets/icones/visao_geral_laranja.png'
import emprestimosIcon from '../../../assets/icones/emprestimos.png'
import ferramentasIcon from '../../../assets/icones/ferramentas.png'
import funcionariosIcon from '../../../assets/icones/funcionarios.png'
import manutencoesIcon from '../../../assets/icones/manutencoes.png'
import cargosIcon from '../../../assets/icones/cargos.png'
import setoresIcon from '../../../assets/icones/setores.png'
import logoutIcon from '../../../assets/icones/logout.png'
import MenuComponent from '../../../components/Menu/Menu'
import { Link } from 'react-router-dom'

function VisaoGeral(){
        return (
            
            <div className={styles.container}>
             <MenuComponent></MenuComponent>
          
              </div>
          
          
            );
    }

export default VisaoGeral;
