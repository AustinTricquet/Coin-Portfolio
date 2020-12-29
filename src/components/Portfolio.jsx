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

const Portfolio = withRouter(({history, selectedPortfolioCoin, selectedPortfolioWallet, viewPortfolio, changePortfolioView, Add_ETH_Wallet, portfolio}) => {

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

    console.log("SUMMED TOKENS: ", summedTokens)

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
    // Need to find a way to display all coins


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
                <PortfolioCoin key={selectedPortfolioCoin.id}
                            coinID={selectedPortfolioCoin.id}
                            name={selectedPortfolioCoin.name} 
                            symbol={selectedPortfolioCoin.symbol} 
                            price={selectedPortfolioCoin.price}
                            image={selectedPortfolioCoin.image}
                            dayPercentChange={selectedPortfolioCoin.dayPercentChange}/> 
                :
                <PortfolioWallet key={selectedPortfolioWallet.id}
                            name={selectedPortfolioWallet.walletName}
                            address={selectedPortfolioWallet.walletAddress}
                            image={selectedPortfolioWallet.image}
                            totalValue={selectedPortfolioWallet.walletValue_USD}
                            walletPL={selectedPortfolioWallet.walletPL}/>
            }
            { viewPortfolio === true ? 
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
            
        </Div>
    )
})

function mapStateToProps(state) {
    return {
      selectedPortfolioCoin: state.portfolioReducer.selectedPortfolioCoin,
      selectedPortfolioWallet: state.portfolioReducer.selectedPortfolioWallet,
      portfolio: state.portfolioReducer.portfolio,
      viewPortfolio: state.portfolioReducer.viewPortfolio
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