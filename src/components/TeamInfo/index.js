/* eslint-disable */
import React, {Component} from 'react';
 
import {
    getTeamsData,
    getTeam,
    getTeamCurrentPlayers
} from '../../functions';

class TeamInfoPage extends Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            teams: [],
            team: {},
            players: {}
        };
    }

    async componentDidMount() {
        // Set the initial state for the teams and team
        await getTeamsData().then(data => { 
            this.setState({teams: data}); 
            this.setState({team: getTeam(data, this.props.location.pathname)});
        });
    };

    async componentDidUpdate() {
        // Get the team to display based on the teams and pathname
        var team = getTeam(this.state.teams, this.props.location.pathname)

        // If the team has changed, update the state for the team and players
        if (this.state.team !== team) {
            this.setState({team: team});
            await getTeamCurrentPlayers(team).then(data => {
                this.setState({players:data});
            })
        }
    };

    getTeamInfo = (state) => {
        // If this.state.team has been set
        if (Object.keys(state.team).length !== 0) {
            var team = state.team;
            // Return the team info section
            return(<>
                <div className="col-3" style={{height:"80%", width:"80%"}}>
                    <a href="/"><img src={team['logo']['link']} alt={team['abbreviation']}/></a>
                </div>
                    <div className="col-9">
                    <h2>{team['name']}</h2>
                    <br></br>
                    <p> 
                        {'Division: ' + team['division']['name']}<br/>
                        {'Conference: ' + team['conference']['name']}<br/>
                        {'City: ' + team['city']}
                    </p>
                </div>
            </>);
        }
    };

    getTeamRosterTable = (state) => {
        // If this.state.players has been set
        if (state.players !== undefined) {
            var playerList = [];
            var players = state.players;

            // Iterate through the players
            for (var playerId in players) {
                // Add the player info to the array
                playerList.push(<>
                    <tr key={parseInt(playerId)}>
                        <td>{players[playerId]['primaryNumber']}</td>
                        <td>{players[playerId]['name']['fullName']}</td>
                        <td>{players[playerId]['primaryPosition']['abbreviation']}</td>
                        <td>{players[playerId]['shootsCatches']}</td>
                        <td>{players[playerId]['height']}</td>
                        <td>{players[playerId]['weight']}</td>
                    </tr>
                </>);
            }
            // Return the array of jsx elements for the players info array 
            return playerList;
        }   
        // Return nothing if this.state.players has not been set
        return;
    };

    render() {
        return (<div style={{height: "100%", padding: "0px 0px 5% 0px"}}>
                    <div className="row" style={{padding:"5% 0% 0% 0%", margin:"0%"}}>{this.getTeamInfo(this.state)}</div>
                    <div className="row" style={{padding:"2.5% 2.5% 0% 2.5%", margin:"0%"}}>
                        <table className="table-sm table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Shoots/Catches</th>
                                    <th>Height</th>
                                    <th>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getTeamRosterTable(this.state, this.props)}
                            </tbody>
                        </table>
                    </div>
                </div>)}
}

export default TeamInfoPage;