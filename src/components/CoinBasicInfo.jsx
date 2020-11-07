import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { selectCoin, add, remove } from '../store/actions/watchListActions';
import { withRouter } from 'react-router-dom';
import plus from '../images/plus.png';
import minus from '../images/minus.png';


const Div = styled.div`
    background-color: var(--nav-primary-color);
    background-color: white;
    border-radius: 1rem;
    color: var(--nav-text-color);
    color: #28394F;
    margin: 1.5rem 0.75rem 0.75rem 1.5rem;
    border: 3px solid var(--nav-primary-color);
    padding: 1.5rem;
    width: 60%;
    min-width: 25rem;
`;

const Header = styled.div`
    justify-content: space-between;
    padding: 0rem 0rem 0.5rem 0rem;
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
    height: 3rem;
    width: 3rem;
    pointer-events: none;
    background-color: white;
    border-radius: 100%;
    margin: 0rem 1rem 0rem 0rem;
`;

const ButtonImg = styled.img`
    height: 2.5rem;
    width: 2.5rem;
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
    margin: 0rem 0rem 0rem 1rem;
    text-align: right;
`;

const HeadSubText = styled.h3`
    color: #8993A8;
`;

const SubText = styled.p`
    color: #8993A8;
    font-size: 0.75rem;
`;

const Button = styled.button`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 100%;
    border: 0px;
    margin: 0.5rem 0rem 0rem 0rem;
    :focus {
        outline: none;
        box-shadow: none;
    }
    background-color: inherit;
    text-align: center;

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

const CoinBasicInfo = withRouter(({history, selectedCoin, add, remove}) => {
    function addCoin() {
        add(selectedCoin)
        history.push("/watch-list/"+selectedCoin[0].id);
    }

    function removeCoin() {
        remove(selectedCoin)
        history.push("/watch-list/"+selectedCoin[0].id);
    }

    return (
        <>
            {
                selectedCoin.map( ({id, name, symbol, image, price, dayPercentChange, dayVolume, marketCap, rank, ATH, ATHDate, ATL, ATLDate, website, onWatchList}) => 
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
                        
                            { onWatchList === false ? <Button onClick={addCoin}><ButtonImg src={plus} alt="Add"></ButtonImg></Button> : <Button onClick={removeCoin}><ButtonImg src={minus} alt="minus"></ButtonImg></Button>}
              
                            
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
})

function mapStateToProps(state) {
    return {
        selectedCoin: state.watchListReducer.selectedCoin,
    };
}

function mapDispatchToProps(dispatch) {
  return {
      selectCoin: (coinID) => dispatch(selectCoin(coinID)),
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
