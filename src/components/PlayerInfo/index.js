import React, {Component} from 'react';
 
import {
    getPlayerDataById
} from '../../functions';
import Spinner from '../Spinner';
import './index.css'

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
        await getPlayerDataById(this.props.location.pathname.slice(-7)).then(data => { 
            this.setState({player: data}); 
        });
    };

    getPlayerInfo = (state) => {
        // If this.state.team has been set
        if (Object.keys(state.player).length !== 0) {
            var player = state.player[0];
            // Return the team info section
            var shootsCatches = "Shoots";
            if (player['primaryPosition']['code'] === "G") {
                shootsCatches = "Catches";
            }
            return(<>
                <div className="col-3" >
                    <div className="image-container">
                        <a className="player" href={"/players/" + player['id']}><img src={player['picture']['link']} alt={player['fullName']} style={{borderRadius: "50%"}}/></a>
                        <a className="team" href={"/teams/" + player['currentTeam']['abbreviation']}><img src={"https://assets.nhle.com/logos/nhl/svg/" + player['currentTeam']['abbreviation'] + "_light.svg"} alt="TOR" style={{borderRadius: "50%"}}/></a>
                        <a className="country" href="/"><img src={"https://api.nhle.com/images/country/48/" + player['info']['nationality'] + ".png"} alt={player['info']['nationality']}></img></a>
                    </div>
                </div>
                <div className="col-6">
                    <h2>{player['name']['fullName']}</h2>
                    <br></br>
                    <p> 
                        {'Number: ' + player['jerseyNumber']}<br/>
                        {'Position: ' + player['primaryPosition']['code'] + ' • ' + shootsCatches + ': ' + player['shootsCatches']}<br/>
                        {player['height'] + ', ' + player['weight'] + 'lbs'}<br/>
                        {'Born: ' +  player['info']['birthDate'] + ' in ' + player['info']['birthCity'] + ', '+ player['info']['nationality']}<br/>
                    </p>
                </div>
            </>);
        }
    };

    render() {
        if (this.getPlayerInfo(this.state) === undefined) {
            return (<div>
                        <div className="row" style={{height: "200px"}}></div>
                        <div className="row">
                            <Spinner/>
                        </div>
                    </div>);
        }
        else {
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
                    </div>)
        }
    }
}

export default PlayerInfoPage;