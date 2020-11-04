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
import { fetchCoinData, updateWatchList, selectCoin } from "./store/actions/watchListActions";
import { getCoinGeckoKeys } from "./store/actions/onSigninActions";

function App({ auth, updateWatchList, getCoinGeckoKeys, fetchCoinData, selectCoin }) {
  const Content = styled.div`
    padding-bottom: 4em;
  `;
  
  const PageContainer = styled.div`
    position: relative;
    min-height: 100vh;
  `;

  useEffect(() => {
    if (auth.isEmpty === false) {
      updateWatchList();
      getCoinGeckoKeys();
    }
  })

  const renderCoin = (routerProps) => {
    console.log("router props: ",routerProps)
    let coinID = routerProps.location.pathname.slice(12)
    console.log("coinID: ", coinID)
    let coinList = [{newID: coinID}]
    //fetchCoinData(coinList);
    updateWatchList()
    
    selectCoin(coinID)
    
    //updateWatchList();
    //getCoinGeckoKeys();
    //console.log('found the coin in route!: ', coinData, coinData.length);
    return(<WatchListPage/>)

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
            <Route exact path="/watch-list" component={WatchListPage} />
            <Route path = "/watch-list/:id" render = { routerProps => renderCoin(routerProps)} />
            <Route exact path="/trades" component={TradesPage} />
            <Route exact path="/taxes" component={TaxesPage} />
            <Route path="/" component={PortfolioPage} />
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateWatchList: () => dispatch(updateWatchList()),
    getCoinGeckoKeys: () => dispatch(getCoinGeckoKeys()),
    fetchCoinData: (list) => dispatch(fetchCoinData(list)),
    selectCoin: (coinID) => dispatch(selectCoin(coinID))
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
