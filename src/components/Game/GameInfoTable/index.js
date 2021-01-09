import React, {Component} from 'react';
import './index.css'

class GameInfoTable extends Component {

    getGameTables() {
        var tables = {};

        if (this.props.dataType.charAt(0) === 'L') {

        } else if (this.props.dataType.charAt(0) === 'P') {
            if (this.props.dataType.charAt(1) === 'G') {
                var generalSkaterColumns = ['#', 'Name', 'TOI', 'G', 'A', 'PTS', '+/-', 'SOG', 'PIM', 'GvA', 'TkA', 'Hits', 'BkS'].map(column => {
                        return (<th className="text-center">{column}</th>)
                    });
                var generalGoalieColumns = ['#', 'Name', 'W/L', 'TOI', 'SvPct', 'Sv', 'Sh'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                tables[0] = {
                    'title': 'General Skater Stats',
                    'columns': [generalSkaterColumns, generalSkaterColumns],
                    'data': [this.getGeneralSkaterStatsData(this.props.gameData[0]['teams']['away']['id']), this.getGeneralSkaterStatsData(this.props.gameData[0]['teams']['home']['id'])]
                };
                tables[1] = {
                    'title': 'General Goalie Stats',
                    'columns': [generalGoalieColumns, generalGoalieColumns],
                    'data': [this.getGeneralGoalieStatsData(this.props.gameData[0]['teams']['away']['id']), this.getGeneralGoalieStatsData(this.props.gameData[0]['teams']['home']['id'])]
                }
            } else if (this.props.dataType.charAt(1) === 'S') {
                var strengthSkaterColumns = ['Number', 'Name', 'TOI', 'EV TOI', 'PP TOI', 'PK TOI', 'G', 'PPG', 'PKG', 'A', 'PPA', 'PKA'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                var strengthGoalieColumns = ['Number', 'Name', 'SvPct', 'EV SvPct', 'PP SvPct', 'PK SvPct', 'Sv', 'EV Sv', 'PP Sv', 'PK Sv', 'Sh', 'EV Sh', 'PP Sh', 'PK Sh'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                tables[0] = {
                    'title': 'Strength Skater Stats',
                    'columns': [strengthSkaterColumns, strengthSkaterColumns],
                    'data':  [this.getStrengthSkaterStatsData(this.props.gameData[0]['teams']['away']['id']), this.getStrengthSkaterStatsData(this.props.gameData[0]['teams']['home']['id'])]
                }
                tables[1] = {
                    'title': 'Strength Goalie Stats',
                    'columns': [strengthGoalieColumns, strengthGoalieColumns],
                    'data':  [this.getStrengthGoalieStatsData(this.props.gameData[0]['teams']['away']['id']), this.getStrengthGoalieStatsData(this.props.gameData[0]['teams']['home']['id'])]
                }
            } else if (this.props.dataType.charAt(1) === 'A') {
                var generalAwaySkaterColumns = ['#', 'Name', 'TOI', 'G', 'A', 'PTS', '+/-', 'SOG', 'PIM', 'GvA', 'TkA', 'Hits', 'BkS'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                var strengthAwaySkaterColumns = ['Number', 'Name', 'TOI', 'EV TOI', 'PP TOI', 'PK TOI', 'G', 'PPG', 'PKG', 'A', 'PPA', 'PKA'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                var generalAwayGoalieColumns = ['#', 'Name', 'W/L', 'TOI', 'SvPct', 'Sv', 'Sh'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                var strengthAwayGoalieColumns = ['Number', 'Name', 'SvPct', 'EV SvPct', 'PP SvPct', 'PK SvPct', 'Sv', 'EV Sv', 'PP Sv', 'PK Sv', 'Sh', 'EV Sh', 'PP Sh', 'PK Sh'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                tables[0] = {
                    'title': 'Away Skater Stats',
                    'columns': [generalAwaySkaterColumns, strengthAwaySkaterColumns],
                    'data': [this.getGeneralSkaterStatsData(this.props.gameData[0]['teams']['away']['id']), this.getStrengthSkaterStatsData(this.props.gameData[0]['teams']['away']['id'])]
                };
                tables[1] = {
                    'title': 'Away Goalie Stats',
                    'columns': [generalAwayGoalieColumns, strengthAwayGoalieColumns],
                    'data': [this.getGeneralGoalieStatsData(this.props.gameData[0]['teams']['away']['id']), this.getStrengthGoalieStatsData(this.props.gameData[0]['teams']['away']['id'])]
                }
            } else if (this.props.dataType.charAt(1) === 'H') {
                var generalHomeSkaterColumns = ['#', 'Name', 'TOI', 'G', 'A', 'PTS', '+/-', 'SOG', 'PIM', 'GvA', 'TkA', 'Hits', 'BkS'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                var strengthHomeSkaterColumns = ['Number', 'Name', 'TOI', 'EV TOI', 'PP TOI', 'PK TOI', 'G', 'PPG', 'PKG', 'A', 'PPA', 'PKA'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                var generalHomeGoalieColumns = ['#', 'Name', 'W/L', 'TOI', 'SvPct', 'Sv', 'Sh'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                var strengthHomeGoalieColumns = ['Number', 'Name', 'SvPct', 'EV SvPct', 'PP SvPct', 'PK SvPct', 'Sv', 'EV Sv', 'PP Sv', 'PK Sv', 'Sh', 'EV Sh', 'PP Sh', 'PK Sh'].map(column => {
                    return (<th className="text-center">{column}</th>)
                });
                tables[0] = {
                    'title': 'Home Skater Stats',
                    'columns': [generalHomeSkaterColumns, strengthHomeSkaterColumns],
                    'data': [this.getGeneralSkaterStatsData(this.props.gameData[0]['teams']['home']['id']), this.getStrengthSkaterStatsData(this.props.gameData[0]['teams']['home']['id'])]
                };
                tables[1] = {
                    'title': 'Home Goalie Stats',
                    'columns': [generalHomeGoalieColumns, strengthHomeGoalieColumns],
                    'data': [this.getGeneralGoalieStatsData(this.props.gameData[0]['teams']['home']['id']), this.getStrengthGoalieStatsData(this.props.gameData[0]['teams']['home']['id'])]
                }
            }
        } else if (this.state.tableType === 'T') {

        } else if (this.state.tableType === 'G') {

        } else if (this.state.tableType === 'S') {

        }

        return(this.getTables(tables))
    }

    getGeneralSkaterStatsData(teamId) {
        return(Object.keys(this.props.gameData[0]['players']).map(playerId => {
            var player = this.props.gameData[0]['players'][playerId]
            var playerStats = player['stats'];
            
            if (player['stats'] !== null && teamId === player['team']['id']) {
                var playerStatsData = [player['primaryNumber'], player['name'], playerStats['timeOnIce'], playerStats['goals'], playerStats['assists'], playerStats['goals'] + playerStats['assists'], 
                        playerStats['plusMinus'], playerStats['shots'], playerStats['penaltyMinutes'], 
                        playerStats['giveaways'], playerStats['takeaways'], playerStats['hits'], playerStats['blocked']].map(data => {
                    return (<td className="text-center">{data}</td>)
                });
                return (<>
                    <tr>
                        {playerStatsData}
                    </tr>
                </>);
            }
            return <></>;
        }));
    }
    
    getGeneralGoalieStatsData(teamId) {
        return(Object.keys(this.props.gameData[0]['players']).map(playerId => {
            var player = this.props.gameData[0]['players'][playerId]
            var playerStats = player['stats'];
            
            if (player['stats'] !== null &&  player['position']['code'] === 'G' && teamId === player['team']['id']) {
                var playerStatsData = [ player['primaryNumber'], player['name'], playerStats['decision'], playerStats['timeOnIce'], 
                                        Math.round(playerStats['savePercentage'] * 10) / 1000, playerStats['saves'], playerStats['shots']].map(data => {
                    return (<td className="text-center">{data}</td>)
                });
                return (<>
                    <tr>
                        {playerStatsData}
                    </tr>
                </>);
            }
            return <></>;
        }));
    }

    getStrengthSkaterStatsData(teamId) {
        return(Object.keys(this.props.gameData[0]['players']).map(playerId => {
            var player = this.props.gameData[0]['players'][playerId]
            var playerStats = player['stats'];
            
            if (player['stats'] !== null && player['position']['code'] !== 'G' && teamId === player['team']['id']) {
                var playerStatsData = [ player['primaryNumber'], player['name'], playerStats['timeOnIce'], 
                                        playerStats['evenTimeOnIce'], playerStats['powerPlayTimeOnIce'], playerStats['shortHandedTimeOnIce'],
                                        playerStats['goals'], playerStats['powerPlayGoals'], playerStats['shortHandedGoals'],
                                        playerStats['assists'], playerStats['powerPlayAssists'], playerStats['shortHandedAssists']].map(data => {
                    return (<td className="text-center">{data}</td>)
                });
                return (<>
                    <tr>
                        {playerStatsData}
                    </tr>
                </>);
            }
            return <></>;
        }));
    }

    getStrengthGoalieStatsData(teamId) {
        return(Object.keys(this.props.gameData[0]['players']).map(playerId => {
            var player = this.props.gameData[0]['players'][playerId]
            var playerStats = player['stats'];
            
            if (player['stats'] !== null && player['position']['code'] === 'G' && teamId === player['team']['id']) {
                var playerStatsData = [ player['primaryNumber'], player['name'], 
                                        Math.round(playerStats['savePercentage'] * 10) / 1000, Math.round(playerStats['evenStrengthSavePercentage'] * 10) / 1000, 
                                        Math.round(playerStats['powerPlaySavePercentage'] * 10) / 1000, Math.round(playerStats['shortHandedSavePercentage'] * 10) / 1000, 
                                        playerStats['saves'], playerStats['evenSaves'], playerStats['powerPlaySaves'], playerStats['shortHandedSaves'],
                                        playerStats['shots'], playerStats['evenShotsAgainst'], playerStats['powerPlayShotsAgainst'], playerStats['shortHandedShotsAgainst']].map(data => {
                    return (<td className="text-center">{data}</td>)
                });
                return (<>
                    <tr>
                        {playerStatsData}
                    </tr>
                </>);
            }
            return <></>;
        }));
    }

    getTables(tables) {
        return(Object.keys(tables).map(index => {
            var data = Object.keys(tables[index]['columns']).map(table => {
                return(<>
                    <div className="col-6">
                        <table className="table-sm table-dark table-hover center">
                            <thead>
                                <tr>
                                    {tables[index]['columns'][table]}
                                </tr>
                            </thead>
                            <tbody>
                                {tables[index]['data'][table]}
                            </tbody>
                        </table>
                    </div>
                </>)
            })

            return(<>
                <div className="row">
                    <div className="col-12">
                        <p className="text-center">
                            {tables[index]['title']}
                        </p>
                    </div>
                </div>
                <div className="row">
                    {data}
                </div>
            </>)
        }));
    }

    render() {
        return (<div className="row" style={{padding:"0px 0px 10% 0px"}}>
                    {this.getGameTables()}
                </div>)
    }
}

export default GameInfoTable;
