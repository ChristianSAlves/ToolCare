import { Link } from 'react-router-dom'
import MenuComponent from '../../../components/Menu/Menu'
import styles from './funcionario.module.css'
import React, {useState, useEffect} from 'react'

const Funcionario = () => {

  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [Funcionarios, setFuncionarios] = useState([]);

  const filterFuncionarios = async (newSearch, newSelectedOption) => {
    const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage

    try {
        // Busca as Ferramentas
        const responseFuncionarios = await fetch('http://127.0.0.1:8000/funcionarios/', {
            headers: {
                'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
            },
        });

        if (!responseFuncionarios.ok) {
            throw new Error('Erro ao carregar os Funcionarios');
        }

        const dataFuncionarios = await responseFuncionarios.json();
        
        let filteredFuncionarios = [];

        if (newSelectedOption === 'nome') {
            filteredFuncionarios = dataFuncionarios.filter(funcionario => funcionario.nome.toLowerCase().includes(newSearch.toLowerCase()));
        } else if (newSelectedOption === 'matriculaFuncionario') {
            filteredFuncionarios = dataFuncionarios.filter(funcionario => funcionario.matriculaFuncionario.toLowerCase().includes(newSearch.toLowerCase()));
        }

        setFuncionarios(filteredFuncionarios);
    } catch (error) {
        console.error('Erro:', error);
    }
};


useEffect(() => {
    const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage

    const fetchData = async () => {
        try {
            // Busca os funcionarios
            const responseFuncionarios = await fetch('http://127.0.0.1:8000/funcionarios/', {
                headers: {
                    'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                },
            });
            if (!responseFuncionarios.ok) {
                throw new Error('Erro ao carregar os Funcionarios');
            }
            const dataFuncionarios = await responseFuncionarios.json();
            setFuncionarios(dataFuncionarios);              
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    fetchData();
}, []);

useEffect(() => {
    filterFuncionarios(search, selectedOption);
    }, [search, selectedOption]);
    
    
        return (
          <div id={styles.div_funcionario}>
          <MenuComponent id="menu" />

          <Link to={'/funcionario_cadastro'}>
          <p id={styles.adicionar}>+</p>
          </Link>

          <div id={styles.searchbar}>
              <input
                  id={styles.input_searchbar}
                  className="conteudo_searchbar"
                  type='search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
              <p
                  id={styles.filtro}
                  onClick={() => setShowOptions(!showOptions)}
                  className="conteudo_searchbar"
              >Filtro</p>
              {showOptions && (
                  <div className={styles.options_box}>
                      <div className={styles.option_row}>
                          <label htmlFor="radio_nome" className={styles.label_searchbar}>Nome</label>
                          <input
                              id="radio_nome"
                              className={styles.radio}
                              type="radio"
                              name="option"
                              value="nome"
                              checked={selectedOption !== 'matriculaFuncionario'}
                              onChange={(e) => setSelectedOption(e.target.value)}
                          />
                      </div>
                      <div className={styles.option_row}>
                          <label htmlFor="radio_mat_func" className={styles.label_searchbar}>Matricula Funcionario</label>
                          <input
                              id="radio_mat_func"
                              className={styles.radio}
                              type="radio"
                              name="option"
                              value="matriculaFuncionario"
                              checked={selectedOption === 'matriculaFuncionario'}
                              onChange={(e) => setSelectedOption(e.target.value)}
                          />
                      </div>
                  </div>
              )}
          </div>
          <div className={styles.funcionarios_container}>
                <ul id={styles.funcionarios_list} className={styles.funcionarios_list}>
                {Funcionarios.map(funcionario => (
                        <li key={funcionario.matriculaFuncionario} className={styles.funcionario_item}>
                            <p className={styles.funcionario_nome}>{funcionario.nome}</p>
                            <p className={styles.funcionario_matriculaFuncionario}>{funcionario.matriculaFuncionario}</p>
                        </li>
                    ))}
                </ul>
            </div>
        
            </div>
          
          
            );
        
}

export default Funcionario
