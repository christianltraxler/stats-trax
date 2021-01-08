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
import GamesPage from '../Games';
import GameInfoPage from '../GameInfo'
import * as ROUTES from '../../constants/routes';
import { getTeamsData } from '../../functions'
 
class App extends React.Component {

  constructor(props) {
    super(props);
 
    this.state = {
      teams: {}
    };
  }

  async componentDidMount() {
    await getTeamsData().then(data => { 
        this.setState({teams: data}); 
    });
  }

  render() {
    return (<Router>
              <div>
                <HockeyRink>  
                  <Route path={ROUTES.TEAM_INFO} teams={this.state.teams} component={TeamInfoPage}/>
                  <Route path={ROUTES.PLAYER_INFO} teams={this.state.teams} component={PlayerInfoPage}/>
                  <Route path={ROUTES.GAME_INFO} teams={this.state.teams} component={GameInfoPage}/>
                  <Route exact path={ROUTES.DEFAULT} teams={this.state.teams} component={HomePage}/>
                  <Route exact path={ROUTES.TEAMS} teams={this.state.teams} component={TeamsPage}/>
                  <Route exact path={ROUTES.PLAYERS} teams={this.state.teams} component={PlayersPage}/>
                  <Route exact path={ROUTES.GAMES} teams={this.state.teams} component={GamesPage}/>
                </HockeyRink> 
              </div>
            </Router>);
  }
} 

export default App;