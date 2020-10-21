import React, { useEffect } from 'react';

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
import { Switch, Route } from 'react-router-dom';
import { fetchCoinData } from "../store/actions/coinDataActions";

function App({ auth, coinData, fetchCoinData }) {
  
  const Content = styled.div`
    padding-bottom: 4em;
  `;
  
  const PageContainer = styled.div`
    position: relative;
    min-height: 100vh;
  `;

  useEffect(() => {
    if (coinData.length === 0 & auth.isEmpty === false) {
      console.log('about to fire fetchcoindata()')
      fetchCoinData().then(response => {console.log("DONE ", response)})
    }
  })
  
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
          <Switch>
            <Route exact path="/watch-list" component={WatchList} />
            <Route exact path="/trades" component={Trades} />
            <Route exact path="/taxes" component={Taxes} />
            <Route path="/" component={Portfolio} />
          </Switch>
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
    auth: state.firebaseReducer.auth,
    coinData: state.coinDataReducer.coinData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCoinData: () => dispatch(fetchCoinData())
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);



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
  
  */