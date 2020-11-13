import React, { useEffect } from 'react'
import styled from 'styled-components';
import Chart from 'chart.js';
import { compose } from "redux";
import { connect } from "react-redux";
import { selectCoin } from '../store/actions/watchListActions';

const Div = styled.div`
    color: #28394F;
    margin: 0.75rem 1.5rem 1.5rem 1.5rem;
    width: 100%;
    min-width: 25rem;
`;

const Header = styled.div`
    justify-content: space-between;
    padding: 0.25em 1em 0.25em 1em;
    display: flex;
    background-color: #E6EDFF;
    border: 2px solid #E6EDFF;
    box-sizing: border-box;
    border-radius: 0.5em 0.5em 0em 0em;
    height: 15%;

    h3 {
        margin: auto 0em;
    }
`;

const ChartButtonGroup = styled.div`
    color: white;
    padding: 0em;
    cursor: pointer;
    float: left;
    vertical-align: middle;
    margin: auto 0em;
    justify-conent: center;

    button {
        background-color: white;
        border: 1px solid #8993A8;
        padding: 0.2em 0.4em;
        margin: 0em;
        
        :focus {
            outline: none;
            box-shadow: none;
        }

        :hover {
            background-color: #8993A8;
            color: white;
        }

        :first-child {
            border-radius:  0.5em 0em 0em 0.5em;
        }

        :last-child {
            border-radius: 0em 0.5em 0.5em 0em;
        }
    }
`;

const Canvas = styled.canvas`
    background-color: white;
    color: var(--nav-text-color);
    width: 100% !important;
    min-width: 25rem;
    height: 85% !important;
    border-radius: 0em 0em 0.5em 0.5em;
    border: 2px solid #E6EDFF;
    width: 100%;
    padding: 1em 1em 1em 1em;
`;

const CoinChart = ({selectedCoin, selectCoin}) => {

    useEffect(() => {
        
        try {
            const ctx = document.getElementById('coinChart').getContext('2d');
            const chartPrices = selectedCoin[0].chartPrices;
            const chartDates = selectedCoin[0].chartDates;
            console.log("TRY THIS")

            //let priceNumbers = chartPrices.map((price) => (parseFloat(price)))
       
            
            


            let priceMin = (Math.min.apply(null, chartPrices))
            let priceMax = Math.max.apply(null, chartPrices)
            let priceDelta = priceMax - priceMin;


            
            let chartStep = priceDelta * 0.2;
            console.log('chartStep', chartStep)
            let chartMax = priceMax + chartStep;
            let chartMin = priceMin - chartStep;



            Chart.defaults.LineWithLine = Chart.defaults.line;
            Chart.controllers.LineWithLine = Chart.controllers.line.extend({
               draw: function(ease) {
                  Chart.controllers.line.prototype.draw.call(this, ease);
            
                  if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                     var activePoint = this.chart.tooltip._active[0],
                         ctx = this.chart.ctx,
                         x = activePoint.tooltipPosition().x,
                         topY = this.chart.legend.bottom,
                         bottomY = this.chart.chartArea.bottom;
            
                     // draw line
                     ctx.save();
                     ctx.beginPath();
                     ctx.moveTo(x, topY);
                     ctx.lineTo(x, bottomY);
                     ctx.lineWidth = 2;
                     ctx.strokeStyle = '#07C';
                     ctx.stroke();
                     ctx.restore();
                  }
               }
            }); 
            
            var chart = new Chart(ctx, {
                type: 'LineWithLine',
                data: {
                labels: chartDates,
                datasets: [{
                    label: selectedCoin[0].name,
                    pointRadius: 0,
                    data: chartPrices,
                    backgroundColor: [
                        
                        //'rgba(255, 99, 132, 0.2)',
                        //'rgba(54, 162, 235, 0.2)',
                        //'rgba(255, 206, 86, 0.2)',
                        //'rgba(75, 192, 192, 0.2)',
                        //'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        
                        //'rgba(255, 99, 132, 1)',
                        //'rgba(54, 162, 235, 1)',
                        //'rgba(255, 206, 86, 1)',
                        //'rgba(75, 192, 192, 1)',
                        //'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, .8)'
                    ],
                    borderWidth: 3,
                    pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointHoverRadius: 1,
                    
                }]
            },
                options: {
                    legend: {
                        display: false
                    },
            
                  responsive: true,
                  tooltips: {
                     intersect: false,
                    
                  },
                  scales: {
                     yAxes: [{
                        ticks: {
                           beginAtZero: false,
                           stepSize: chartStep
                        }
                     }],
                     xAxes: [{
                         ticks: {
                             stepSize: 100
                         }
                     }]
                  }
               }
            });

            return function cleanup() {
                try {
                console.log("DESTROY CHART")
                chart.destroy();
                } catch {}
            }  
            
        } catch {    
        }
    
    })


    function handleClick(e) {
     
        console.log("CLICK: ", selectedCoin[0].id, e.target.value);
        selectCoin(selectedCoin[0].id, e.target.value);
    }
    
    return (
        <Div>
            <Header>
                <h3>USD/{selectedCoin[0].symbol}</h3>
                <ChartButtonGroup>
                    <button type="radio" active onClick={handleClick} value='1'>24h</button>
                    <button type="radio" onClick={handleClick} value='7'>7d</button>
                    <button type="radio" onClick={handleClick} value='14'>14d</button>
                    <button type="radio" onClick={handleClick} value='30'>30d</button>
                    <button type="radio" onClick={handleClick} value='365'>1y</button>
                    <button type="radio" onClick={handleClick} value='max'>Max</button>
                </ChartButtonGroup>
            </Header>
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
      selectCoin: (coinID, days) => dispatch(selectCoin(coinID, days)),
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CoinChart);
