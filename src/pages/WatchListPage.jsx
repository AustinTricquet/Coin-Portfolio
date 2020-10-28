import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";
import PortfolioList from '../components/WatchList';

const Div = styled.div`
    max-height: 87vh;
`;

const WatchListPage = ({auth}) => {
    return (
        <Div>
            <PortfolioList></PortfolioList>
        </Div>
    )
}

  
  
export default requireAuth(WatchListPage);