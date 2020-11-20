import React, { useEffect } from 'react'
import styled from 'styled-components';
import Chart from 'chart.js';
import { compose } from "redux";
import { connect } from "react-redux";
import { selectCoin } from '../store/actions/watchListActions';

const Div = styled.div`
    color: #28394F;
    margin: 0.75rem 1.5rem 1.5rem 1.5rem;
    min-width: 25rem;
    width: 100%;
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

const CanvasContainer = styled.div`
    position: relative;
    margin: auto;
    height: 85% !important;
  

`;

const Canvas = styled.canvas`
    background-color: white;
    color: var(--nav-text-color);
    border-radius: 0em 0em 0.5em 0.5em;
    border: 2px solid #E6EDFF;
    padding: 1em 1em 1em 1em;
`;

const CoinChart = ({selectedCoin, selectCoin}) => {

    useEffect(() => {
        try {
            const ctx = document.getElementById('coinChart').getContext('2d');
            const chartPrices = selectedCoin[0].chartPrices;
            const chartDates = selectedCoin[0].chartDates;
            const priceMin = (Math.min.apply(null, chartPrices))
            const priceMax = Math.max.apply(null, chartPrices)
            const priceDelta = priceMax - priceMin;
            let timeUnit = '';
            const coinTime = parseInt(selectedCoin[0].chartTimeFrame)
            console.log("coinTime: ", coinTime)
            if (coinTime === 1) {
                timeUnit = 'hour';
            } else if (coinTime === 7 || coinTime === 14) {
                timeUnit = 'day'
            } else if (coinTime === 30) {
                timeUnit = 'week'
            } else if (coinTime === 365) {
                timeUnit = 'month'
            } else {
                timeUnit = 'year'
            }

            // Default if something goes wrong with dynamic calculations for chart step.
            let chartStep = priceDelta * 0.2;
            
            // Dynamic calculations to analyze the priceDelta (max price - min price) and find an appropriate chart step size for the display.
            let deltaLen = priceDelta.toFixed(0).length
            let firstDigit = parseInt(priceDelta.toFixed(0)[0])

            // special case if priceDelta is less than 1
            if(priceDelta < 1){
                let priceDeltaFloat = priceDelta.toFixed(20).match(/^-?\d*\.?0*\d{0,1}/)[0];
                deltaLen = -(priceDeltaFloat.length - 3);
                firstDigit = parseInt(priceDeltaFloat[priceDeltaFloat.length -1]);
            }

            // First - checks for what the first digit is to determine the base multiplier
            // Second - calculates magnitude based on the size of the chart priceDelta - small chart delta = small magnitude - large chart delta = large magnitude
            if (firstDigit === 1 ) {
                console.log("1 has fired");
                let base = 0.025
                let magnitude = 10 ** deltaLen;
                chartStep = base * magnitude;
            } else if (firstDigit === 2 || firstDigit === 3) {
                console.log("2 or 3 has fired");
                let base = 0.05
                let magnitude = 10 ** deltaLen;
                chartStep = base * magnitude;
            } else if (firstDigit === 4 || firstDigit === 5 || firstDigit === 6 || firstDigit === 7 ) {
                console.log("4,5,6 or 7 has fired");
                let base = 0.1
                let magnitude = 10 ** deltaLen;
                chartStep = base * magnitude;
            } else if (firstDigit === 8 || firstDigit === 9) {
                console.log("8 or greater has fired");
                let base = 0.2
                let magnitude = 10 ** deltaLen;
                chartStep = base * magnitude;  
            }
            
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
                     ctx.lineWidth = 1;
                     ctx.strokeStyle = 'rgba(0, 119, 204, 1)';
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
                    pointBackgroundColor: 'rgba(0, 119, 204, 0.6)'                 
                }]
            },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },         
                    responsive: true,
                    tooltips: {
                        intersect: false,
                        mode: 'x-axis'
                    },
                    hover: {
                        mode: 'x-axis',
                        animationDuration: 0,
                        intersect: false
                        
                    },
                    elements: {
                        point: {
                            hitRadius: 0,
                            hoverRadius: 5,
                            radius: 0,
                            
                        }
                    },
                    scales: {
                        bounds: 'ticks',
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                                stepSize: chartStep,
                                fontSize: 15
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: timeUnit,
                                displayFormats: {
                                    'hour': 'h:mm A',
                                    'day': 'MMM D',
                                    'week': 'll',
                                    'month': 'MMM YY',
                                    'year': 'YYYY',
                                },
                            },
                            ticks: {
                                fontSize: 15
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
            <CanvasContainer>
                <Canvas id="coinChart"></Canvas>
            </CanvasContainer>
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
