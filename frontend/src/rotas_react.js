
import { Routes, Route, Navigate } from 'react-router-dom';
import CargoCadastro from './pages/cadastro/Cargo/cargo_cadastro.js'
import VisaoGeral from './pages/inicial/VisaoGeral/visao_geral.js'
import EmprestimoCadastro from './pages/cadastro/Emprestimo/emprestimo_cadastro.js'
import FerramentaCadastro from './pages/cadastro/Ferramenta/ferramenta_cadastro.js'
import FuncionarioCadastro from './pages/cadastro/Funcionario/funcionario_cadastro.js'
import ManutencaoCadastro from './pages/cadastro/Manutencao/manutencao_cadastro.js'
import Card from './pages/para_testes/teste_card.js'
import Menu from './pages/para_testes/teste_menu.js'
import Modal from './pages/para_testes/teste_modal_ferramentas.js'
import Avisos from './pages/para_testes/teste_avisos.js'
import SetorCadastro from './pages/cadastro/Setor/setor_cadastro.js'
import Ferramenta from './pages/inicial/Ferramenta/ferramenta.js'
import Cargo from './pages/inicial/Cargo/cargo.js'
import Funcionario from './pages/inicial/Funcionario/funcionario.js'
import Emprestimo from './pages/inicial/Emprestimo/emprestimo.js'
import Setor from './pages/inicial/Setor/setor.js'
import Manutencao from './pages/inicial/Manutencao/manutencao.js'
import EmprestimoInativo from './pages/inativos/Emprestimo/emprestimo_inativo.js'
import ManutencaoInativo from './pages/inativos/Manutencao/manutencao_inativo.js'
import FuncionarioInativo from './pages/inativos/Funcionario/funcionario_inativo.js'
import FerramentaInativo from './pages/inativos/Ferramenta/ferramenta_inativo.js'
import Login from './pages/login/login.js'
import RequireAuth from './RequireAuth.js'
import RelatorioFerramenta from './pages/relatorio/relatorio_ferramenta/relatorio_ferramenta.js'
function Rotas() {

    return (


        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={
                <RequireAuth>
                    <Routes>
                        <Route path='/card' element={<Card />} />
                        <Route path="/" element={<Navigate replace to="/visao_geral" />} />
                        <Route path="*" element={<Navigate replace to="/visao_geral" />} />
                        <Route path='/menu' element={<Menu />} />
                        <Route path='/modal' element={<Modal />} />
                        <Route path='/avisos' element={<Avisos />} />
                        <Route path='/visao_geral' element={<VisaoGeral />} />
                        <Route path='/cargo_cadastro' element={<CargoCadastro />} />
                        <Route path='/cargo' element={<Cargo />} />
                        <Route path='/emprestimo_cadastro' element={<EmprestimoCadastro />} />
                        <Route path='/emprestimo' element={<Emprestimo />} />
                        <Route path='/ferramenta_cadastro' element={<FerramentaCadastro />} />
                        <Route path='/ferramenta' element={<Ferramenta />} />
                        <Route path='/funcionario_cadastro' element={<FuncionarioCadastro />} />
                        <Route path='/funcionario' element={<Funcionario />} />
                        <Route path='/manutencao_cadastro' element={<ManutencaoCadastro />} />
                        <Route path='/manutencao' element={<Manutencao />} />
                        <Route path='/setor_cadastro' element={<SetorCadastro />} />
                        <Route path='/setor' element={<Setor />} />
                        <Route path='/emprestimo_inativo' element={<EmprestimoInativo />} />
                        <Route path='/ferramenta_inativo' element={<FerramentaInativo />} />
                        <Route path='/funcionario_inativo' element={<FuncionarioInativo />} />
                        <Route path='/manutencao_inativo' element={<ManutencaoInativo />} />
                        <Route path='/relatorio_ferramenta' element={<RelatorioFerramenta />} />
                    </Routes>
                </RequireAuth>
            } />
        </Routes>

    )
}

export default Rotas