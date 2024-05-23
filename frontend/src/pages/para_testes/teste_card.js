import { Link } from 'react-router-dom';
import CardTeste from '../../components/CardFerramentas/card_ferramentas.js'; // Ajuste a importação aqui
import React, { useState, useEffect } from 'react';

const CardFerramentas = () => {
    const [ferramentas, setFerramentas] = useState([]);

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

    const defaultFerramenta = 'url_to_default_image'; // Defina o caminho da imagem padrão aqui

    return (
        <div>
            {ferramentas.map(ferramenta => (
                <CardTeste 
                    key={ferramenta.idFerramenta} 
                    ferramenta={ferramenta} 
                    defaultFerramenta={defaultFerramenta} 
                />
            ))}
        </div>
    );
};

export default CardFerramentas;
