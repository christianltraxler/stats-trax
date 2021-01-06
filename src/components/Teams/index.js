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

    getDivisionTeams(division)
    {
        if (this.props.teams !== undefined && Object.keys(this.props.teams).length !== 0) {
            var divisionTeams = Object.values(this.props.teams).filter(team => {
                return (team['division']['name'] === division)
            })
            var divisionTeamLinks = Object.keys(divisionTeams).map(index => {
                var team = divisionTeams[index];
                return (<Link className="dropdown-item teams-link" href="/" key={team['id']} to={'/teams/' + team['abbreviation']}>
                            <img src={team['logo']['link']} alt={team['abbreviation']} style={{height: "20%", width:"20%"}}></img>
                            {team['name']}
                        </Link>)
            });
        }
        return(divisionTeamLinks);
    };

    render() {
        if (this.getDivisionTeams("Pacific") !== undefined && this.getDivisionTeams("Pacific").length === 0) {
            return (<div style={{padding:"5% 5%"}}>
                        <div className="row" style={{height: "200px"}}></div>
                        <div className="row">
                            <Spinner/>
                        </div>
                    </div>);
        } else {
            return (
                <div style={{padding:"5% 0px"}}>
                        <div className="row" style={{height: "100px"}}> 
                            <h1 className=""> Teams Directory </h1>
                        </div>
                        <div className="row" style={{padding:"0px 0px 25px 0px"}}>
                            <hr className="solid" ></hr>
                        </div>
                    <div className="row" >
                        <div className="col-6">
                            <p className="teams">Western Conference</p>
                            <hr className="solid teams-1" ></hr>
                        </div>
                        <div className="col-6">
                            <p className="teams">Eastern Conference</p>
                            <hr className="solid teams-1" ></hr>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-3">
                            <p className="teams">Pacific Division</p>
                            <hr className="solid teams-2" ></hr>
                            {this.getDivisionTeams("Pacific")}
                        </div>
                        <div className="col-3">
                            <p className="teams">Central Division</p>
                            <hr className="solid teams-2" ></hr>
                            {this.getDivisionTeams("Central")}
                        </div>
                        <div className="col-3">
                            <p className="teams">Metropolitan Division</p>
                            <hr className="solid teams-2" ></hr>
                            {this.getDivisionTeams("Metropolitan")}
                        </div>
                        <div className="col-3">
                            <p className="teams">Atlantic Division</p>
                            <hr className="solid teams-2" ></hr>
                            {this.getDivisionTeams("Atlantic")}
                        </div>
                    </div>
                </div>);
        }
    }
}

const TeamsPage = connect(mapStateToProps)(TeamsPageComponent);
export default TeamsPage;