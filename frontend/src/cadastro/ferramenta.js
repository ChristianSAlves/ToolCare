import styles from '../index.css'
import visaoGeralIcon from '../assets/icones/visao_geral.png'
import emprestimosIcon from '../assets/icones/emprestimos.png'
import ferramentasIcon from '../assets/icones/ferramentas_laranja.png'
import funcionariosIcon from '../assets/icones/funcionarios.png'
import manutencoesIcon from '../assets/icones/manutencoes.png'
import cargosIcon from '../assets/icones/cargos.png'
import setoresIcon from '../assets/icones/setores.png'
import logoutIcon from '../assets/icones/logout.png'
import { Link } from 'react-router-dom'
import React, {useState} from 'react'

const Ferramenta = () => {

    const [nome, setNome] = useState('');
    const [numSerie, setNumSerie] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imgFerramenta, setImgFerramenta] = useState();
    const [dataAquisicao, setDataAquisicao] = useState(new Date());
    const [status, setStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('numSerie', numSerie);
        formData.append('descricao', descricao);
        formData.append('imgFerramenta', imgFerramenta, imgFerramenta.name);
        formData.append('dataAquisicao', dataAquisicao);
        formData.append('status', status);
    
        try {
            const response = await fetch('http://127.0.0.1:8000/ferramentas/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
                body: formData,
            });
    
            if (!response.ok) {   
                console.log('Status da resposta:', response.status);
                console.log('Texto da resposta:', await response.text());         
                throw new Error('Erro ao enviar imagem');
            }
    
            const data = await response.json();
            console.log('Success:', data);
            setImgFerramenta('');
        } catch (error) {
            console.error('Error:', error);
            console.log('Detalhes do erro:', error.message);
        }
    };
    
    
        return (
            <div className={styles.container}>
              <div id='tela'>
              <form onSubmit={handleSubmit} action="#" method="post" autoComplete="off" id="cadastro_ferramenta_form">
                <p id="cadastro">Cadastro de Ferramenta</p>
                <input id="nome" name="nome" type="text" placeholder="Nome" required value={nome} onChange={(evt) => setNome(evt.target.value)}></input>
                <input id="numero_serie" name="numero_serie" type="number" placeholder="Número de Série" required value={numSerie} onChange={(evt) => setNumSerie(evt.target.value)}></input>
                <input id="descricao" name="descricao" type="text" placeholder="Descrição" value={descricao} onChange={(evt) => setDescricao(evt.target.value)}></input>
                <div className='spacer'>
                <label id="status_label">Status</label>
                <select name="status" id="status_select" required value={status} onChange={(evt) => setStatus(evt.target.value)}>
                  <option value ="">Selecione</option>  
                  <option value="emprestada">Emprestada</option>
                  <option value="disponivel">Disponível</option>
                  <option value="perdida">Perdida</option>
                  <option value="manutencao">Manutenção</option>
                </select></div>
                <div className="spacer">
                <label id="data_aquisicao_label">Data de aquisição</label>
                <input type="date" id="data_aquisicao_datepicker" required value={dataAquisicao} onChange={(evt) => setDataAquisicao(evt.target.value)}></input>
                </div>
                <div className="spacer">
                <label  id="data_baixa_label">Data de baixa</label>
                <input type="date" id="data_baixa_datepicker"></input>
                </div>
                <div className='spacer'>
                <label id='foto_label'>Foto</label>
                <input type="file" id="foto" name="foto" accept=".png,.jpg,.jpeg" required onChange={(evt) => setImgFerramenta(evt.target.files[0])}></input></div>
                <button id="enviar" type="submit">ENVIAR</button>
              </form></div>
          
              <nav id="menu">
              <ul>
                      <Link to={"/visao_geral"}>
                          <li id="visao_geral" className="div_navbar">
                              <img src={visaoGeralIcon} className="quadradinho quadradinho_visao_geral"
                                  alt="Ícone de visão geral"></img>
                              <h4 id="texto_visao_geral" className="texto_menu">VISÃO GERAL</h4>
                          </li>
                      </Link>
                      <Link to={"/emprestimo"}>
                          <li id="emprestimos" className="div_navbar">
                              <img src={emprestimosIcon} className="quadradinho_emprestimos quadradinho"
                                  alt="Ícone de empréstimos"></img>
                              <h4 id="texto_emprestimos" className="texto_menu">EMPRÉSTIMOS</h4>
                          </li>
                      </Link>
                      <Link to={"/ferramenta"}>
                          <li id="ferramentas" className="div_navbar">
                              <img src={ferramentasIcon} className="quadradinho_ferramentas quadradinho"
                                  alt="Ícone de ferramentas"></img>
                              <h4 id="texto_ferramentas" className="texto_menu">FERRAMENTAS</h4>
                          </li>
                      </Link>
                      <Link to={"/funcionario"}>
                          <li id="funcionarios" className="div_navbar">
                              <img src={funcionariosIcon} className="quadradinho_funcionarios quadradinho"
                                  alt="Ícone de funcionários"></img>
                              <h4 id="texto_funcionarios" className="texto_menu">FUNCIONÁRIOS</h4>
                          </li>
                      </Link>
                      <Link to={"/manutencao"}>
                          <li id="manutencoes" className="div_navbar">
                              <img src={manutencoesIcon} className="quadradinho_manutencoes quadradinho"
                                  alt="Ícone de manutenções"></img>
                              <h4 id="texto_manutencoes" className="texto_menu">MANUTENÇÕES</h4>
                          </li>
                      </Link>
                      <Link to={"/cargo"}>
                          <li id="cargos" className="div_navbar">
                              <img src={cargosIcon} className="quadradinho_cargos quadradinho" alt="Ícone de cargos"></img>
                              <h4 id="texto_cargos" className="texto_menu">CARGOS</h4>
                          </li>
                      </Link>
                      <Link to={"/setor"}>
                          <li id="setores" className="div_navbar">
                              <img src={setoresIcon} className="quadradinho_setores quadradinho"
                                  alt="Ícone de setores"></img>
                              <h4 id="texto_setores" className="texto_menu">SETORES</h4>
                          </li>
                      </Link>
                      <Link to={"/login"}>
                      <li id="logout" className="div_navbar">
                              <img src={logoutIcon} className="quadradinho_logout quadradinho"
                                  alt="Ícone de logout"></img>
                              <h4 id="texto_logout" className="texto_menu">SAIR</h4>
                          </li>
                          </Link>
                  </ul>
              </nav>
          
              </div>
          
          
            );
    
};

export default Ferramenta;

