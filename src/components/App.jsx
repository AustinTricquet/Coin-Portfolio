import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from "./Main"
import Login from "./Login"
import Home from "./Home"
import Portfolio from "./Portfolio";

import styled from 'styled-components';
import Navbar from './Navbar';

import WatchList from './WatchList';
import Trades from './Trades';
import Taxes from './Taxes';


const Div = styled.div`

`;

function App() {

  /*const {handleSignup} = useContext(firebaseAuth)
    console.log(handleSignup)*/


  /*const [coinData, setCoinData] = useState([
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
    {
      name: 'Cosmos',
      ticker: 'ATOM',
      price: 5,
      valueUSD: 200,
      amount: 50
    },
    {
      name: 'Cosmos',
      ticker: 'ATOM',
      price: 5,
      valueUSD: 200,
      amount: 50
    },
  ]);*/

  return (
      <Div>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          
        </Switch>
      </Div>
  );
}

export default App;

/*<Route exact path="/login" component={Login} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path='/watch-list' component={WatchList} />
          <Route exact path='/trades' component={Trades} />
          <Route exact path='/taxes' component={Taxes} /> */