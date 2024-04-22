import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Cargo from './cadastro/cargo'
import VisaoGeral from './cadastro/visao_geral'
import Emprestimo from './cadastro/emprestimo'
import Ferramenta from './cadastro/ferramenta'
import Funcionario from './cadastro/funcionario'
import Manutencao from './cadastro/manutencao'
import Setor from './cadastro/setor'

function Rotas() {
    return(
        <Router>
            <Routes>
                <Route path='*' element={<p>A URL informada não existe no projeto ToolCare</p>}/>
                <Route path='/visao_geral' element={<VisaoGeral/>}/>
                <Route path='/cargo' element={Cargo}/>
                <Route path='/emprestimo' element={<Emprestimo/>}/>
                <Route path='/ferramenta' element={<Ferramenta/>}/>
                <Route path='/funcionario' element={<Funcionario/>} />
                <Route path='/manutencao' element={<Manutencao/>}/>
                <Route path='/setor' element={<Setor/>}/>
            </Routes>
        </Router>
    )
}

export default Rotas