import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";
import CoinBasicInfo from './CoinBasicInfo';
import CoinNews from './CoinNews';
import CoinChart from './CoinChart';

const Container = styled.div`
    display: flex;
    height: 43.5vh;
    justify-content: space-between;
`;

const Div = styled.div`
    height: 87vh;
    width: 75%;
`;

const WatchListCoinDetail = () => {
    return (
        <Div>
            <Container>
                <CoinBasicInfo></CoinBasicInfo>
                <CoinNews></CoinNews>
            </Container>
            <Container>
                <CoinChart></CoinChart>
            </Container>
        </Div>
    )
}


export default requireAuth(WatchListCoinDetail);