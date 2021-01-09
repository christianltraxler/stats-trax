import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getGamesData } from '../../functions'
import Spinner from '../Spinner';
import './index.css'
import GameInfo from './GameInfo'

const mapStateToProps = state => {
    return { teams: state.teams };
  };

class GamePageComponent extends Component {

    constructor(props)
    {
        super(props);
        this.state={ 
            gameInfo: {},
            gameData: {}
        };
    }

    async componentDidMount() {
        await getGamesData(`type=S&id=${this.props.location.pathname.slice(-10)}`).then(data => { 
            this.setState({gameInfo: data}); 
        });
        await getGamesData(`type=I&id=${this.props.location.pathname.slice(-10)}`).then(data => { 
            this.setState({gameData: data}); 
        });
    }

    getGameInfo() {
        if (this.state.gameInfo !== undefined && this.state.gameData !== undefined && Object.keys(this.state.gameInfo).length !== 0 && Object.keys(this.state.gameData).length !== 0) {
            var homeTeam = this.props.teams[Object.keys(this.props.teams).find(index => {
                return(this.props.teams[index]['id'] === this.state.gameInfo[0]['teams']['home']['team']['id']);
            })];  
            var awayTeam = this.props.teams[Object.keys(this.props.teams).find(index => {
                return(this.props.teams[index]['id'] === this.state.gameInfo[0]['teams']['away']['team']['id']);
            })];  
            var gameInfo = this.state.gameInfo[0];

            var date = new Date(gameInfo['date']);
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var formatDate = monthNames[date.getMonth()] + ' ' +  date.getDate() + ', ' + date.getFullYear()

            var awayRecord = gameInfo['teams']['away']['record']['wins'] + '-' + gameInfo['teams']['away']['record']['losses'] + '-' + gameInfo['teams']['away']['record']['ot'] + ': ' + gameInfo['teams']['away']['record']['points'] + ' Points'; 
            var homeRecord = gameInfo['teams']['home']['record']['wins'] + '-' + gameInfo['teams']['home']['record']['losses'] + '-' + gameInfo['teams']['home']['record']['ot'] + ': ' + gameInfo['teams']['home']['record']['points'] + ' Points'; 
              
            return (<>
                <div>
                    <div className="row">
                        <div className="col-2"/>
                        <div className="col-3">
                            <a href={"/teams/" + awayTeam['abbreviation']}><img src={awayTeam['logo']['link']} alt={awayTeam['abbreviation']} /></a>
                            <p>{' '}</p><br/>
                            <h3 className="text-center">{awayTeam['name']}</h3>
                            <p className="text-center game-info">{awayRecord}</p>
                        </div>
                        <div className="col-2">
                            <div style={{height: "90%"}}>
                                <h1 className="score" style={{textAlign:"left"}}>{gameInfo['score']['away']}</h1>
                                <h1 className="score" style={{textAlign:"center"}}>-</h1>
                                <h1 className="score" style={{textAlign:"right"}}>{gameInfo['score']['home']}</h1>
                            </div>
                            <p className="text-center game-info">Date: {formatDate}</p>
                            <p className="text-center game-info">Season: {gameInfo['season']}</p>
                            <p className="text-center game-info">Game Type: {gameInfo['gameType']}</p>
                            <p className="text-center game-info">Arena: {gameInfo['venue']['name']}</p>
                        </div>
                        <div className="col-3">
                            <a href={"/teams/" + homeTeam['abbreviation']}><img src={homeTeam['logo']['link']} alt={homeTeam['abbreviation']} /></a>
                            <p>{' '}</p><br/>
                            <h3 className="text-center">{homeTeam['name']}</h3>
                            <p className="text-center game-info">{homeRecord}</p>
                        </div>
                        <div className="col-2"/>
                    </div>
                </div>
            </>);
        }
        return;
    }

    render() {
        var gameInfo = this.getGameInfo()
        if (gameInfo === undefined) {
            return (<div>
                        <div className="row" style={{height: "200px"}}></div>
                        <div className="row">
                            <Spinner/>
                        </div>
                    </div>);
        } else {
            return (<div>
                        <div className="row" style={{height: "50px"}}></div>
                        <div className="row">
                            {gameInfo}
                        </div>
                        <div className="row" style={{height: "150px"}}></div>
                        <GameInfo gameInfo={this.state.gameInfo} gameData={this.state.gameData}/>
                    </div>)
        }
    }
}

const GamePage = connect(mapStateToProps)(GamePageComponent);
export default GamePage;
