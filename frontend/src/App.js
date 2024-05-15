import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import CargoCadastro from './cadastro/cargo_cadastro.js'
import VisaoGeral from './pagina_inicial/visao_geral.js'
import EmprestimoCadastro from './cadastro/emprestimo_cadastro.js'
import FerramentaCadastro from './cadastro/ferramenta_cadastro.js'
import FuncionarioCadastro from './cadastro/funcionario_cadastro.js'
import ManutencaoCadastro from './cadastro/manutencao_cadastro.js'
import SetorCadastro from './cadastro/setor_cadastro.js'
import Cargo from './pagina_inicial/cargo'
import Emprestimo from './pagina_inicial/emprestimo'
import Ferramenta from './pagina_inicial/ferramenta'
import Funcionario from './pagina_inicial/funcionario'
import Manutencao from './pagina_inicial/manutencao'
import Setor from './pagina_inicial/setor'
import Card from './teste_card.js'
import Searchbar from './teste_searchbar.js'
import Login from './login'

function App() {
    
    return(
        
        <Router>
            <Routes>
                <Route path='/visao_geral' element={<VisaoGeral/>}/>
                <Route path='/cargo' element={<Cargo/>}/>
                <Route path='/emprestimo' element={<Emprestimo/>}/>
                <Route path='/ferramenta' element={<Ferramenta/>}/>
                <Route path='/funcionario' element={<Funcionario/>} />
                <Route path='/manutencao' element={<Manutencao/>}/>
                <Route path='/setor' element={<Setor/>}/>
                <Route path='/cargo_cadastro' element={<CargoCadastro/>}/>
                <Route path='/emprestimo_cadastro' element={<EmprestimoCadastro/>}/>
                <Route path='/ferramenta_cadastro' element={<FerramentaCadastro/>}/>
                <Route path='/funcionario_cadastro' element={<FuncionarioCadastro/>} />
                <Route path='/manutencao_cadastro' element={<ManutencaoCadastro/>}/>
                <Route path='/setor_cadastro' element={<SetorCadastro/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/card' element={<Card/>}/>
                <Route path='/searchbar' element={<Searchbar/>}/>
            </Routes>
        </Router>
    )
}

export default App