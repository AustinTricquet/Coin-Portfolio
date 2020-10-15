import React from 'react';
import PortfolioCoin from './PortfolioCoin';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";

const Div = styled.div`
    height: 87vh;
    min-width: 30vh;
    width: 25%;
    overflow: auto;
`;

const PortfolioList = ({coinData}) => {
    return (
        <Div>
            {
                coinData.map( ({name, ticker, price, amount, valueUSD}) => 
                    <PortfolioCoin key={name}
                            name={name} 
                            ticker={ticker} 
                            amount={amount}
                            price={price}
                            valueUSD={valueUSD}
                            tickerid={name}/> 
                    )
            }
        </Div>
    )
}

function mapStateToProps(state) {
    return {
      coinData: state.coinDataReducer.coinData
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      signout: (cb) => dispatch(signout(cb))
    };
  }


export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(PortfolioList);