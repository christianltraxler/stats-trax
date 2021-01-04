//import { data } from 'jquery';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';

import {
    getTeamsData
} from '../../functions';
import Spinner from '../Spinner';

class TeamsPage extends Component {

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

export default TeamsPage;