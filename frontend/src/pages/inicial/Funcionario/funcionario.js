import { Link } from 'react-router-dom'
import MenuComponent from '../../../components/Menu/Menu'
import styles from './funcionario.module.css'
import React, {useState} from 'react'

const Funcionario = () => {

  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
    
    
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
                              checked={selectedOption !== 'num_serie'}
                              onChange={(e) => setSelectedOption(e.target.value)}
                          />
                      </div>
                      <div className={styles.option_row}>
                          <label htmlFor="radio_num_serie" className={styles.label_searchbar}>Número de série</label>
                          <input
                              id="radio_num_serie"
                              className={styles.radio}
                              type="radio"
                              name="option"
                              value="num_serie"
                              checked={selectedOption === 'num_serie'}
                              onChange={(e) => setSelectedOption(e.target.value)}
                          />
                      </div>
                  </div>
              )}
          </div>
        
            </div>
          
          
            );
        
}

export default Funcionario
