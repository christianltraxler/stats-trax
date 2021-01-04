//import { data } from 'jquery';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';

import Spinner from '../Spinner';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { teams: state.teams };
};

class TeamsPageComponent extends Component {

    getDivisionTeams(nhlDivision)
    {
        var divisionTeams = [];
        for (var index in this.props.teams) {
            var team = this.props.teams[index];
            if(team['division']['name'] === nhlDivision) {
                divisionTeams.push(
                    <Link className="dropdown-item teams-link" href="/" key={team['id']} to={'/teams/' + team['abbreviation']}>
                        <img src={team['logo']['link']} alt={team['abbreviation']} style={{height: "20%", width:"20%"}}></img>
                        {team['name']}
                    </Link>)
            }
        }
        return(divisionTeams);
    };

    render() {
        if (this.getDivisionTeams("Pacific").length === 0) {
            return (<div style={{padding:"5% 5%"}}>
                        <div className="row" style={{height: "200px"}}></div>
                        <div className="row">
                            <Spinner/>
                        </div>
                    </div>);
        } else {
            return (
                <div style={{padding:"5% 5%"}}>
                    <div className="row" >
                        <p className="teams">Western Conference</p>
                    </div>
                    <div className="row" >
                        <div className="col teams">
                            <p className="teams">Pacific Division</p>
                            {this.getDivisionTeams("Pacific")}
                        </div>
                        <div className="col teams">
                            <p className="teams">Central Division</p>
                            {this.getDivisionTeams("Central")}
                        </div>
                    </div>
                    <div className="row">
                        <p className="teams">Eastern Conference</p>
                    </div>
                    <div className="row" >
                        <div className="col teams">
                            <p className="teams">Metropolitan Division</p>
                            {this.getDivisionTeams("Metropolitan")}
                        </div>
                        <div className="col teams">
                            <p className="teams">Atlantic Division</p>
                            {this.getDivisionTeams("Atlantic")}
                        </div>
                    </div>
                </div>);
        }
    }
}

const TeamsPage = connect(mapStateToProps)(TeamsPageComponent);
export default TeamsPage;