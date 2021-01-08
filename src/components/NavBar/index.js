import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import TeamsDropdown from "./TeamsDropdown.js";

import * as ROUTES from '../../constants/routes';

export default class NavBar extends Component {

render() {
    return (<nav className="navbar navbar-expand-lg navbar-light sticky-top">
                <Link className="navbar-brand active" href="" style={{color:"black", fontSize: "24px", paddingLeft: "15px", paddingRight: "15px"}} to={ROUTES.DEFAULT}>Stats Trax</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown position-static active" style={{backgroundColor: "#D64C4A"}}>
                            <Link className="nav-link" to={ROUTES.TEAMS} id="navbarDropdownMenuLink" aria-expanded="false">Teams</Link> 
                            <div className="dropdown-menu w-80" aria-labelledby="navbarDropdownMenuLink">
                                <TeamsDropdown/>
                            </div>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to={ROUTES.PLAYERS}>Players</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to={ROUTES.GAMES}>Games</Link>
                        </li>
                    </ul>
                </div>
            </nav>)
    }
}