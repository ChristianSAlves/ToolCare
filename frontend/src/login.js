import styles from '../src/index.css'
import login from '../src/assets/imagens/mario.png'
import { Link } from 'react-router-dom'

function Login(){

        return (
            <div className={styles.container}>
              
              <div className="login_container">
                <img id="logo" src={login} alt=""></img>
                <form id="form_login" action="#">
                <input type="text" className="login_item input" placeholder="token de acesso"></input>
                <input type="password" className="login_item input senha" placeholder="senha"></input>
                <Link to={"/visao_geral"}><button type="submit" value="submit" className="login_item" id="botao_entrar">ENTRAR</button></Link>
            </form>
            </div>
          
              </div>
          
          
            );
    }

export default Login;
