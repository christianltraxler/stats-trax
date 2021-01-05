//import { data } from 'jquery';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./index.css";

import {
    getPlayersData
} from '../../functions';
import Spinner from '../Spinner';

class PlayersPage extends Component {

    constructor(props)
    {
        super(props);
        this.state={ 
            players: [],
            isActive: "A",
            playersArray: []
        };
    }

    async componentDidMount() {
        await getPlayersData(`startsWith=${this.state.isActive}`).then(data => { 
            this.setState({players: data}); 
        });
    }

    async componentDidUpdate() {
        if (this.state.playersArray.length !== this.getPlayersArray().length) {
            this.setState({playersArray: this.getPlayersArray()});
        }
    }

    async updateActive(value) {
        this.setState({isActive: value});
        await getPlayersData(`startsWith=${value}`).then(data => { 
            this.setState({players: data}); 
        });
    }

    getLetterLinks = () => {
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        var letterLinks = alphabet.map(letter => {
            return(<>
                <input className={`btn btn-primary mr-2 ${this.state.isActive === letter ? "active" : ""}`} 
                        value={letter} id={letter} 
                        onClick={e => this.updateActive(e.target.value)} 
                        type="Button" readOnly={true}/>
            </>);
        })
        return letterLinks;
    }

    getPlayersArray = () => {
        if (this.state.players !== undefined) {
            var playersArray = this.state.players.map(player => {
                return (<tr key={parseInt(player['id'])}>
                            <td className="text-center">{player['jerseyNumber']}</td>
                            <td>
                                <Link className="player-link" href="/" to={'/players/' + player['id']}>
                                    <img className="player-image" src={player['picture']['link']} alt=""></img>
                                    {player['name']['fullName']} 
                                </Link>
                            </td>
                            <td className="text-center">{player['primaryPosition']['abbreviation']}</td>
                            <td className="text-center">{player['shootsCatches']}</td>
                        </tr>);
            });
            return(playersArray);
        }
    }

    getPlayersTables = (state, number) => {
        if (state.playersArray.length !== 0) {
            var players = state.playersArray;
            var playerArray = [];
            for (var index in players) {
                if (index % 4 === number) {
                    playerArray.push(players[index]);
                }
            }
            return (playerArray);
        }
    }

    render() {
        if (this.getPlayersTables(this.state, 0) === undefined) {
            return (<div style={{padding:"2% 0px 2% 0px"}}>
                        <div className="row" style={{height: "100px"}}> 
                            <h1 className="players-title"> Player Directory </h1>
                        </div>
                        <div className="row" style={{padding:"0px 0px 25px 0px"}}>
                            <hr className="solid" ></hr>
                            <div className="col text-center" role="toolbar" aria-label="Letter Links Toolbar">
                                {this.getLetterLinks()}
                            </div>
                        </div>
                        <div className="row" style={{height: "100px"}}></div>
                        <div className="row">
                            <Spinner/>
                        </div>
                    </div>);
        } else {
            return (<div style={{padding:"2% 0px 2% 0px"}}>
                        <div className="row" style={{height: "100px"}}> 
                            <h1 className="players-title"> Player Directory </h1>
                        </div>
                        <div className="row" style={{padding:"0px 0px 25px 0px"}}>
                            <hr className="solid" ></hr>
                            <div className="col text-center" role="toolbar" aria-label="Letter Links Toolbar">
                                {this.getLetterLinks()}
                            </div>
                        </div>
                        <div className="row" style={{minHeight: "800px"}}>
                            <div className="col-3">
                                <table className="table-sm table-dark table-hover center">
                                    <tbody>
                                        {this.getPlayersTables(this.state, 0)}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-3 justify-center">
                                <table className="table-sm table-dark table-hover center">
                                    <tbody>
                                        {this.getPlayersTables(this.state, 1)}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-3 justify-center">
                                <table className="table-sm table-dark table-hover center">
                                    <tbody>
                                        {this.getPlayersTables(this.state, 2)}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-3 justify-center">
                                <table className="table-sm table-dark table-hover center">
                                    <tbody>
                                        {this.getPlayersTables(this.state, 3)}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                        <div className="row" style={{padding:"25px 0px"}}>
                            <div className="col text-center" role="toolbar" aria-label="Letter Links Toolbar">
                                {this.getLetterLinks()}
                            </div>
                        </div>
                    </div>)
        }
    }
}

export default PlayersPage;