/* eslint-disable */
import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
 
import {
    getTeamsData,
    getTeam
} from '../../functions';
import './index.css';
import TeamInfoTable from './TeamInfoTable';

class TeamInfoPage extends Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            teams: [],
            team: {}
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
        }
    };

    getTeamInfo = (state) => {
        // If this.state.team has been set
        if (Object.keys(state.team).length !== 0) {
            var team = state.team;
            // Return the team info section
            return(<>
                <div className="col-3">
                    <a href="/"><img className="team-logo" src={team['logo']['link']} alt={team['abbreviation']}/></a>
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

    render() {
        return (<div style={{height: "100%", padding: "0px 0px 5% 0px"}}>
                    <div className="row" style={{padding:"5% 0% 0% 0%"}}>
                        {this.getTeamInfo(this.state)}
                    </div>
                    <div className="row" style={{padding:"2.5% 2.5% 0% 2.5%"}}>
                        <TeamInfoTable team={this.state.team}/>
                    </div>
                </div>)
        }
    }

export default TeamInfoPage;
