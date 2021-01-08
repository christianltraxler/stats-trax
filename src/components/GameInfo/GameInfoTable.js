import React, {Component} from 'react';

class GameInfoTable extends Component {

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
                                <li className="nav-item active">
                                    <button className="nav-link" value="P" onClick={e => this.setTableType(e.target.value)}>Player Stats</button> 
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
                    
                </div>)
    }
}

export default GameInfoTable;
