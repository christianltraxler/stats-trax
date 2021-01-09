import React, {Component} from 'react';
import './index.css'
import GameInfoTable from '../GameInfoTable'

class GameInfo extends Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            tableType: "L"
        };
    }

    setTableType(value) {
        this.setState({ tableType: value });
    }

    render() {
        return (<div className="row" style={{padding:"0% 2.5% 0% 2.5%"}}>
                    <nav className="navbar navbar-expand-sm navbar-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <button className="nav-link" value="L" onClick={e => this.setTableType(e.target.value)}>Lineups</button> 
                                </li>
                                <li className="nav-item dropdown active" style={{backgroundColor: "#D64C4A"}}>
                                    <a className="nav-link disabled" href="/" id="navbarDropdownMenuLink" aria-expanded="false">Player Stats</a> 
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <button className="nav-link text-center active" value="PG" onClick={e => this.setTableType(e.target.value)}>General</button> 
                                        <button className="nav-link text-center active" value="PS" onClick={e => this.setTableType(e.target.value)}>Strength</button> 
                                        <button className="nav-link text-center active" value="PA" onClick={e => this.setTableType(e.target.value)}>Away</button> 
                                        <button className="nav-link text-center active" value="PH" onClick={e => this.setTableType(e.target.value)}>Home</button> 
                                    </div>
                                </li>
                                <li className="nav-item active">
                                    <button className="nav-link" value="T" onClick={e => this.setTableType(e.target.value)}>Team Stats</button> 
                                </li>
                                <li className="nav-item active">
                                    <button className="nav-link" value="G" onClick={e => this.setTableType(e.target.value)}>Game Summary</button> 
                                </li>
                                <li className="nav-item active" >
                                    <button className="nav-link" value="S" onClick={e => this.setTableType(e.target.value)}>Shot Charts</button> 
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <GameInfoTable dataType={this.state.tableType} gameInfo={this.props.gameInfo} gameData={this.props.gameData}/>
                </div>)
    }
}

export default GameInfo;
