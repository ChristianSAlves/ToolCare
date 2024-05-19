import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import CargoCadastro from './cadastro/cargo_cadastro.js'
import VisaoGeral from './pagina_inicial/visao_geral'
import EmprestimoCadastro from './cadastro/emprestimo_cadastro.js'
import FerramentaCadastro from './cadastro/ferramenta_cadastro.js'
import FuncionarioCadastro from './cadastro/funcionario_cadastro.js'
import ManutencaoCadastro from './cadastro/manutencao_cadastro.js'
import Card from './pages/para_testes/teste_card.js'
import SetorCadastro from './cadastro/setor_cadastro.js'
import Ferramenta from './pagina_inicial/Ferramenta/ferramenta.js'
import Cargo from './pagina_inicial/Cargo/cargo.js'
import Funcionario from './pagina_inicial/Funcionario/funcionario.js'
import Emprestimo from './pagina_inicial/Emprestimo/emprestimo.js'
import Setor from './pagina_inicial/Setor/setor.js'
import Manutencao from './pagina_inicial/Manutencao/manutencao.js'
import Login from './login'

function Rotas() {
    
    return(
        
        <Router>
            <Routes>
                <Route path='/visao_geral' element={<VisaoGeral/>}/>
                <Route path='/cargo_cadastro' element={<CargoCadastro/>}/>
                <Route path='/cargo' element={<Cargo/>}/>
                <Route path='/emprestimo_cadastro' element={<EmprestimoCadastro/>}/>
                <Route path='/emprestimo' element={<Emprestimo/>}/>
                <Route path='/ferramenta_cadastro' element={<FerramentaCadastro/>}/>
                <Route path='/ferramenta' element={<Ferramenta/>}/>
                <Route path='/funcionario_cadastro' element={<FuncionarioCadastro/>} />
                <Route path='/funcionario' element={<Funcionario/>} />
                <Route path='/manutencao_cadastro' element={<ManutencaoCadastro/>}/>
                <Route path='/manutencao' element={<Manutencao/>}/>
                <Route path='/setor_cadastro' element={<SetorCadastro/>}/>
                <Route path='/setor' element={<Setor/>}/>

                <Route path='/login' element={<Login/>}/>
                <Route path='/card' element={<Card/>}/>
                
            </Routes>
        </Router>
    )
}

export default Rotas