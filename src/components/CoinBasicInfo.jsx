import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { add, remove } from '../store/actions/watchListActions';
import { withRouter } from 'react-router-dom';
import plus from '../images/plus.png';
import minus from '../images/minus.png';

//Need to adjust font size depending on screen size

const Div = styled.div`
    color: #28394F;
    margin: 1.5em 0.75em 0.75em 1.5em;
    width: 60%;
    min-width: 27em;
    vertical-align: top;
    font-size: 0.9em;
`;

const Header = styled.div`
    justify-content: space-between;
    padding: 0.25em 1em 0.5em 1em;
    display: flex;
    background-color: #E6EDFF;
    border: 2px solid #E6EDFF;
    box-sizing: border-box;
    border-radius: 0.5em 0.5em 0em 0em;
    height: 25%;
`;

const ContentBlock = styled.div`
    padding: 0.5em 1em 0.5em 1em; 
    border-radius: 0em 0em 0.5em 0.5em;
    background-color: white;
    border: 2px solid #E6EDFF;
    height: 75%;

    h3 {
        padding: 0em 0em 0.25em 0em;
    }

    p {
        padding: 0em 0em 0.25em 0em;
    }

    tbody {
        vertical-align: top;
    }
`;

const Coin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #28394F;
`;

const Img = styled.img`
    height: 3em;
    width: 3em;
    pointer-events: none;
    background-color: white;
    border-radius: 100%;
    margin: 0em 1em 0em 0em;
`;

const ButtonImg = styled.img`
    height: 2.5em;
    width: 2.5em;
    pointer-events: none;
    background-color: inherit;
    border-radius: 100%;
    border: 0px;
`;

const Price = styled.div`
    color: #28394F;
    display: flex;
    justify-content: top;
    align-items: center;
    margin: 0em 0em 0em 0em;
    text-align: right;
    justify-content: space-between;
`;

const HeadSubText = styled.h3`
    color: #8993A8;
`;

const SubText = styled.p`
    color: #8993A8;
    font-size: 0.75em;
`;

const Button = styled.button`
    height: 2.5em;
    width: 2.5em;
    background-color: inherit;
    border-radius: 100%;
    border: 0px;
    margin: 0em 0em 0em 1em;
    
    :focus {
        outline: none;
        box-shadow: none;
    }
    background-color: inherit;
    
`;

const Table = styled.table`
    width: 100%;

    th {
        text-align: left;
        padding-bottom: 0.1em;
    }

    td {
        text-align: left;
        padding-bottom: 0.1em
    }
`;

const CoinBasicInfo = withRouter(({history, selectedCoin, add, remove, watchList}) => {
    console.log("selectedCoin: ", watchList)
    //let watchListKeys = Object.values(watchList)
    //console.log("watchList KEYS: ", watchListKeys)
    
    //let selectedCoin = watchListKeys.find((coin) => ( coin.selected = "selected"));
    //console.log("selectedCoin: ", selectedCoin);
    //let marketData = selectedCoin.marketData
    //console.log("market data: ", marketData)
    
    //console.log("selected coin: ", selectedCoin)
    function addCoin() {
        add(selectedCoin)
        history.push("/watch-list/"+selectedCoin.id);
    }

    function removeCoin() {
        remove(selectedCoin)
        history.push("/watch-list/"+selectedCoin.id);
    }

    try {
        return (
            <>
                <Div key={selectedCoin.marketData.id}>
                    <Header>
                        <Coin>
                            <Img src={selectedCoin.marketData.image} alt="Coin logo" className="App-logo" />
                            <div>
                                <h1>{selectedCoin.marketData.name}</h1>
                                <HeadSubText>{selectedCoin.marketData.symbol}</HeadSubText>
                            </div>
                        </Coin>      
                        <Price>
                            <div>
                                <h1>${selectedCoin.marketData.price}</h1>
                                <HeadSubText>{selectedCoin.marketData.dayPercentChange}%</HeadSubText>
                            </div>
                            { selectedCoin.marketData.onWatchList === false ? <Button onClick={addCoin}><ButtonImg src={plus} alt="Add"></ButtonImg></Button> : <Button onClick={removeCoin}><ButtonImg src={minus} alt="minus"></ButtonImg></Button>}
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
                                        <strong>${selectedCoin.marketData.dayVolume}</strong>
                                    </td>
                                    <td>
                                        <p><strong>Market Cap:</strong></p>
                                        <strong>${selectedCoin.marketData.marketCap}</strong>
                                        <SubText><strong>Market Cap Rank: {selectedCoin.marketData.rank}</strong></SubText>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p><strong>All-Time High:</strong></p>
                                        <strong>${selectedCoin.marketData.ATH}</strong>
                                        <SubText><strong>{selectedCoin.marketData.ATHDate}</strong></SubText>
                                    </td>
                                    <td>
                                        <p><strong>All-Time Low:</strong></p>
                                        <strong>${selectedCoin.marketData.ATL}</strong>
                                        <SubText><strong>{selectedCoin.marketData.ATLDate}</strong></SubText>
                                    </td> 
                                </tr>
                            </tbody>
                        </Table>
                        <h3>More Info</h3>
                        <p>Website: <a href={selectedCoin.marketData.website}>{selectedCoin.marketData.website}</a></p>
                    </ContentBlock>
                </Div>
            </>
        )
    } catch {
        return (
            <>
                <Div>
                    <Header>
                        <Coin>
                            <div>
                                <h1> - </h1>
                                <HeadSubText>...</HeadSubText>
                            </div>
                        </Coin>      
                        <Price>
                            <div>
                                <h1>$ -</h1>
                                <HeadSubText> - %</HeadSubText>
                            </div>
                            { false ? <Button onClick={addCoin}><ButtonImg src={plus} alt="Add"></ButtonImg></Button> : <Button onClick={removeCoin}><ButtonImg src={minus} alt="minus"></ButtonImg></Button>}
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
                                        <strong>$ - </strong>
                                    </td>
                                    <td>
                                        <p><strong>Market Cap:</strong></p>
                                        <strong>$ - </strong>
                                        <SubText><strong>Market Cap Rank:  - </strong></SubText>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p><strong>All-Time High:</strong></p>
                                        <strong>$ - </strong>
                                        <SubText><strong> - </strong></SubText>
                                    </td>
                                    <td>
                                        <p><strong>All-Time Low:</strong></p>
                                        <strong>$ - </strong>
                                        <SubText><strong> - </strong></SubText>
                                    </td> 
                                </tr>
                            </tbody>
                        </Table>
                        <h3>More Info</h3>
                        <p>Website: <a> - </a></p>
                    </ContentBlock>
                </Div>
            </>
        )
    }
    
})

function mapStateToProps(state) {
    return {
        selectedCoin: state.watchListReducer.selectedCoin,
        watchList: state.watchListReducer.watchList
    };
}

function mapDispatchToProps(dispatch) {
  return {
      //selectCoin: (coinID) => dispatch(selectCoin(coinID)),
      add: (selectedCoin) => dispatch(add(selectedCoin)),
      remove: (selectedCoin) => dispatch(remove(selectedCoin))
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CoinBasicInfo);
