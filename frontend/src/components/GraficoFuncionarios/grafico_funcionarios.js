import React from 'react';
import Chart from 'react-apexcharts';
import styles from './grafico_funcionarios.module.css';

class GraficoFuncionarios extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: props.series || [1, 1],
            options: {
                fill: {
                    colors: ['#0BDD17', '#DD0B0B']
                },
                chart: {
                    type: 'donut',
                    height: '100%',
                    width: '100%'
                },
                stroke: {
                    show: false, // Desativa as bordas brancas
                    width: 0
                },
                legend: {
                    show: false
                },
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        customScale: 1,
                        donut: {
                            size: '60%'
                        },
                    }
                },
                dataLabels: {
                    enabled: false // Desativa a legenda dentro das fatias
                },
                states: {
                    hover: {
                        filter: {
                            type: 'none',
                        }
                    },
                    active: {
                        filter: {
                            type: 'none',
                        }
                    }
                },
                tooltip: {
                    enabled: false // Desativa o tooltip
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.series && nextProps.series.join('') !== prevState.series.join('')) {
            return { series: nextProps.series };
        }
        return null;
    }

    render() {
        return (
            <div className={styles.chartContainer}>
                <div id={styles.chart}>
                    <Chart options={this.state.options} series={this.state.series} type="donut" height="100%" width="100%" />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default GraficoFuncionarios;
