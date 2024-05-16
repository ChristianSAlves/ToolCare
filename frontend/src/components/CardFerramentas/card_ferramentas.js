import React from "react";
import{ useEffect, useState } from 'react';
import defaultFerramenta from '../../../src/assets/imagens/defaultFerramenta.jpg';

export const CardTeste = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtendo o token de autorização do localStorage
                const token = localStorage.getItem('token');

                // Busca os dados necessários da API
                const response = await fetch('http://127.0.0.1:8000/ferramentas/', {
                    headers: {
                        'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }

                const data = await response.json();
                setData(data);

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div id="card">
           {data && data.imgFerramenta? (
            <img src={data.imgFerramenta} alt="imagem ferramenta"></img>
        ) : (
            <img src={defaultFerramenta} alt="imagem padrão"></img>
        )}
            <div id="fundo">
                <p id="nomeFerramenta">{data.nome}</p>
                <p id="numSerie" className="dado">{data.numSerie}</p>
                <p id="status" className="dado">{data.status}</p>
                <p id="descricao" className="dado">{data.descricao}</p>
                <p id="dataAquisicao" className="dado">{data.dataAquisicao}</p>
                <button>VER MAIS</button>
            </div>
        </div>
    );
}
  
export default CardTeste;
=======
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

>>>>>>> 41f09ff7afb0424087fc5f8d9f2d8aaf1d30d565
