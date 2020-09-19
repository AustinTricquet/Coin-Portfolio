import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Portfolio from './components/Portfolio';

const Div = styled.div`

`;

export default function App() {
  return (
    <Router>
      <Div>
        <Navbar />
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/portfolio' component={Portfolio} />
          </Switch>
        </div>
      </Div>
    </Router>
  );
}


