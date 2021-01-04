
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    getPlayersDataByIds
} from '../../functions';

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

    componentDidUpdate = async () => {
        // If this.props.team is not undefined 
        if (Object.keys(this.props.team).length !== 0) {
            // Get the players in form of string (comma separated)
            var rosterPlayerIds = [...Object.keys(this.props.team['roster'][this.state.tableSeason])].join();
            // Get the roster data
            await getPlayersDataByIds(rosterPlayerIds).then(data => {
                if (this.state.roster !== data) {
                    this.setState({ roster: data })
                }
            });
        }
    }

    getTeamRosterTable = () => {
        // If this.state.roster has been set
        if (this.state.roster !== undefined) {
            var playerList = [];
            var players = this.state.roster;
            // Iterate through the players
            for (var playerId in players) {
                // Add the player info to the array
                playerList.push(<>
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
            }
            // Return the array of jsx elements for the players info array 
            return playerList;
        }   
        // Return nothing if this.state.players has not been set
        return; 
    };

    getYears = (type) => {
        // Get the table type based on the type specified
        // roster => R, schedule => S, teamStats => T
        var tableType = type.slice(0,1).toUpperCase();

        // Continue if this.state.team is defined
        if (this.props.team !== undefined) {
            // Initialize years array (html buttons)
            var years = []
            // Cycle through the years 
            for (var year in this.props.team[type]) {
                // Add each year to the array of years
                years.push(<>
                    <button className="dropdown-item text-center" onClick={e => this.setTeamInfoTable(e.target.value)} key={year} value={tableType + year}>{year.slice(0,4) + "-" + year.slice(4,8)}</button>
                </>);
            }
            // Return years
            return years;
        }
    }

    setTeamInfoTable = (value) => {
        // Based on the button clicked, set the tableType and tableSeason
        this.setState({ 
            tableType: value.slice(0,1),
            tableSeason: value.slice(1,9)
         });
    }

    getTeamStatsTable = (season) => {
        // If this.props.team is defined
        if (this.props.team !== undefined) {
            var team = this.props.team['teamStats'][season]['numbers'];
            return (<>
                <tr>
                    <td className="text-center">{team['gamesPlayed']}</td>
                    <td className="text-center">{team['wins']}</td>
                    <td className="text-center">{team['losses']}</td>
                    <td className="text-center">{team['ot']}</td>
                    <td className="text-center">{team['pts'] + " (" + team['ptPctg'] + ")"}</td>
                    <td className="text-center">{team['goalsPerGame']}</td>
                    <td className="text-center">{team['goalsAgainstPerGame']}</td>
                    <td className="text-center">{team['evGGARatio']}</td>
                    <td className="text-center">{team['powerPlayGoals'] + " (" + team['powerPlayPercentage'] + ")"}</td>
                    <td className="text-center">{team['powerPlayGoalsAgainst'] + " (" + team['penaltyKillPercentage'] + ")"}</td>
                    <td className="text-center">{team['shotsPerGame']}</td>
                    <td className="text-center">{team['shotsAllowed']}</td>
                    <td className="text-center">{team['winScoreFirst']}</td>
                    <td className="text-center">{team['winOppScoreFirst']}</td>
                    <td className="text-center">{team['winLeadFirstPer']}</td>
                    <td className="text-center">{team['winLeadSecondPer']}</td>
                    <td className="text-center">{team['winOutshootOpp']}</td>
                    <td className="text-center">{team['winOutshotByOpp']}</td>
                    <td className="text-center">{team['faceOffsWon'] + " (" + team['faceOffWinPercentage'] + ")"}</td>
                    <td className="text-center">{team['faceOffsTaken']}</td>
                    <td className="text-center">{team['shootingPctg']}</td>
                    <td className="text-center">{team['savePctg']}</td>
                </tr>
            </>);
        }
    } 

    getTeamInfoTable = () => {
        // If the tableType = R (roster table is chosen)
        if (this.state.tableType === "R") {
            return (<>
                <table className="table-sm table-dark table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">Number</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Position</th>
                            <th className="text-center">Shoots/Catches</th>
                            <th className="text-center">Height</th>
                            <th className="text-center">Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTeamRosterTable()}
                    </tbody>
                </table>
            </>);
        
        } 
        // If the tableType = S (schedule table is chosen)
        // Schedule info needs to be added to MongoDB + API
        else if (this.state.tableType === "S") {
        
        } 
        // If the tableType = T (team stats table is chosen)
        else if (this.state.tableType === "T") {
            return (<>
                <table className="table-sm table-dark table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">GP</th>
                            <th className="text-center">W</th>
                            <th className="text-center">L</th>
                            <th className="text-center">OT</th>
                            <th className="text-center">PTS (%)</th>
                            <th className="text-center">GF/G</th>
                            <th className="text-center">GA/G</th>
                            <th className="text-center">evGRate</th>
                            <th className="text-center">PP (%)</th>
                            <th className="text-center">PK (%)</th>
                            <th className="text-center">ShF/G</th>
                            <th className="text-center">ShA/G</th>
                            <th className="text-center">W% 1stGF</th>
                            <th className="text-center">W% 1stGA</th>
                            <th className="text-center">W% Lead1st</th>
                            <th className="text-center">W% Lead2nd</th>
                            <th className="text-center">W% MoreShots</th>
                            <th className="text-center">W% LessShots</th>
                            <th className="text-center">FOW (%)</th>
                            <th className="text-center">Total FO</th>
                            <th className="text-center">Shot%</th>
                            <th className="text-center">Save%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTeamStatsTable(this.state.tableSeason)}
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
                    {this.getTeamInfoTable()}
                </div>)
    }
}

export default TeamInfoTable;
