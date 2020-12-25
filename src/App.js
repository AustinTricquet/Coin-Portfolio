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
import { updateMarketData, selectCoin } from "./store/actions/watchListActions";
import { getERC20_Balences, getERC20_Transactions } from "./store/actions/portfolioActions";
import { getCoinGeckoKeys } from "./store/actions/onSigninActions";
import {store} from './index';

function App({ auth, selectCoin, updateMarketData, getCoinGeckoKeys, getERC20_Balences, getERC20_Transactions }) {
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

    console.log("coinID to select, ", coinID)
    updateMarketData(coinIDs, coinID);

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

      //getERC20_Balences(web3, address, tokens, options)

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
    selectCoin: (selectedCoinID) => dispatch(selectCoin(selectedCoinID)),
    getCoinGeckoKeys: () => dispatch(getCoinGeckoKeys()),
    updateMarketData: (coinIDs, coinID) => dispatch(updateMarketData(coinIDs, coinID)),
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
