import React, { useEffect } from 'react'
import styled from 'styled-components';
import Chart from 'chart.js';
import { compose } from "redux";
import { connect } from "react-redux";
import { selectCoin } from '../store/actions/watchListActions';


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

const CoinChart = ({selectedCoin}) => {

    useEffect(() => {
        try {
        const chartPrices = selectedCoin[0].chartPrices;
        const chartDates = selectedCoin[0].chartDates;
        console.log("Date example: ", Date(chartDates[5]),);
        
        console.log("prices: ", chartPrices)
        const ctx = document.getElementById('coinChart').getContext('2d');
        const coinChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartDates,
                datasets: [{
                    legend: {
                        display: false
                    },
                    label: 'Bitcoin',
                    data: chartPrices,
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
                            beginAtZero: false
                        }
                    }]
                }
            }
        })
    } catch {
        
    }
    })
    


    return (
        <Div>
            <Canvas id="coinChart"></Canvas>
        </Div>
    )
}


function mapStateToProps(state) {
    return {
        selectedCoin: state.watchListReducer.selectedCoin,
    };
}

function mapDispatchToProps(dispatch) {
  return {
      selectCoin: (coinID) => dispatch(selectCoin(coinID)),
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CoinChart);
