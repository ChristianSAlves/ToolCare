import React from "react";
import Mario from '../../../src/assets/imagens/mario.png'

export const CardTeste = () => {
    
    return (
    <div id="card">
        <img src={Mario} alt="mariano mostrando o rabo"></img>
        <div id="fundo">
            <p id="ferramenta">Nome da ferramenta</p>
            <p id="nome_func" className="dado">Nome do funcionário</p>
            <p id="cod_fer" className="dado">492498</p>
            <button>VER MAIS</button>
        </div>
    </div>
    );
  };

