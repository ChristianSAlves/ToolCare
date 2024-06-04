import { Link } from 'react-router-dom';
import ConfirmarRemocaoComponent from '../../components/Avisos/ConfirmarRemoção/confirmar_remocao';
import React, { useState, useEffect } from 'react';

const TesteAvisos = () => {
    const [showConfirm, setShowConfirm] = useState(true); // Controle de visibilidade

    const handleConfirm = () => {
        // Lógica para a ação de confirmação
        console.log("Confirmado!");
        setShowConfirm(false); // Esconde o componente após confirmar
    };

    const handleCancel = () => {
        // Lógica para a ação de cancelamento
        console.log("Cancelado!");
        setShowConfirm(false); // Esconde o componente após cancelar
    };

    return (
        <div>
            {showConfirm && (
                <ConfirmarRemocaoComponent
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default TesteAvisos;
