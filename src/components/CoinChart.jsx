import React, { useEffect } from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";
import Chart from 'chart.js';


const Div = styled.div`
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    margin: 0.75rem 1.5rem 1.5rem 1.5rem;
    padding: 2rem;
    width: 100%;
    min-width: 25rem;
`;

const Canvas = styled.canvas`
    background-color: white;
    color: var(--nav-text-color);
    width: 100% !important;
    min-width: 25rem;
    height: 100% !important;
`;

const CoinChart = () => {

    useEffect(() => {
        const ctx = document.getElementById('coinChart').getContext('2d');
        const coinChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6','7', '8', '9', '10', '11', '12'],
                datasets: [{
                    legend: {
                        display: false
                    },
                    label: 'Bitcoin',
                    data: [12, 19, 3, 5, 2, 312, 19, 3, 5, 2, 3,100],
                    backgroundColor: [
                        'orange'
                        //'rgba(255, 99, 132, 0.2)',
                        //'rgba(54, 162, 235, 0.2)',
                        //'rgba(255, 206, 86, 0.2)',
                        //'rgba(75, 192, 192, 0.2)',
                        //'rgba(153, 102, 255, 0.2)',
                        //'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'orange'
                        //'rgba(255, 99, 132, 1)',
                        //'rgba(54, 162, 235, 1)',
                        //'rgba(255, 206, 86, 1)',
                        //'rgba(75, 192, 192, 1)',
                        //'rgba(153, 102, 255, 1)',
                        //'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    })
    


    return (
        <Div>
            <Canvas id="coinChart"></Canvas>
        </Div>
    )
}


export default requireAuth(CoinChart);