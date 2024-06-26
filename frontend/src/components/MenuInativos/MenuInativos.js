import React, { useState, useEffect } from "react";
import styles from './MenuInativos.module.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import emprestimosIcon from '../../assets/icones/emprestimos_preto.png';
import ferramentasIcon from '../../assets/icones/ferramentas_preto.png';
import funcionariosIcon from '../../assets/icones/funcionarios_preto.png';
import manutencoesIcon from '../../assets/icones/manutencoes_preto.png';
import cargosIcon from '../../assets/icones/cargos_preto.png';
import setoresIcon from '../../assets/icones/setores_preto.png';
import logoutIcon from '../../assets/icones/logout_preto.png';
import emprestimosIconLaranja from '../../assets/icones/emprestimos_laranja.png';
import ferramentasIconLaranja from '../../assets/icones/ferramentas_laranja.png';
import funcionariosIconLaranja from '../../assets/icones/funcionarios_laranja.png';
import manutencoesIconLaranja from '../../assets/icones/manutencoes_laranja.png';
import cargosIconLaranja from '../../assets/icones/cargos_laranja.png';
import setoresIconLaranja from '../../assets/icones/setores_laranja.png';
import ativosIcon from '../../assets/icones/ativos_preto.png'

export const MenuInativosComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        const savedSelectedItem = localStorage.getItem('selectedItem');
        if (savedSelectedItem) {
            setSelectedItem(savedSelectedItem);
        } else {
            const currentPath = location.pathname.split('/')[1];
            setSelectedItem(currentPath);
        }
    }, [location.pathname]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        localStorage.setItem('selectedItem', item);
    };

    const getIconSrc = (item, defaultIcon, activeIcon) => {
        return selectedItem === item ? activeIcon : defaultIcon;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setSelectedItem('visao_geral'); // Redefine o estado selecionado para "visao_geral"
        localStorage.setItem('selectedItem', 'visao_geral'); // Salva o estado como "visao_geral"
        navigate('/login');
    };

    return (
        <div id={styles.menu_div}>
            <nav id={styles.menu_nav}>
                <ul id={styles.menu_ul}>
                    <Link to="/emprestimo_inativo">
                        <li
                            id="emprestimos"
                            className={`${styles.div_navbar} ${selectedItem === 'emprestimos' ? styles.selected : ''}`}
                            onClick={() => handleItemClick('emprestimos')}
                        >
                            <img src={getIconSrc('emprestimos', emprestimosIcon, emprestimosIconLaranja)} className={`${styles.item} ${styles.quadradinho}`} alt="Ícone de empréstimos" />
                            <h4 id="texto_emprestimos" className={`${styles.item} ${styles.texto_menu} ${selectedItem === 'emprestimos' ? styles.selected : ''}`}>EMPRÉSTIMOS</h4>
                        </li>
                    </Link>
                    <Link to="/ferramenta_inativo">
                        <li
                            id="ferramentas"
                            className={`${styles.div_navbar} ${selectedItem === 'ferramentas' ? styles.selected : ''}`}
                            onClick={() => handleItemClick('ferramentas')}
                        >
                            <img src={getIconSrc('ferramentas', ferramentasIcon, ferramentasIconLaranja)} className={`${styles.item} ${styles.quadradinho}`} alt="Ícone de ferramentas" />
                            <h4 id="texto_ferramentas" className={`${styles.item} ${styles.texto_menu} ${selectedItem === 'ferramentas' ? styles.selected : ''}`}>FERRAMENTAS</h4>
                        </li>
                    </Link>
                    <Link to="/funcionario_inativo">
                        <li
                            id="funcionarios"
                            className={`${styles.div_navbar} ${selectedItem === 'funcionarios' ? styles.selected : ''}`}
                            onClick={() => handleItemClick('funcionarios')}
                        >
                            <img src={getIconSrc('funcionarios', funcionariosIcon, funcionariosIconLaranja)} className={`${styles.item} ${styles.quadradinho}`} alt="Ícone de funcionários" />
                            <h4 id="texto_funcionarios" className={`${styles.item} ${styles.texto_menu} ${selectedItem === 'funcionarios' ? styles.selected : ''}`}>FUNCIONÁRIOS</h4>
                        </li>
                    </Link>
                    <Link to="/manutencao_inativo">
                        <li
                            id="manutencoes"
                            className={`${styles.div_navbar} ${selectedItem === 'manutencoes' ? styles.selected : ''}`}
                            onClick={() => handleItemClick('manutencoes')}
                        >
                            <img src={getIconSrc('manutencoes', manutencoesIcon, manutencoesIconLaranja)} className={`${styles.item} ${styles.quadradinho}`} alt="Ícone de manutenções" />
                            <h4 id="texto_manutencoes" className={`${styles.item} ${styles.texto_menu} ${selectedItem === 'manutencoes' ? styles.selected : ''}`}>MANUTENÇÕES</h4>
                        </li>
                    </Link>
                    {/*<Link to="/cargo_inativo">
                        <li
                            id="cargos"
                            className={`${styles.div_navbar} ${selectedItem === 'cargos' ? styles.selected : ''}`}
                            onClick={() => handleItemClick('cargos')}
                        >
                            <img src={getIconSrc('cargos', cargosIcon, cargosIconLaranja)} className={`${styles.item} ${styles.quadradinho}`} alt="Ícone de cargos" />
                            <h4 id="texto_cargos" className={`${styles.item} ${styles.texto_menu} ${selectedItem === 'cargos' ? styles.selected : ''}`}>CARGOS</h4>
                        </li>
                    </Link>
                    <Link to="/setor_inativo">
                        <li
                            id="setores"
                            className={`${styles.div_navbar} ${selectedItem === 'setores' ? styles.selected : ''}`}
                            onClick={() => handleItemClick('setores')}
                        >
                            <img src={getIconSrc('setores', setoresIcon, setoresIconLaranja)} className={`${styles.item} ${styles.quadradinho}`} alt="Ícone de setores" />
                            <h4 id="texto_setores" className={`${styles.item} ${styles.texto_menu} ${selectedItem === 'setores' ? styles.selected : ''}`}>SETORES</h4>
                        </li>
                    </Link>*/}
                </ul>
                <Link to="/visao_geral" state={{ selectedItem: 'visao_geral' }}>
                <li id="ativos" className={`${styles.div_navbar} ${styles.div_ativos}`}>
                    <img src={ativosIcon} className={`${styles.item} ${styles.quadradinho_ativos}`} alt="Ícone de ativos" />
                    <h4 id="texto_ativos" className={`${styles.item} ${styles.texto_menu}`}>ATIVOS</h4>
                </li>
                </Link>
                <li id="logout" className={`${styles.div_navbar} ${styles.div_logout}`} onClick={logout}>
                    <img src={logoutIcon} className={`${styles.item} ${styles.quadradinho_logout}`} alt="Ícone de logout" />
                    <h4 id="texto_logout" className={`${styles.item} ${styles.texto_menu}`}>SAIR</h4>
                </li>
            </nav>
        </div>
    );
};

export default MenuInativosComponent;
