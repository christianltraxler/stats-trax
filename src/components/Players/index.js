//import { data } from 'jquery';
import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import "./index.css";


import {
    getPlayersData
} from '../../functions';
import AtoZLinks from './AtoZLinks';

class PlayersPage extends Component {

    constructor(props)
    {
        super(props);
        this.state={ 
            players: [],
            isActive: "A"
        };
    }

    componentDidMount() {
        getPlayersData("startsWidth=A").then(data => { 
            this.setState({players: data}); 
        });
    }

    render() {
        return (<div style={{height: "100%"}}>
                    <div className="row" style={{height: "100px"}}> 
                        <h1 className="players-title"> Player Directory </h1>
                    </div>
                    <div className="row">
                        <hr className="solid" ></hr>
                        <AtoZLinks/>
                    </div>

                </div>)
    }
}

export default PlayersPage;