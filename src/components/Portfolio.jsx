import React from 'react';
import PortfolioCoin from './PortfolioCoin';
import PortfolioWallet from './PortfolioWallet';
import PortfolioSelectedCoin from './PortfolioSelectedCoin';
import PortfolioSelectedWallet from './PortfolioSelectedWallet';
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { handleInputChange } from '../store/actions/watchListActions';
import { portfolioToggle, fetchWalletData, Add_ETH_Wallet } from '../store/actions/portfolioActions';
import { withRouter } from 'react-router-dom';
import plus from '../images/plus.png';
import minus from '../images/minus.png';

const Div = styled.div`
  height: 87vh;
  min-width: 30vh;
  width: 25%;
  overflow: auto;
`;

const PortfolioHead = styled.div`
text-align: center;
display: flex;
justify-content: center;
align-items: center;
color: white;
background-color: #3A4A5E;
height: 15%;
`;

const PortfolioButtonGroup = styled.div`
    background-color: #3A4A5E;
    color: white;
    padding: 0em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    vertical-align: middle;
    margin: auto 0em;
    justify-conent: center;

    button {
        background-color: white;
        border: 1px solid #8993A8;
        padding: 0.5em 1em;
        margin: 0em;
        font-size: 1.5em;
        :focus {
            outline: none;
            box-shadow: none;
        }
        :hover:not([disabled]){
            background-color: #8993A8;
            color: white;
            font-weight: 200 !important;
        }
        :disabled {
          color: white;
          background-color: var(--nav-primary-color);
          font-weight: 900 !important;
        }
        :first-child {
            border-radius:  0.5em 0em 0em 0.5em;
        }

        :last-child {
            border-radius: 0em 0.5em 0.5em 0em;
        }
    }
`;

const AddWalletButton = styled.div`
  border-bottom: 1px solid #3A4A5E;
  justify-content: center;
  display: flex;
  padding: .5rem 0rem;
  background-color: #28394F;
  :hover {
      background-color: #c9bcbe;
  }

  &.selected {
      background-color: white;
      :hover {
          background-color: #c9bcbe;
      }
      div {
          color: #28394F;
      }
  }
  
  align-items: center;
  color: #F0F1F3;
  img {
    height: 1.5rem;
    width: 1.5rem;
    pointer-events: none;
    background-color: white;
    border-radius: 100%;
    margin: 0rem 1rem 0rem 0rem;
    left;
  }
`;

const AddWalletWidget = styled.form`
  border-bottom: 1px solid #3A4A5E;
  border-top: 1px solid #3A4A5E;
  display: flex;
  padding: 1.5rem 1.5rem;
  background-color: #8993A8;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  div {
    justify-content: center;
    display: flex;
    padding: 0rem 0rem;
    align-items: center;
    color: white;
    

    img {
      margin: 0rem 0rem 1rem 5rem;
    }
  }
  
  input {
    -webkit-flex: 1;
    outline: none;
    border: 1px solid #dfe2e6;
    color: #6b6c6f;
    border-radius: 20px;
    padding: 0.5rem 0.5rem; 
    margin: 0.5rem 0rem;
    width: 100%;
  }
  input.input-error {
    border: 1px solid red; 
  }

  

  button {
    justify-content: center;
    display: flex;
    padding: .5rem 0rem;
    background-color: white;
    align-items: center;
    color: black;

    -webkit-flex: 1;
    outline: none;
    border: 1px solid #dfe2e6;
    color: #6b6c6f;
    border-radius: 20px;
    padding: 0.3rem 0rem; 
    margin: 0.5rem 0rem;
    width: 60%;

    :hover {
      background-color: #c9bcbe;
    }

    img {
      height: 1.5rem;
      width: 1.5rem;
      pointer-events: none;
      background-color: white;
      border-radius: 100%;
      margin: 0rem 1rem 0rem 0rem;
    }
  }
`;

const Portfolio = withRouter(({history, selectedPortfolioCoin, selectedPortfolioWallet, viewCoins, portfolioToggle, Add_ETH_Wallet, portfolio, viewAddWallet}) => {

  console.log("STATE - VIEW PORTFOLIO: ", viewCoins)
  let summedTokens = [];
  portfolio.forEach((wallet) => {
    wallet.walletTokens.forEach((token) => {
      let index = summedTokens.map(e => e.tokenName).indexOf(token.tokenName)
      if( index >= 0 ) {
        summedTokens[index].tokenBalance += token.tokenBalance;
        summedTokens[index].tokenTXs += token.tokenTXs;
      } else {
        summedTokens.push(token)
      }
    })
  })

  let portfolioValue
  summedTokens.forEach((coin) => {
    portfolioValue =+ (coin.marketData.price * coin.tokenBalance)
  })

  console.log("Portfolio Value: ", portfolioValue)
  console.log("SUMMED TOKENS: ", summedTokens)

  function toggle(e) {
    e.preventDefault();
    console.log("TOGGLE EVENT: ", e.currentTarget.id);
    portfolioToggle(e.target.id);
  }

  function toggleAddWallet(e) {
    e.preventDefault();
    portfolioToggle("addWalletToggle")
  }

  function cancelAddWallet(e) {
    
    e.preventDefault();
    console.log("CANCEL")
    portfolioToggle("cancelAddWallet")
  }

  function handleAddEthWallet(e) {
    //e.preventDefault();
    console.log(e.target.walletName.value)
    if (e.target.walletName.value !== "" && e.target.walletAddress.value !== ""){
      // This check assumes the eth address is in question and is correct.
      console.log(e.target.walletName.value, e.target.walletAddress.value)
      Add_ETH_Wallet(e.target.walletAddress.value, e.target.walletName.value)
    }
  }

  // show and hide using function to set value to reveal or not and then use if statement to display or not.
  // Need to find a way to display all coins

  return (
    <Div>
      <PortfolioHead>
        <div>
          <h4>Portfolio Balance</h4>
          <h1>${portfolioValue}</h1>
        </div>
      </PortfolioHead>
      <PortfolioButtonGroup>
        <button id="coinToggle" type="radio" onClick={toggle} disabled={viewCoins}>Coins</button>
        <button id="walletToggle" type="radio" onClick={toggle} disabled={!viewCoins}>Wallets</button>
      </PortfolioButtonGroup>
      { viewCoins === false && viewAddWallet === true ?
        <>
          <AddWalletWidget onSubmit={handleAddEthWallet} id="watchListSearch">
            <div>
              <h2>Add Wallet</h2>
              <button onClick={cancelAddWallet} >
                <img src={minus} alt="React logo" className="App-logo"/>
              </button>
              
           
            </div>
            
              <input type="text"
                  placeholder="Wallet Nickname"
                  name="walletName"
              />
              <input type="text"
                  placeholder="Wallet Address"
                  name="walletAddress"
              />
              <button>
                <img src={plus} alt="React logo" className="App-logo"/>
                <h3>Add Wallet</h3>
              </button>
              
          </AddWalletWidget>
        </>
        : null
      }
      { viewCoins === true ?
          <>
          <PortfolioCoin key={selectedPortfolioCoin.id}
                      coinID={selectedPortfolioCoin.id}
                      name={selectedPortfolioCoin.name} 
                      symbol={selectedPortfolioCoin.symbol} 
                      price={selectedPortfolioCoin.price}
                      image={selectedPortfolioCoin.image}
                      dayPercentChange={selectedPortfolioCoin.dayPercentChange}/> 
          </>
          :
          <>
          <PortfolioWallet key={selectedPortfolioWallet.id}
                      name={selectedPortfolioWallet.walletName}
                      address={selectedPortfolioWallet.walletAddress}
                      image={selectedPortfolioWallet.image}
                      totalValue={selectedPortfolioWallet.walletValue_USD}
                      walletPL={selectedPortfolioWallet.walletPL}/>
          </>
      }
      { viewCoins === true ? 
          summedTokens.map( ({id, marketData, tokenBalance}) => 
              <PortfolioCoin key={id}
                      coinID={id}
                      name={marketData.name} 
                      symbol={marketData.symbol} 
                      value={marketData.price * tokenBalance}
                      image={marketData.image}
                      amount={tokenBalance}/> 
              )
          :
          portfolio.filter((wallet) => (wallet.id !== selectedPortfolioWallet.id)).sort((a,b) => (b.walletValue_USD - a.marketData.walletValue_USD)).map( ({walletName, walletAddress, image, walletValue_USD, walletPL }) =>
              <PortfolioWallet key={walletAddress}
                          name={walletName}
                          address={walletAddress}
                          image={image}
                          totalValue={walletValue_USD}
                          dayPercentChange={walletPL}/>
              )
      }    
      { viewCoins === false && viewAddWallet === false?
        <>     
          <AddWalletButton id="addWalletToggle" onClick={toggleAddWallet}>
            <img src={plus} alt="React logo" className="App-logo"/>
            <h3>Add Wallet</h3>
          </AddWalletButton>
        </>
        : null
      }
    </Div>
  )
})

function mapStateToProps(state) {
    return {
      selectedPortfolioCoin: state.portfolioReducer.selectedPortfolioCoin,
      selectedPortfolioWallet: state.portfolioReducer.selectedPortfolioWallet,
      portfolio: state.portfolioReducer.portfolio,
      viewCoins: state.portfolioReducer.viewCoins,
      viewAddWallet: state.portfolioReducer.viewAddWallet
    };
  }
  
function mapDispatchToProps(dispatch) {
  return {
    handleInputChange: (query) => dispatch(handleInputChange(query)),
    portfolioToggle: (view) => dispatch(portfolioToggle(view)),
    Add_ETH_Wallet: (walletAddress, walletName) => dispatch(Add_ETH_Wallet(walletAddress, walletName))
    
  };
}

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Portfolio);