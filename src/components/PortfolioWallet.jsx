import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
//import { selectCoin } from '../store/actions/watchListActions';
import { withRouter } from 'react-router-dom';

const Div = styled.div`
    border-bottom: 1px solid #3A4A5E;
    border-top: 1px solid #3A4A5E;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 0rem;
    background-color: #28394F;
    :hover {
        background-color: #c9bcbe;
    }
`;

const Coin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F0F1F3;
`;

const Img = styled.img`
    height: 2.5rem;
    width: 2.5rem;
    pointer-events: none;
    background-color: white;
    border-radius: 100%;
    margin: 0rem 1rem;
`;

const Balance = styled.div`
    color: #F0F1F3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem 1rem;
    text-align: right;
`;

const SubText = styled.h5`
    color: #8993A8;
`;

const PortfolioWallet = withRouter(({ history, walletID, name, address, image, totalValue, walletPL }) => {

    async function handleClick() {
        history.push("/" + walletID);
    }
    return (
        <Div onClick={handleClick}>
            <Coin>
                <Img src={image} alt="React logo" className="App-logo" />
                <div>
                    <h3>{name}</h3>
                    <SubText>{address.slice(0,5)}...{address.slice(-5)}</SubText>
                </div>
            </Coin>
            <Balance>
                <div>
                    <h3>${totalValue}</h3>
                    <SubText>{walletPL}%</SubText>
                </div>
            </Balance> 
        </Div>
    )
})

function mapStateToProps(state) {
    return {
        watchList_Display: state.watchListReducer.watchList_Display
    };
  }
  
function mapDispatchToProps(dispatch) {
    return {
        //selectCoin: (walletID) => dispatch(selectCoin(walletID))
    };
}

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(PortfolioWallet);
