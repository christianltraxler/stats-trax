import React, {Component} from 'react';
 
import {
    getPlayerData
} from '../../functions';

class PlayerInfoPage extends Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            player: {}
        };
    }

    async componentDidMount() {
        // Set the initial state for the teams and team
        await getPlayerData(this.props.location.pathname.slice(-7)).then(data => { 
            this.setState({player: data}); 
        });
    };

    getPlayerInfo = (state) => {
        // If this.state.team has been set
        if (Object.keys(state.player).length !== 0) {
            var player = state.player[0];
            // Return the team info section
            return(<>
                <div className="col-3" style={{height:"80%", width:"80%"}}>
                    <a href="/"><img src={player['picture']['link']} alt={player['fullName']}/></a>
                </div>
                <div className="col-5">
                    <h2>{player['name']['fullName']}</h2>
                    <br></br>
                    <p> 
                        {'Number: ' + player['primaryNumber']}<br/>
                        {'Position: ' + player['primaryPosition']['type']}<br/>
                        {'Team: ' + player['currentTeam']['name']}<br/>
                        {'Shoots/Catches: ' + player['shootsCatches']}
                    </p>
                </div>
                <div className="col-4">
                <p> 
                        {'Height: ' + player['height']}<br/>
                        {'Weight: ' + player['weight']}<br/>
                        {'Birthdate: ' + player['info']['birthDate']}<br/>
                        {'Birth City: ' + player['info']['birthCity']}<br/>
                        {'Nationality: ' + player['info']['nationality']}<br/>
                        {'Shoots/Catches: ' + player['shootsCatches']}
                    </p>
                </div>
            </>);
        }
    };

    render() {
        return (<div style={{height: "100%", padding: "0px 0px 5% 0px"}}>
                    <div className="row" style={{padding:"5% 0% 0% 0%", margin:"0%"}}>{this.getPlayerInfo(this.state)}</div>
                    <div className="row" style={{padding:"2.5% 2.5% 0% 2.5%", margin:"0%"}}>
                        <table className="table-sm table-dark table-hover">
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>)}
}

export default PlayerInfoPage;