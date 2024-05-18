import React,{ useState } from "react";
import lupa from "../../assets/imagens/lupa.png"
import filtro from "../../assets/imagens/filtro.png"

export const SearchbarTeste = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  

    return (
        <div id="searchbar">
          <input id="input_searchbar" className="conteudo_searchbar" type="text"></input>
          <img id="filtro" className="conteudo_searchbar" src={filtro} onClick={toggleOptions}></img>
          <img id="lupa" className="conteudo_searchbar" src={lupa}></img>
          {showOptions && (
            <div className="options-box">
              <label htmlFor="teste1">Nome</label>
              <input id="teste1" type="checkbox"></input>
              <label htmlFor=""></label>
              <input type="checkbox"></input>
              <input type="checkbox"></input>
            </div>
          )}
        </div>
    );
  };

