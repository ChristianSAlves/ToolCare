import styles from '../index.css'
import visaoGeral from '../assets/icones/visao_geral.png'
import emprestimos from '../assets/icones/emprestimos.png'
import ferramentas from '../assets/icones/ferramentas.png'
import funcionarios from '../assets/icones/funcionarios_laranja.png'
import manutencoes from '../assets/icones/manutencoes.png'
import cargos from '../assets/icones/cargos.png'
import setores from '../assets/icones/setores.png'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'


const Funcionario = () => {
    const [nome, setNome] = useState('');
    const [matriculaFuncionario, setMatriculaFuncionario] = useState('');
    const [cpf, setCpf] = useState('');
    const [codigoSetor, setCodigoSetor] = useState(0);
    const [codigoCargo, setCodigoCargo] = useState(0);
    const [imgFunc, setImgFunc] = useState();
   
   
   
    const handleSubmit = async (event) => {
        event.preventDefault();

        const linksetor = `http://127.0.0.1:8000/setores/${codigoSetor}/`;
        const linkcargo = `http://127.0.0.1:8000/cargos/${codigoCargo}/`;
    
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('matriculaFuncionario', matriculaFuncionario);
        formData.append('cpf', cpf);
        formData.append('codigoSetor', linksetor);
        formData.append('codigoCargo', linkcargo);
        formData.append('imgFunc', imgFunc, imgFunc.name);
    
        try {
            const response = await fetch('http://127.0.0.1:8000/funcionarios/', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {   
                console.log(linkcargo)
                console.log(linksetor)
                console.log('Status da resposta:', response.status);
                console.log('Texto da resposta:', await response.text());         
                throw new Error('Erro ao enviar imagem');
            }
    
            const data = await response.json();
            console.log('Success:', data);
            // Se desejar fazer algo com os dados da resposta, você pode fazer aqui
    
            // Limpa o estado da imagem após o envio bem-sucedido
            setImgFunc('');
        } catch (error) {
            console.error('Error:', error);
            console.log('Detalhes do erro:', error.message);
            // Trate o erro de acordo com a necessidade do seu aplicativo
        }
    };
    
   
    return (
       <div className={styles.container}>
         <div id='tela'>
           <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off" id="cadastro_funcionario_form">
           <p id="cadastro">Cadastro de Funcionário</p>
                <input id="nome" name="nome" type="text" placeholder="Nome" required value={nome} onChange={(evt) => setNome(evt.target.value)}></input>
                <input id="matriculaFuncionario" name="matriculaFuncionario" type="text" placeholder="Matrícula" required value={matriculaFuncionario} onChange={(evt) => setMatriculaFuncionario(evt.target.value)}></input>
                <input id="cpf" name="cpf" type="text" placeholder="CPF" required value={cpf} onChange={(evt) => setCpf(evt.target.value)}></input>
                <div id='spacer'>
                <label id="setor_label">Setor</label>
                <select name="codigoSetor" id="setor_select" value={codigoSetor} onChange={evt => setCodigoSetor(evt.target.value)}>
                  <option value ={0}>Selecione</option>  
                  <option value={1}>1</option>
                  <option value={1}>1</option>
                  <option value={1}>1</option>
                </select></div>
                <div id="spacer">
                <label id="cargo_label">Cargo</label>
                <select name="codigoCargo" id="cargo_select" value={codigoCargo} onChange={evt => setCodigoCargo(evt.target.value)}>
                  <option value ={0}>Selecione</option>   
                  <option value={11}>Recursos Humanos</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select></div>
                <div id='spacer'>
                <label id='foto_label'>Foto</label>
                <input type="file" id="foto" name="foto" accept=".png,.jpg,.jpeg" onChange={(evt) => setImgFunc(evt.target.files[0])}></input>
</div>
                <button id="enviar" type="submit">ENVIAR</button>
           </form>
         </div>
         <nav id="menu">
                  <ul>
                      <Link to={"/visao_geral"}>
                          <li id="visao_geral" className="div_navbar">
                              <img src={visaoGeral} className="quadradinho quadradinho_visao_geral"
                                  alt="Ícone de visão geral"></img>
                              <h4 id="texto_visao_geral" className="texto_menu">VISÃO GERAL</h4>
                          </li>
                      </Link>
                      <Link to={"/emprestimo"}>
                          <li id="emprestimos" className="div_navbar">
                              <img src={emprestimos} className="quadradinho_emprestimos quadradinho"
                                  alt="Ícone de empréstimos"></img>
                              <h4 id="texto_emprestimos" className="texto_menu">EMPRÉSTIMOS</h4>
                          </li>
                      </Link>
                      <Link to={"/ferramenta"}>
                          <li id="ferramentas" className="div_navbar">
                              <img src={ferramentas} className="quadradinho_ferramentas quadradinho"
                                  alt="Ícone de ferramentas"></img>
                              <h4 id="texto_ferramentas" className="texto_menu">FERRAMENTAS</h4>
                          </li>
                      </Link>
                      <Link to={"/funcionario"}>
                          <li id="funcionarios" className="div_navbar">
                              <img src={funcionarios} className="quadradinho_funcionarios quadradinho"
                                  alt="Ícone de funcionários"></img>
                              <h4 id="texto_funcionarios" className="texto_menu">FUNCIONÁRIOS</h4>
                          </li>
                      </Link>
                      <Link to={"/manutencao"}>
                          <li id="manutencoes" className="div_navbar">
                              <img src={manutencoes} className="quadradinho_manutencoes quadradinho"
                                  alt="Ícone de manutenções"></img>
                              <h4 id="texto_manutencoes" className="texto_menu">MANUTENÇÕES</h4>
                          </li>
                      </Link>
                      <Link to={"/cargo"}>
                          <li id="cargos" className="div_navbar">
                              <img src={cargos} className="quadradinho_cargos quadradinho" alt="Ícone de cargos"></img>
                              <h4 id="texto_cargos" className="texto_menu">CARGOS</h4>
                          </li>
                      </Link>
                      <Link to={"/setor"}>
                          <li id="setores" className="div_navbar">
                              <img src={setores} className="quadradinho_setores quadradinho"
                                  alt="Ícone de setores"></img>
                              <h4 id="texto_setores" className="texto_menu">SETORES</h4>
                          </li>
                      </Link>
                  </ul>
              </nav>

       </div>
    );
   };
   
   export default Funcionario;