import React, {Component} from 'react';
 

class TeamInfo extends Component {

    constructor(props)
    {
        super(props);
        this.state={ 
            data: []
        };
    }

    componentDidMount() {
        this.getTeamsData();
    }

    getTeamsData = () => {
        fetch('https://us-central1-stats-trax.cloudfunctions.net/app/teams')
        .then(response => {
            response.json().then((teams) => {
                this.setState({ data: teams }); 
            })
        })
    };

    getTeamInfo = () => {
        for(var index in this.state.data) {
            if(this.props.location.pathname.includes(this.state.data[index]['abbreviation'])) {
                var team = this.state.data[index];
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

    getTeamRosterTable = (team) => {
        for(var index in this.state.data) {
            if(this.props.location.pathname.includes(this.state.data[index]['abbreviation'])) {
                var teamRoster = this.state.data[index]['roster'];
                
                var roster = [];
                for(var playerId in teamRoster['20202021'])
                    roster.push(<>
                    <tr key={parseInt(playerId)}>
                        <td>{teamRoster['20202021'][playerId]['name']}</td>
                        <td>{teamRoster['20202021'][playerId]['id']}</td>
                    </tr>
                    </>);
                return (<>
                    <table className="table-sm table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roster}
                        </tbody>
                    </table>
                </>);
            }
        }
    };

    render() {
        return (<div style={{height: "100%", padding: "0px 0px 5% 0px"}}>
                    <div className="row" style={{padding:"5% 0% 0% 0%", margin:"0%"}}>{this.getTeamInfo()}</div>
                    <div className="row" style={{padding:"2.5% 2.5% 0% 2.5%", margin:"0%"}}>{this.getTeamRosterTable()}</div>
                </div>)}
}

export default TeamInfo;

