import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";
import CoinBasicInfo from './CoinBasicInfo';
import CoinNews from './CoinNews';
import CoinChart from './CoinChart';

const WidgetsContainer = styled.div`
    display: flex;
    height: 40%;
    justify-content: space-between;
`;

const ChartContainer = styled.div`
    display: flex;
    height: 60%;
    justify-content: space-between;
`;

const Div = styled.div`
    height: 87vh;
    width: 75%;
    background-color: #F3F6FE;
`;

const WatchListCoinDetail = () => {
    return (
        <Div>
            <WidgetsContainer>
                <CoinBasicInfo></CoinBasicInfo>
                <CoinNews></CoinNews>
            </WidgetsContainer>
            <ChartContainer>
                <CoinChart></CoinChart>
            </ChartContainer>
        </Div>
    )
}


export default requireAuth(WatchListCoinDetail);