import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { selectCoin } from '../store/actions/coinDataActions';


const Div = styled.div`
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    margin: 2rem 1rem 1rem 2rem;
    padding: 2rem;
    width: 60%;
`;

const Header = styled.div`
    justify-content: space-between;
    padding: 0rem 0rem 1.5rem 0rem;
    display: flex;
`;

const ContentBlock = styled.div`
    padding: 0rem 0rem 1rem 0rem; 

    h3 {
        padding: 0rem 0rem 0.5rem 0rem;
    }
`;

const Coin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F0F1F3;
`;

const Img = styled.img`
    height: 3rem;
    width: 3rem;
    pointer-events: none;
    background-color: white;
    border-radius: 100%;
    margin: 0rem 1rem 0rem 0rem;
`;

const Price = styled.div`
    color: #F0F1F3;
    display: flex;
    justify-content: top;
    align-items: center;
    margin: 0rem 0rem 0rem 1rem;
    text-align: right;
`;

const SubText = styled.h3`
    color: #F0F1F3;
`;

const CoinBasicInfo = ({selectedCoin}) => {
    return (
        <Div>
            <Header>
                <Coin>
                    <Img src={selectedCoin.image} alt="Coin logo" className="App-logo" />
                    <div>
                        <h1>{selectedCoin.name}</h1>
                        <SubText>{selectedCoin.symbol}</SubText>
                    </div>
                </Coin>
                <Price>
                    <div>
                        <h1>${selectedCoin.price}</h1>
                        <SubText>{selectedCoin.dayPercentChange}%</SubText>
                    </div>
                </Price> 
            </Header>
            
            <ContentBlock>
                <h3>Market Info</h3>
                <p><strong>24 Hour Trading Volume:</strong> ${selectedCoin.dayVolume}</p>
                <p><strong>Market Cap:</strong> ${selectedCoin.marketCap} <strong>Rank:</strong> {selectedCoin.rank}</p>
                <p><strong>All-Time High:</strong> {selectedCoin.ATH} --- {selectedCoin.ATHDate}</p>
                <p><strong>All-Time Low:</strong> {selectedCoin.ATL} --- {selectedCoin.ATLDate}</p>
            </ContentBlock>
            
            <ContentBlock>
                <h3>More Info</h3>
                <p>Website: <a href={selectedCoin.website}>{selectedCoin.website}</a></p>
            </ContentBlock>
           
        </Div>
    )
}



function mapStateToProps(state) {
    return {
        watchList: state.coinDataReducer.watchList,
        selectedCoin: state.coinDataReducer.selectedCoin
    };
}

function mapDispatchToProps(dispatch) {
  return {
      selectCoin: (coinID) => dispatch(selectCoin(coinID))
  };
}



export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CoinBasicInfo);
