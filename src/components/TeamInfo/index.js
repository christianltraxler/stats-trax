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

    render() {
        return (
        <div className="row" style={{padding:"5% 0%", margin:"0%"}}>{this.getTeamInfo()}</div>)
    }
}

export default TeamInfo;

