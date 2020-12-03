import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import * as ROUTES from '../../constants/routes';

export default class NavBar extends Component {

constructor(props) {
    super(props)
    }

render() {
    return (
    <nav className="navbar navbar-expand-sm navbar-light" style={{height:"1px"}}>
                <div className="navbar-header">
                    <Link className="active navbar-brand" href="" style={{color:"black", fontSize: "24px", paddingLeft: "15px"}} to={ROUTES.DEFAULT}>Stats Trax</Link>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                      <Link className="nav-link" to={ROUTES.TEAMS}>Teams</Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link" to={ROUTES.PLAYERS}>Players</Link>
                    </li>
                </ul>
            </nav>)
    }
}