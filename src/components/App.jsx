import React from 'react';

import Portfolio from "./Portfolio";
import Loader from './Loader';
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Navbar from './Navbar';
import Contact from './Contact';
import Footer from './Footer';
import WatchList from './WatchList';
import Trades from './Trades';
import Taxes from './Taxes';

import styled from 'styled-components';
import { connect } from "react-redux";
import { compose } from "redux";
import { signout } from "../store/actions/authActions";
import { Switch, Route } from 'react-router-dom';

function App({ auth }) {
  
  const Content = styled.div`
    padding-bottom: 4rem;
  `;
  
  const PageContainer = styled.div`
    position: relative;
    min-height: 100vh;
  `;
  
  const Site = () => {
    return(
      <PageContainer>
        <Navbar 
          buttonRoute="/login" 
          buttonName="Login"
          menuOptions={[
            {
              key: 'Home',
              route: '/',
            },
            {
              key: 'About',
              route: '/about',
            },
            {
              key: 'Contact',
              route: '/contact'
            }
          ]}>
        </Navbar>
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </Content>
        <Footer></Footer>
      </PageContainer>
    )
  }
  
  const Landing = () => {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Site} />
       
      </Switch>
    );
  }

  const App = () => {
    return (
      <PageContainer>
        <Navbar 
          buttonRoute="/logout" 
          buttonName="Logout"
          menuOptions={[
            {
              key: 'Portfolio',
              route: '/',
            },
            {
              key: 'Watch List',
              route: '/watch-list',
            },
            {
              key: 'Trades',
              route: '/trades'
            },
            {
              key: 'Taxes',
              route: '/taxes'
            }
          ]}>
        </Navbar>
        <Content>
          <Switch>
            <Route exact path="/watch-list" component={WatchList} />
            <Route exact path="/trades" component={Trades} />
            <Route exact path="/taxes" component={Taxes} />
            <Route path="/" component={Portfolio} />
          </Switch>
        </Content>
        <Footer></Footer>
      </PageContainer>
    )
  }
  
  return (
    <div>
      {!auth.isLoaded ? <Loader />: !auth.isEmpty ? <App/> : <Landing/>}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth
  };
}

export default connect(mapStateToProps)(App);


  /*
  <Route exact path="/login" component={Login} />
  <Route exact path="/portfolio" component={Portfolio} />
  <Route exact path='/watch-list' component={WatchList} />
  <Route exact path='/trades' component={Trades} />
  <Route exact path='/taxes' component={Taxes} /> 
  */

  /*
  const {handleSignup} = useContext(firebaseAuth)
  console.log(handleSignup)
  */

  /*
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
  ]);
  */