import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./index.css"

import {
    getPlayersDataByIds,
    getTeamsData
} from '../../functions';

class HomePage extends Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            teams: {},
            players: {}
        };
    }

    componentDidMount() {
        getTeamsData()
            .then(data => { 
            this.setState({teams: data}); 
        });
        // Temoprary way to get the most popular players
        getPlayersDataByIds([8471214, 8471675, 8478402, 8479318, 8475166, 8474141, 8474564, 8471215, 8470638, 8473604, 8473419, 8477934, 8477956, 8477492, 8478550, 8478403, 8474600, 8476883, 8471695, 8476945])
            .then(data => { 
            this.setState({players: data}); 
        });

    }

    getTeams()
    {
        var teams = [];
        // Iterate through all the teams
        for (var index in this.state.teams) {
            var team = this.state.teams[index];
            // Add each team to the list of Links
            teams.push(
                <Link className="dropdown-item teams-list-link" href="/" key={team['id']} to={'/teams/' + team['abbreviation']}>
                    <img src={team['logo']['link']} alt={team['abbreviation']} style={{height: "100%"}}></img>
                    {" " + team['name']}
                </Link>)
        }
        // Return the links
        return(teams);
    };

    getPlayers()
    {
        var players = [];
        // Iterate through the players
        for (var index in this.state.players) {
            var player = this.state.players[index];
            // Add the player to the list of Links
            players.push(
                <Link className="dropdown-item player-list-link" href="/" key={player['id']} to={'/players/' + player['id']} >
                    <img src={player['picture']['link']} alt={player['id']} style={{height: "100%", borderRadius: "50%"}}></img>
                    {" " + player['name']['fullName']}
                </Link>)
        }
        // Return the links
        return(players);
    };

    render() {
        return (<div style={{height: "100%"}}>
                    <div className="row" style={{height: "175px"}}> 
                        <h1 className="site-title"> Stats Trax </h1>
                    </div>
                    <div className="row">
                        <hr className="solid" ></hr>
                        <div className="col-3 left">
                            {this.getTeams()}
                        </div>
                        <div className="col-6">

                        </div>
                        <div className="col-3 right">
                            {this.getPlayers()}
                        </div>
                        <hr className="solid" ></hr>
                    </div>
                    <div className="row" style={{height: "150px"}}>

                    </div>
                </div>)}
}

export default HomePage;