import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from '../index.css'
import axios from 'axios';

export const MultiSelect = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    
  
    useEffect(() => {
      const carregarDados = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/ferramentas/');
          setOptions(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        }
      };
  
      carregarDados();
    }, []);
  
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <Select isMulti options={options} className="teste_multiselect" />
        )}
      </div>
    );
  };

