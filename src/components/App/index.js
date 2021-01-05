import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
 
import HomePage from '../Home';
import TeamsPage from '../Teams';
import PlayersPage from '../Players';
import TeamInfoPage from '../TeamInfo';
import PlayerInfoPage from '../PlayerInfo';
import HockeyRink from '../HockeyRink/index.js';
import * as ROUTES from '../../constants/routes';
 
const App = () => (
  <Router>
    <div>
      <HockeyRink>  
        <Route path={ROUTES.TEAM_INFO} component={TeamInfoPage} />
        <Route path={ROUTES.PLAYER_INFO} component={PlayerInfoPage} />
        <Route exact path={ROUTES.DEFAULT} component={HomePage} />
        <Route exact path={ROUTES.TEAMS} component={TeamsPage} />
        <Route exact path={ROUTES.PLAYERS} component={PlayersPage} />
      </HockeyRink> 
    </div>
  </Router>
);

export default App;