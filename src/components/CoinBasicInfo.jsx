import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { selectCoin } from '../store/actions/watchListActions';

const Div = styled.div`
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    margin: 1.5rem 0.75rem 0.75rem 1.5rem;
    padding: 1.5rem;
    width: 60%;
    min-width: 25rem;
`;

const Header = styled.div`
    justify-content: space-between;
    padding: 0rem 0rem 1rem 0rem;
    display: flex;
`;

const ContentBlock = styled.div`
    padding: 0rem 0rem 0.5rem 0rem; 

    h3 {
        padding: 0rem 0rem 0.5rem 0rem;
    }

    p {
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

const HeadSubText = styled.h3`
    color: #F0F1F3;
`;

const SubText = styled.p`
    color: #F0F1F3;
    font-size: 0.75rem;
`;

const Table = styled.table`
    width: 100%;

    th {
        text-align: left;
        padding-bottom: 0.25rem;
    }

    td {
        text-align: left;
        padding-bottom: 0.25rem
    }
`;

const CoinBasicInfo = ({selectedCoin}) => {
    return (
        <>
            {
                selectedCoin.map( ({id, name, symbol, image, price, dayPercentChange, dayVolume, marketCap, rank, ATH, ATHDate, ATL, ATLDate, website}) => 
                        <Div key={id}>
                        <Header>
                            <Coin>
                                <Img src={image} alt="Coin logo" className="App-logo" />
                                <div>
                                    <h1>{name}</h1>
                                    <HeadSubText>{symbol}</HeadSubText>
                                </div>
                            </Coin>
                            <Price>
                                <div>
                                    <h1>${price}</h1>
                                    <HeadSubText>{dayPercentChange}%</HeadSubText>
                                </div>
                            </Price> 
                        </Header>
                        <ContentBlock>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            <h3>Market Data:</h3>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p><strong>24h Trading Volume:</strong></p>
                                            <strong>${dayVolume}</strong>
                                        </td>
                                        <td>
                                            <p><strong>Market Cap:</strong></p>
                                            <strong>${marketCap}</strong>
                                            <SubText><strong>Market Cap Rank: {rank}</strong></SubText>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p><strong>All-Time High:</strong></p>
                                            <strong>${ATH}</strong>
                                            <SubText><strong>{ATHDate}</strong></SubText>
                                        </td>
                                        <td>
                                            <p><strong>All-Time Low:</strong></p>
                                            <strong>${ATL}</strong>
                                            <SubText><strong>{ATLDate}</strong></SubText>
                                        </td> 
                                    </tr>
                                </tbody>
                            </Table>
                        </ContentBlock>
                        <ContentBlock>
                            <h3>More Info</h3>
                            <p>Website: <a href={website}>{website}</a></p>
                        </ContentBlock>
                    </Div>
            
        
                )
            }
        </>
    )
}

function mapStateToProps(state) {
    return {
        selectedCoin: state.watchListReducer.selectedCoin
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
