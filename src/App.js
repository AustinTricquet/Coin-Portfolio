import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import WatchList from './components/WatchList';
import Trades from './components/Trades';
import Taxes from './components/Taxes';

const Div = styled.div`

`;

export default function App() {
  const [coinData, setCoinData] = useState([
    {
      name: 'Bitcoin',
      ticker: 'BTC',
      price: 11000,
      valueUSD: 500,
      amount: 0.05
    },
    {
      name: 'Ethereum',
      ticker: 'ETH',
      price: 390,
      valueUSD: 500,
      amount: 1.5
    },
    {
      name: 'Polkadot',
      ticker: 'DOT',
      price: 5,
      valueUSD: 0,
      amount: 0
    },
    {
      name: 'Bitcoin Cash',
      ticker: 'BCH',
      price: 225,
      valueUSD: 10,
      amount: 0.005
    },
    {
      name: 'Chainlink',
      ticker: 'LINK',
      price: 10,
      valueUSD: 100,
      amount: 10
    },
    {
      name: 'Cardano',
      ticker: 'ADA',
      price: 0.05,
      valueUSD: 50,
      amount: 200
    },
    {
      name: 'Cosmos',
      ticker: 'ATOM',
      price: 5,
      valueUSD: 200,
      amount: 50
    },
  ]);

  return (
    <Router>
      <Div>
        <Navbar />
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/portfolio' render={props => (<Portfolio {...props} coinData={coinData}/>)}/>
            <Route exact path='/watch-list' component={WatchList} />
            <Route exact path='/trades' component={Trades} />
            <Route exact path='/taxes' component={Taxes} />
          </Switch>
        </div>
      </Div>
    </Router>
  );
}


