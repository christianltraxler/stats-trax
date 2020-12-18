import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';

import {
    getTeamsData
} from '../../functions';

class TeamsDropdown extends Component {

    constructor(props)
    {
        super(props);
        this.state={ 
            teams: [] 
        };
    }

    componentDidMount() {
        getTeamsData().then(data => { 
            this.setState({teams: data}); 
        });
    }

    getDivisionTeams(nhlDivision)
    {
        var divisionTeams = [];
        for (var index in this.state.teams) {
            var team = this.state.teams[index];
            if(team['division']['name'] === nhlDivision) {
                divisionTeams.push(
                    <Link className="dropdown-item" href="/" key={team['id']} to={'/teams/' + team['abbreviation']}>
                        <img src={team['logo']['link']} alt={team['abbreviation']} style={{height: "20%", width:"20%"}}></img>
                        {team['name']}
                    </Link>)
            }
        }
        return(divisionTeams);
    };

    render() {
        return (<div className="row">
                    <div className="col">
                        <a className="dropdown-item text-center disabled" href="/">Pacific</a>
                        <div className="dropdown-divider"></div>
                        {this.getDivisionTeams("Pacific")}
                    </div>
                    <div className="col">
                        <a className="dropdown-item text-center disabled" href="/">Central</a>
                        <div className="dropdown-divider"></div>
                        {this.getDivisionTeams("Central")}
                    </div>
                    <div className="col">
                        <a className="dropdown-item text-center disabled" href="/">Metropolitan</a>
                        <div className="dropdown-divider"></div>
                        {this.getDivisionTeams("Metropolitan")}
                    </div>
                    <div className="col">
                        <a className="dropdown-item text-center disabled" href="/">Atlantic</a>
                        <div className="dropdown-divider"></div>
                        {this.getDivisionTeams("Atlantic")}
                    </div>
                </div>)
    }
}

export default TeamsDropdown;