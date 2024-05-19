import { Link } from 'react-router-dom'
import { CardTeste } from '../../components/CardFerramentas/card_ferramentas.js'
import React from 'react'

export default class CardFerramentas extends React.Component {
    

    render() {
        
        return (
            <div className='teste_card_div'>
            <CardTeste></CardTeste>,
            <CardTeste></CardTeste>,
            <CardTeste></CardTeste>,
            <CardTeste></CardTeste>
            </div>
            )
    }
}
