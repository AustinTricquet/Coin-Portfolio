import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";
import CoinBasicInfo from './CoinBasicInfo';

const Container = styled.div`
    display: flex;
    height: 43.5vh;
    justify-content: space-between;
    padding: 1em 2em 1em 2em;
`;

const Div = styled.div`
    height: 87vh;
    width: 75%;
    padding: 0em 0em 2em 0em;
`;

const WatchListCoinDetail = ({ auth }) => {
    return (
        <Div>
            <Container>
                <CoinBasicInfo></CoinBasicInfo>
                <CoinBasicInfo></CoinBasicInfo>
            </Container>
            <Container>
                <CoinBasicInfo></CoinBasicInfo>
            </Container>
        </Div>
    )
}


export default requireAuth(WatchListCoinDetail);