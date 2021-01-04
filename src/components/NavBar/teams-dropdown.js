import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { teams: state.teams };
};

class TeamsDropdownComponent extends Component {

    getDivisionTeams(nhlDivision)
    {
        var divisionTeams = [];
        for (var index in this.props.teams) {
            var team = this.props.teams[index];
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

const TeamsDropdown = connect(mapStateToProps)(TeamsDropdownComponent);
export default TeamsDropdown;