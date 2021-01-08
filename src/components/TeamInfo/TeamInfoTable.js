import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { getPlayersDataByIds } from '../../functions';
import './TeamInfoTable.css'

class TeamInfoTable extends Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            tableType: "R",
            tableSeason: "20202021",
            roster: {}
        };
    }

    componentDidMount = async () => {
        // If this.props.team is not undefined 
        if (Object.keys(this.props.team).length !== 0) {
            // Get the players in form of string (comma separated)
            var rosterPlayerIds = Object.keys(this.props.team['roster']).map(year => {
                return ([...Object.keys(this.props.team['roster'][year])])
            })
            await getPlayersDataByIds(rosterPlayerIds.join()).then(data => {
                if (this.state.roster !== data) {
                    this.setState({roster: data})
                }
            });
        }
    }

    getTeamRosterData = () => { 
        // If this.state.roster has been set
        if (this.state.roster !== undefined && Object.keys(this.state.roster).length !== 0) {
            var forwards = this.state.roster.filter(player => player['id'] in this.props.team['roster'][this.state.tableSeason] && player['primaryPosition']['type'] === "Forward");
            var defense = this.state.roster.filter(player => player['id'] in this.props.team['roster'][this.state.tableSeason] && player['primaryPosition']['type'] === "Defenseman");
            var goalies = this.state.roster.filter(player => player['id'] in this.props.team['roster'][this.state.tableSeason] && player['primaryPosition']['type'] === "Goalie");
            var array = [this.getPlayerRow(forwards), this.getPlayerRow(defense), this.getPlayerRow(goalies)];
            return(array)
        }
    };

    getPlayerRow = (players) => {
        return(Object.keys(players).map(playerId => {
            return (<>
                        <tr key={parseInt(playerId)}>
                            <td className="text-center">{players[playerId]['jerseyNumber']}</td>
                            <td>
                                <Link href="/" key={this.props.team['id']} to={'/players/' + players[playerId]['id']}>
                                    <img className="player-image" src={players[playerId]['picture']['link']} alt=""></img>
                                    {players[playerId]['name']['fullName']} 
                                </Link>
                            </td>
                            <td className="text-center">{players[playerId]['primaryPosition']['abbreviation']}</td>
                            <td className="text-center">{players[playerId]['shootsCatches']}</td>
                            <td className="text-center">{players[playerId]['height']}</td>
                            <td className="text-center">{players[playerId]['weight']}</td>
                        </tr>
                    </>);
            }))
    }

    getYears = (type) => {
        // Get the table type based on the type specified
        // roster => R, schedule => S, teamStats => T
        var tableType = type.slice(0,1).toUpperCase();

        // Continue if this.state.team is defined
        if (this.props.team !== undefined) {
            // Initialize years array (html buttons)
            var years = Object.keys(this.props.team[type]).map(year => {
                return (<>
                            <button className="dropdown-item text-center" 
                                    onClick={e => this.setTeamInfoTable(e.target.value)} 
                                    key={year + parseInt(type.slice(0,1))} 
                                    value={tableType + year}>
                                {year.slice(0,4) + "-" + year.slice(4,8)}
                            </button>
                        </>)
            });
            // Return years
            return years;
        }
    }

    setTeamInfoTable = (value) => {
        // Get the players in form of string (comma separated)
        var rosterPlayerIds = [...Object.keys(this.props.team['roster'][value.slice(1,9)])].join();
        // Get the roster data
        getPlayersDataByIds(rosterPlayerIds).then(data => {
            this.setState({ 
                roster: data,
                tableType: value.slice(0,1),
                tableSeason: value.slice(1,9) 
            })
        });
    }

    getTeamStatsData = (season) => {
        // If this.props.team is defined
        if (this.props.team !== undefined) {
            var team = this.props.team['teamStats'][season]['numbers'];
            var teamStatsData = [team['gamesPlayed'], team['wins'],  team['losses'], team['ot'], team['pts'] + " (" + team['ptPctg'] + ")", team['goalsPerGame'], team['goalsAgainstPerGame'], team['evGGARatio'], 
                                    team['powerPlayGoals'] + " (" + team['powerPlayPercentage'] + ")", team['powerPlayGoalsAgainst'] + " (" + team['penaltyKillPercentage'] + ")", 
                                    team['shotsPerGame'], team['shotsAllowed'],  team['faceOffsWon'] + " (" + team['faceOffWinPercentage'] + ")", team['faceOffsTaken'], 
                                    team['shootingPctg'], team['savePctg']].map(data => {
                return (<td className="text-center">{data}</td>)
            })
            var winPctgData = [team['winScoreFirst'], team['winOppScoreFirst'], team['winLeadFirstPer'], team['winLeadSecondPer'], team['winOutshootOpp'], team['winOutshotByOpp']].map(data => {
                return (<td className="text-center">{data}</td>)
            })
            return ([<>
                <tr>
                    {teamStatsData}
                </tr>
            </>,<>
                <tr>
                    {winPctgData}
                </tr>
            </>]);
        }
    } 

    getTeamInfoTables = () => {
        // If the tableType = R (roster table is chosen)
        if (this.state.tableType === "R") {
            var teamRosterColumns = ['Number', 'Name', 'Position', 'Shoots/Catches', 'Height', 'Weight'].map(column => {
                return (<th className="text-center">{column}</th>)
            })
            var rosterData = this.getTeamRosterData()
            if (rosterData !== undefined) {
                return (<>
                    <div className="row">
                        <div className="col-6">
                            <p className="text-center">Forwards</p>
                            <table className="table-sm table-dark table-hover center">
                                <thead>
                                    <tr>
                                        {teamRosterColumns}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rosterData[0]}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-6">
                            <p className="text-center">Defensemen</p>
                            <table className="table-sm table-dark table-hover center">
                                <thead>
                                    <tr>
                                        {teamRosterColumns}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rosterData[1]}
                                </tbody>
                            </table>
                            <p className="text-center">Goalies</p>
                            <table className="table-sm table-dark table-hover center">
                                <thead>
                                    <tr>
                                        {teamRosterColumns}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rosterData[2]}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>);
            }
        } 
        // If the tableType = S (schedule table is chosen)
        // Schedule info needs to be added to MongoDB + API
        else if (this.state.tableType === "S") {
        
        } 
        // If the tableType = T (team stats table is chosen)
        else if (this.state.tableType === "T") {
            var teamStatsColumns = ['GP', 'W', 'L', 'OT', 'PTS (%)', 'GF/G', 'GA/G', 'evGRate', 'PP (%)', 'PK (%)', 'ShF/G', 'ShA/G', 'FOW (%)', '# FO', 'Sh%', 'Sv%'].map(column => {
                return (<th className="text-center">{column}</th>)
            })
            var winPctgColumns = ['1stGF', '1stGA', 'Lead1st', 'Lead2nd', 'MoreShots', 'LessShots'].map(column => {
                return (<th className="text-center">{column}</th>)
            })
            return (<>
                <p className="text-center">Team Stats</p>
                <table className="table-sm table-dark table-hover center">
                    <thead>
                        <tr>
                            {teamStatsColumns}
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTeamStatsData(this.state.tableSeason)[0]}
                    </tbody>
                </table>
                <p className="text-center">Win Percentage When:</p>
                <table className="table-sm table-dark table-hover center">
                    <thead>
                        <tr>
                            {winPctgColumns}
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTeamStatsData(this.state.tableSeason)[1]}
                    </tbody>
                </table>
            </>);
        }
    }

    render() {
        return (<div>
                    <nav className="navbar navbar-expand-sm navbar-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown active" style={{backgroundColor: "#D64C4A"}}>
                                    <a className="nav-link disabled" href="/" id="navbarDropdownMenuLink" aria-expanded="false">Roster</a> 
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        {this.getYears("roster")}
                                    </div>
                                </li>
                                <li className="nav-item dropdown active" style={{backgroundColor: "#D64C4A"}}>
                                    <a className="nav-link disabled" href="/" id="navbarDropdownMenuLink" aria-expanded="false">Schedule</a> 
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <button className="dropdown-item text-center" href="">2020-2021</button>
                                    </div>
                                </li>
                                <li className="nav-item dropdown active" style={{backgroundColor: "#D64C4A"}}>
                                    <a className="nav-link disabled" href="/" id="navbarDropdownMenuLink" aria-expanded="false">Stats</a> 
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        {this.getYears("teamStats")}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {this.getTeamInfoTables()}
                </div>)
    }
}

export default TeamInfoTable;
