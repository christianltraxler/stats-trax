//import { data } from 'jquery';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../Spinner';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { teams: state.teams };
};

class GamesPageComponent extends Component {

    
    render() {
        if (true) {
            return (<div style={{padding:"5% 5%"}}>
                        <div className="row" style={{height: "200px"}}></div>
                        <div className="row">
                            <Spinner/>
                        </div>
                        <Link className="nav-link" to="/games/2019020001">Players</Link>
                    </div>);
        } 
    }
}

const GamesPage = connect(mapStateToProps)(GamesPageComponent);
export default GamesPage;