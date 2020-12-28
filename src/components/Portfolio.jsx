import React from 'react';
import PortfolioCoin from './PortfolioCoin';
import PortfolioWallet from './PortfolioWallet';
import PortfolioSelectedCoin from './PortfolioSelectedCoin';
import PortfolioSelectedWallet from './PortfolioSelectedWallet';
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { handleInputChange } from '../store/actions/watchListActions';
import { changePortfolioView, fetchWalletData, Add_ETH_Wallet } from '../store/actions/portfolioActions';
import { withRouter } from 'react-router-dom';

const Div = styled.div`
  height: 87vh;
  min-width: 30vh;
  width: 25%;
  overflow: auto;
`;

const InputGroup = styled.form`
  border-bottom: 1px solid #3A4A5E;
  border-top: 1px solid #3A4A5E;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1.5rem;
  background-color: #28394F;
  display: block;

  input {
      -webkit-flex: 1;
    
      outline: none;
      border: 1px solid #dfe2e6;
      color: #6b6c6f;
      border-radius: 20px;
      padding: 0.5rem 0.5rem; 
      
      }
      input.input-error {
      border: 1px solid red; }
`;

const Portfolio = withRouter(({history, portfolio_Display, suggestions, selectedCoin, selectedWallet, viewPortfolio, changePortfolioView, wallets_Display, Add_ETH_Wallet, portfolio}) => {

    function changeView(e) {
        e.preventDefault();
        changePortfolioView();
    }

    function handleAddEthWallet(e) {
      e.preventDefault();
      //console.log(e.target.walletName.value)
      if (e.target.walletName.value !== "" && e.target.walletAddress.value !== ""){
        // This check assumes the eth address is in question and is correct.
        console.log(e.target.walletName.value, e.target.walletAddress.value)
        Add_ETH_Wallet(e.target.walletAddress.value, e.target.walletName.value)
      }
    }


    // show and hide using function to set value to reveal or not and then use if statement to display or not.

    return (
        <Div>
            <InputGroup>
                { viewPortfolio === true ? <h1>Portfolio</h1> : <h1>Wallets</h1>}
                <button onClick={changeView}>{viewPortfolio === true ? "View Wallets" : "View Portfolio"}</button> 
            </InputGroup>
            { viewPortfolio === true ? null :
                <div>
                    <InputGroup onSubmit={handleAddEthWallet} id="watchListSearch">
                        <input type="text"
                            placeholder="Wallet Nickname"
                            name="walletName"
                        />
                        <input type="text"
                            placeholder="Wallet Address"
                            name="walletAddress"
                        />
                        <button>Add Wallet</button>
                    </InputGroup>
                </div>
            }
            { viewPortfolio === true ? 
                selectedCoin.map( ({id, name, symbol, image, price, dayPercentChange}) =>
                    <PortfolioSelectedCoin key={id}
                                coinID={id}
                                name={name} 
                                symbol={symbol} 
                                price={price}
                                image={image}
                                dayPercentChange={dayPercentChange}/> 
                    )
                :
                selectedWallet.map( ({id, name, address, image, totalValue, dayPercentChange }) =>
                <PortfolioSelectedWallet key={id}
                            name={name}
                            address={address}
                            image={image}
                            totalValue={totalValue}
                            dayPercentChange={dayPercentChange}/>
                )

            }
            { viewPortfolio === true ? 
                portfolio_Display.map( ({coinID, name, symbol, image, value, amount}) => 
                    <PortfolioCoin key={coinID}
                            coinID={coinID}
                            name={name} 
                            symbol={symbol} 
                            value={value}
                            image={image}
                            amount={amount}/> 
                    )
                :
                portfolio.map( ({walletName, walletAddress, image, walletValue_USD, walletPL }) =>
                <PortfolioWallet key={walletAddress}
                            name={walletName}
                            address={walletAddress}
                            image={image}
                            totalValue={walletValue_USD}
                            dayPercentChange={walletPL}/>
                )
            }
            
        </Div>
    )
})

function mapStateToProps(state) {
    return {
      selectedPortfolioCoin: state.portfolioReducer.selectedPortfolioCoin,
      selectedPortfolioWallet: state.portfolioReducer.selectedPortfolioWallet,
      portfolio: state.portfolioReducer.portfolio
    };
  }
  
function mapDispatchToProps(dispatch) {
  return {
    handleInputChange: (query) => dispatch(handleInputChange(query)),
    changePortfolioView: () => dispatch(changePortfolioView()),
    Add_ETH_Wallet: (walletAddress, walletName) => dispatch(Add_ETH_Wallet(walletAddress, walletName))
    
  };
}

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Portfolio);