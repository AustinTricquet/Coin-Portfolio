import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";
import requireAuth from "./hoc/requireAuth";
import PortfolioList from './PortfolioList';

const Div = styled.div`
    max-height: 87vh;
`;

const WatchList = ({auth}) => {
    return (
        <Div>
            <PortfolioList></PortfolioList>
        </Div>
    )
}

  
  
export default requireAuth(WatchList);