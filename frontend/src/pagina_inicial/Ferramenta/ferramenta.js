import React, { useState } from 'react'
import { dados } from './ferramenta_json'
import styles from "../Ferramenta/ferramenta.module.css"

const Filtro = () => {

    const [showOptions, setShowOptions] = useState(false);

    const [search, setSearch] = useState("");
    const [selectedOption, setSelectedOption] = useState('');

    const searchLowerCase = search.toLowerCase();
    const ferramentas = dados.filter(ferramenta =>
        selectedOption === "num_serie"
            ? ferramenta.numSerie.includes(searchLowerCase)
            : ferramenta.nome.toLowerCase().includes(searchLowerCase)
    );

    return (
        <>
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
            <ul id={styles.ferramentas_list} class={styles.ferramentas_list}>
                {ferramentas.map(ferramenta => (
                    <li key={ferramenta.numSerie} class={styles.ferramenta_item}>
                        <p class={styles.ferramenta_nome}> {ferramenta.nome}</p>
                        <p class={styles.ferramenta_numSerie}>{ferramenta.numSerie}</p>
                    </li>
                ))}
            </ul>

        </>
    );
}

export default Filtro;
