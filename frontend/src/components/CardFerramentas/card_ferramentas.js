import React from "react";
import{ useEffect, useState } from 'react';
import defaultFerramenta from '../../../src/assets/imagens/defaultFerramenta2.jpg';

export const CardTeste = ({ ferramenta, defaultFerramenta }) => {

    const [data, setData] = useState([]);

    return (
        <div id="card">
            {ferramenta && ferramenta.imgFerramenta ? (
                <img src={ferramenta.imgFerramenta} alt="imagem ferramenta"></img>
            ) : (
                <img src={defaultFerramenta} style={{
                    height: "27.5vh",
                    width: "15vw"
                }} alt="imagem padrão"></img>
            )}
            <div id="fundo">
                <ul>
                    <li key={ferramenta.idFerramenta} className='ferramenta_item'>
                        <p className='nome'>{ferramenta.nome}</p>
                        <p className='numSerie'>{ferramenta.numSerie}</p>
                        <p className='status'>{ferramenta.status}</p>
                    </li>
                </ul>
                <button>VER MAIS</button>
            </div>
        </div>
    );
}

export default CardTeste;

















/*export const CardTeste = () => {
    const [data, setData] = useState([]);
    const [Ferramentas, setFerramentas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtendo o token de autorização do localStorage
    
        const fetchData = async () => {
            try {
                // Busca as Ferramentas
                const responseFerramentas = await fetch('http://127.0.0.1:8000/ferramentas/', {
                    headers: {
                        'Authorization': `Token ${token}`, // Adicionando o token de autorização ao cabeçalho
                    },
                });
                if (!responseFerramentas.ok) {
                    throw new Error('Erro ao carregar as Ferramentas');
                }
                const dataFerramentas = await responseFerramentas.json();
                setFerramentas(dataFerramentas);              
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div id="card">
           {data && data.imgFerramenta? (
            <img src={data.imgFerramenta}  alt="imagem ferramenta"></img>
        ) : (
            <img src={defaultFerramenta} style={{
                
                height:"27.5vh",
                width:"15vw"

            }} alt="imagem padrão"></img>
        )}
            <div id="fundo">
            <ul>
                    {Ferramentas.map(ferramenta => (
                        <li key={ferramenta.idFerramenta} className='ferramenta_item'>
                            <p className='nome'>{ferramenta.nome}</p>
                            <p className='numSerie'>{ferramenta.numSerie}</p>
                        </li>
                    ))}
                </ul>
                <button>VER MAIS</button>
            </div>
        </div>
    );

    
}
  
export default CardTeste;*/

