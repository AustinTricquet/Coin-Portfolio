import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";
import PortfolioList from '../components/WatchList';
import WatchListCoinDetail from '../components/WatchListCoinDetail';

const Div = styled.div`
    max-height: 87vh;
    display: flex;
`;

const WatchListPage = ({auth}) => {
    return (
        <Div>
            <PortfolioList></PortfolioList>
            <WatchListCoinDetail></WatchListCoinDetail>
        </Div>
    )
}

  
  
export default requireAuth(WatchListPage);