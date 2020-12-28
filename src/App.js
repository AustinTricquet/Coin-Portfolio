import React, { useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import PortfolioPage from "./pages/PortfolioPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from './pages/ContactPage';
import WatchListPage from './pages/WatchListPage';
import TradesPage from './pages/TradesPage';
import TaxesPage from './pages/TaxesPage';
import Footer from './components/Footer';
import styled from 'styled-components';
import { connect } from "react-redux";
import { compose } from "redux";
import { Switch, Route } from 'react-router-dom';

import { getERC20_Balences, getERC20_Transactions, Add_ETH_Wallet } from "./store/actions/portfolioActions";
import { updateMarketData } from "./store/actions/watchListActions";

import { getCoinGeckoKeys } from "./store/actions/onSigninActions";
import {store} from './index';

function App({ auth, updateMarketData, getCoinGeckoKeys, getERC20_Balences, getERC20_Transactions, Add_ETH_Wallet }) {
  const Content = styled.div`
    padding-bottom: 4em;
  `;
  
  const PageContainer = styled.div`
    position: relative;
    min-height: 100vh;
  `;

  useEffect(() => {
    async function x() {
      if (auth.isEmpty === false) {
        getCoinGeckoKeys();
      }
    }
    x()
  })

  const renderCoin = (routerProps) => {
    //console.log("router props: ", routerProps)
    let coinID = routerProps.location.pathname.slice(12)
    console.log("coinID for ROUTER: ", coinID)
    
    //console.log("coinID: ", coinID)
    if (coinID === "") {
      coinID = 'bitcoin'
    }
    
    // get current watchList IDs
    const state = store.getState();
    const watchList = state.watchListReducer.watchList;
    const coinIDs = Object.keys(watchList);
    const onWatchList = coinIDs.indexOf(coinID) >= 0 ? true : false;
    console.log("ON WATCHLIST ?: ", onWatchList)

    console.log("coinID to select, ", coinID, coinIDs)
    updateMarketData(coinIDs, coinID, 1, false, onWatchList);

    console.log("STATE BEFORE PAGE RENDER: ", state)

    return(<WatchListPage/>)

  }

  const renderPortfolio = (routerProps) => {
    console.log("routerProps: ", routerProps)
    let coinID = routerProps.location.pathname.slice(12)
    console.log("coinID - renderPortfolio: ", renderPortfolio);
    if (coinID === "") {
      coinID = 'bitcoin'
    }

    async function loadWalletData() {

      //let web3 = new Web3(Web3.givenProvider);
      //let address = ["-- put wallet address --"];
      //let tokens = [
        //"0x514910771AF9Ca656af840dff83E8264EcF986CA",
        //"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        //"0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        //"0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"
      //];
      //let options = {};

      //getERC20_Balences(web3, address, tokens, options)

      //let blockNumber = await web3.eth.getBlockNumber();
      //console.log('block: ', blockNumber)

      //let uni = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
      //let chainlink = '0x514910771af9ca656af840dff83e8264ecf986ca'
      //let usdc = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

      //let walletAddress = "-- put wallet address --";
      //let contractAddress = usdc;
      //let fromBlock = 0;
      //let toBlock = 'latest'

      //getERC20_Transactions(web3, walletAddress, contractAddress, fromBlock, toBlock);
    }

    loadWalletData()
    return(<PortfolioPage/>)
  }
  
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
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/contact" component={ContactPage} />
          </Switch>
        </Content>
        <Footer></Footer>
      </PageContainer>
    )
  }
  
  const Landing = () => {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
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
            <Route exact path="/watch-list" render = { routerProps => renderCoin(routerProps)} />
            <Route path = "/watch-list/:id" render = { routerProps => renderCoin(routerProps)} />
            <Route exact path="/trades" component={TradesPage} />
            <Route exact path="/taxes" component={TaxesPage} />
            <Route path="/" render = { routerProps => renderPortfolio(routerProps)} />
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
    historyLength: state.watchListReducer.historyLength
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //updateWatchList: (coinIDs, selectedCoinID, days) => dispatch(updateWatchList(coinIDs, selectedCoinID, days)),
    getCoinGeckoKeys: () => dispatch(getCoinGeckoKeys()),
    updateMarketData: (coinIDs, coinID, days, suggestions, onWatchList) => dispatch(updateMarketData(coinIDs, coinID, days, suggestions, onWatchList)),
    getERC20_Balences: (web3, address, tokens, options) => dispatch(getERC20_Balences(web3, address, tokens, options)),
    getERC20_Transactions: (web3, walletAddress, contractAddress, fromBlock, toBlock)=> dispatch(getERC20_Transactions(web3, walletAddress, contractAddress, fromBlock, toBlock)),
    //Add_ETH_Wallet: (walletAddress, walletName) => dispatch(Add_ETH_Wallet(walletAddress, walletName))
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
