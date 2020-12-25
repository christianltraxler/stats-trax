//import { data } from 'jquery';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./index.css";

import {
    getPlayersData
} from '../../functions';

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
        var letterLinks = [];
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        for (var letter in alphabet) {
            letterLinks.push(<>
                <input className={`btn btn-primary mr-2 ${this.state.isActive === alphabet[letter] ? "active" : ""}`} value={alphabet[letter]} id={alphabet[letter]} 
                    onClick={e => this.updateActive(e.target.value)} type="Button"  readOnly={true}/>
            </>);
        }
        return letterLinks;
    }

    getPlayersArray = () => {
        if (this.state.players !== undefined) {
            var playersArray = [];
            var players = this.state.players;
            for (var index in this.state.players) {
                    playersArray.push(<>
                        <tr key={parseInt(players[index]['id'])}>
                                <td className="text-center">{players[index]['jerseyNumber']}</td>
                                <td>
                                    <Link className="player-link" href="/" to={'/players/' + players[index]['id']}>
                                        <img className="player-image" src={players[index]['picture']['link']} alt=""></img>
                                        {players[index]['name']['fullName']} 
                                    </Link>
                                </td>
                                <td className="text-center">{players[index]['primaryPosition']['abbreviation']}</td>
                                <td className="text-center">{players[index]['shootsCatches']}</td>
                            </tr>
                    </>);
            }
        }
        return(playersArray);
    }

    getPlayersTables = (state, number) => {
        if (state.playersArray.length !== 0) {
            var playersArray = state.playersArray;
            var newArray = [];
            for (var index in playersArray) {
                if (index % 4 === number) {
                    newArray.push(playersArray[index]);
                }
            }
            return (newArray);
        }
    }

    render() {
        return (<div style={{height: "100%", padding:"2% 0px 2% 0px"}}>
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

export default PlayersPage;