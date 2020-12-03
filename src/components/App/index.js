import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
 
import HomePage from '../Home';
import TeamsPage from '../Teams';
import PlayersPage from '../Players';

import HockeyRink from '../HockeyRink/index.js';
 
import * as ROUTES from '../../constants/routes';
 
const App = () => (
  <Router>
    <div>
      <HockeyRink>  
        <Route exact path={ROUTES.DEFAULT} component={HomePage} />
        <Route path={ROUTES.TEAMS} component={TeamsPage} />
        <Route path={ROUTES.PLAYERS} component={PlayersPage} />
      </HockeyRink> 
    </div>
  </Router>
);
 
export default App;