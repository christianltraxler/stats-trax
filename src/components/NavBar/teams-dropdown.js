import { data } from 'jquery';
import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import './index.css';

//import * as ROUTES from '../../constants/routes';

class TeamsDropdown extends Component {
    

    constructor(props)
    {
      super(props);
      this.state={ data: [] };
    }

    componentDidMount() {
        this.getTeamsData();
    }

    getTeamsData = () => {
        fetch('https://us-central1-stats-trax.cloudfunctions.net/app/teams')
        .then(response => {
            response.json().then((teams) => {
                this.setState({ data: teams}); 
            })
        })
    };

    componentDidCatch

    getTeamsDivision(nhlDivision)
    {
        var divisionTeams = [];
        for (var index in this.state.data) {
            var team = this.state.data[index];
            if(team['division']['name'] === nhlDivision) {
                divisionTeams.push(
                    <a className="dropdown-item" href="/">
                        <img src={team['logo']['link']} alt={team['abbreviation']} key={team['id']} style={{height: "20%", width:"20%"}}></img>
                        {team['name']}
                    </a>)
            }
        }
        return(divisionTeams);
    };

    render() {
        return (<div className="row">
                    <div className="col">
                        <a className="dropdown-item text-center" display="inline" href="/">Pacific</a>
                        <div className="dropdown-divider"></div>
                        {this.getTeamsDivision("Pacific")}
                    </div>
                    <div className="col">
                        <a className="dropdown-item text-center" display="inline" href="/">Central</a>
                        <div className="dropdown-divider"></div>
                        {this.getTeamsDivision("Central")}
                    </div>
                    <div className="col">
                        <a className="dropdown-item text-center"  display="inline"href="/">Metropolitan</a>
                        <div className="dropdown-divider"></div>
                        {this.getTeamsDivision("Metropolitan")}
                    </div>
                    <div className="col">
                        <a className="dropdown-item text-center" display="inline" href="/">Atlantic</a>
                        <div className="dropdown-divider"></div>
                        {this.getTeamsDivision("Atlantic")}
                    </div>
                </div>)
    }
}

export default TeamsDropdown;