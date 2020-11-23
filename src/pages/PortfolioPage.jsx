import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";
import PortfolioList from '../components/Portfolio';
import WatchListCoinDetail from '../components/WatchListCoinDetail';

const Div = styled.div`
    max-height: 87vh;
    display: flex;
`;

const PortfolioPage = ({auth}) => {
    return (
        <Div>
            <PortfolioList></PortfolioList>
            <WatchListCoinDetail></WatchListCoinDetail>
        </Div>
    )
}

  
  
export default requireAuth(PortfolioPage);