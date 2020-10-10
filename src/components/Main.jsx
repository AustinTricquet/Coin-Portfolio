import React from 'react';
import { connect } from "react-redux";
import Portfolio from "./Portfolio";
import Home from "./Home";
import Loader from "./Loader"; 

const Main = ({ auth }) => {
    return (
        <div>
            {!auth.isLoaded ? <Loader />: !auth.isEmpty ? <Portfolio /> : <Home />}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.firebaseReducer.auth
    }
}

export default connect(mapStateToProps)(Main);
