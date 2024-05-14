import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Cargo from './cadastro/cargo'
import VisaoGeral from './cadastro/visao_geral'
import Emprestimo from './cadastro/emprestimo'
import Ferramenta from './cadastro/ferramenta'
import Funcionario from './cadastro/funcionario'
import Manutencao from './cadastro/manutencao'
import Card from './teste_card.js'
import Setor from './cadastro/setor'
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
                <Route path='/login' element={<Login/>}/>
                <Route path='/card' element={<Card/>}/>
            </Routes>
        </Router>
    )
}

export default App