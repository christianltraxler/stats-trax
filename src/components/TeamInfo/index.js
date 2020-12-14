/* eslint-disable */
import React, {Component} from 'react';
 
import {
    getTeamsData,
    getTeam,
    getTeamCurrentPlayers
} from '../../functions';

class TeamInfo extends Component {

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
        await getTeamsData().then(data => { 
            this.setState({teams: data}); 
        });
    };

    async componentDidUpdate() {
        var team = getTeam(this.state.teams, this.props.location.pathname)
        if (this.state.team !== team) {
            this.setState({
                team: team
            });
        }
        await this.setTeamPlayers();
    };

    setTeamPlayers = async() => {
        if (this.state.team !== undefined) {
            await getTeamCurrentPlayers(this.state.team).then(data => {
                this.setState({players:data});
            })
        } 
    }

    getTeamInfo = (state, props) => {
        for(var index in state.teams) {
            if(props.location.pathname.includes(state.teams[index]['abbreviation'])) {
                var team = state.teams[index];
                
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
        }
    };

    getTeamRosterTable = (state) => {
        if (state.players !== undefined) {
            var playerList = [];
            var players = state.players;
            for (var playerId in players) {
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
            return playerList;
        }   
        return;
    };

    render() {
        return (<div style={{height: "100%", padding: "0px 0px 5% 0px"}}>
                    <div className="row" style={{padding:"5% 0% 0% 0%", margin:"0%"}}>{this.getTeamInfo(this.state, this.props)}</div>
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

export default TeamInfo;
/* 
{Object.keys(players).map((playerId) => {
    <tr key={parseInt(playerId)}>
        <td>{players[playerId]['primaryNumber']}</td>
        <td>{players[playerId]['name']['fullName']}</td>
        <td>{players[playerId]['primaryPosition']['abbreviation']}</td>
        <td>{players[playerId]['shootsCatches']}</td>
        <td>{players[playerId]['height']}</td>
        <td>{players[playerId]['weight']}</td>
    </tr>
})} */