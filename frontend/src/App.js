import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import CargoCadastro from './pages/cadastro/Cargo/cargo_cadastro.js'
import VisaoGeral from './pages/inicial/VisaoGeral/visao_geral.js'
import EmprestimoCadastro from './pages/cadastro/Emprestimo/emprestimo_cadastro.js'
import FerramentaCadastro from './pages/cadastro/Ferramenta/ferramenta_cadastro.js'
import FuncionarioCadastro from './pages/cadastro/Funcionario/funcionario_cadastro.js'
import ManutencaoCadastro from './pages/cadastro/Manutencao/manutencao_cadastro.js'
import Card from './pages/para_testes/teste_card.js'
import Menu from './pages/para_testes/teste_menu.js'
import SetorCadastro from './pages/cadastro/Setor/setor_cadastro.js'
import Ferramenta from './pages/inicial/Ferramenta/ferramenta.js'
import Cargo from './pages/inicial/Cargo/cargo.js'
import Funcionario from './pages/inicial/Funcionario/funcionario.js'
import Emprestimo from './pages/inicial/Emprestimo/emprestimo.js'
import Setor from './pages/inicial/Setor/setor.js'
import Manutencao from './pages/inicial/Manutencao/manutencao.js'
import Login from './pages/login/login.js'
import RequireAuth from './RequireAuth.js'

/*function App() {
    
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
                <Route path='/menu' element={<Menu/>}/>
                
            </Routes>
        </Router>
    )
}

export default App*/ 


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='*' element={
                    <RequireAuth>
                        <Routes>
                        <Route path='/card' element={<Card/>}/>
                        <Route path='/menu' element={<Menu/>}/>
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
                        </Routes>
                    </RequireAuth>
                }/>
            </Routes>
        </Router>
    );
}

export default App;


