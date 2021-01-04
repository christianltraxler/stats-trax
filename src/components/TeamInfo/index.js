/* eslint-disable */
import React, {Component} from 'react';
import { connect } from 'react-redux';
 
import { getTeam } from '../../functions';
import './index.css';
import TeamInfoTable from './TeamInfoTable';
import Spinner from '../Spinner';

const mapStateToProps = state => {
    return { teams: state.teams };
  };

class TeamInfoPageComponent extends Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            team: {}
        };
    }

    async componentDidMount() {
        // Get the team to display based on the teams and pathname
        var team = getTeam(this.props.teams, this.props.location.pathname)

        // If the team has changed, update the state for the team and players
        if (this.state.team !== team) {
            this.setState({team: team});
        }
    };

    async componentDidUpdate() {
        // Get the team to display based on the teams and pathname
        var team = getTeam(this.props.teams, this.props.location.pathname)

        // If the team has changed, update the state for the team and players
        if (this.state.team !== team) {
            this.setState({team: team});
        }
    };

    getTeamInfo = () => {
        // If this.state.team has been set
        if (Object.keys(this.state.team).length !== 0) {
            var team = this.state.team;
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
        return undefined;
    };

    render() {
        if (this.getTeamInfo() === undefined) {
            return (<div>
                <div className="row" style={{height: "200px"}}></div>
                <div className="row">
                    <Spinner/>
                </div>
            </div>);
        } else {
            return (<div style={{height: "100%", padding: "0px 0px 5% 0px"}}>
                        <div className="row" style={{padding:"5% 0% 0% 0%"}}>
                            {this.getTeamInfo()}
                        </div>
                        <div className="row" style={{padding:"2.5% 2.5% 0% 2.5%"}}>
                            <TeamInfoTable team={this.state.team}/>
                        </div>
                    </div>);
        }
    }
}

const TeamInfoPage = connect(mapStateToProps)(TeamInfoPageComponent);
export default TeamInfoPage;
