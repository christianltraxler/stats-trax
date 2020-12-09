import React from 'react';
//import { Link } from 'react-router-dom';
import './index.css';

//import * as ROUTES from '../../constants/routes';

function TeamsDropdown(props){
    

    return (<div className="row">
                <div className="col">
                    <a className="dropdown-item text-center" display="inline" href="/">Atlantic</a>
                    <div className="dropdown-divider"></div>
                </div>
                <div className="col">
                    <a className="dropdown-item text-center"  display="inline"href="/">Metropolitan</a>
                    <div className="dropdown-divider"></div>
                </div>
                <div className="col">
                    <a className="dropdown-item text-center" display="inline" href="/">Central</a>
                    <div className="dropdown-divider"></div>
                </div>
                <div className="col">
                    <a className="dropdown-item text-center" display="inline" href="/">Pacific</a>
                    <div className="dropdown-divider"></div>
                </div>
            </div>)
}

export default TeamsDropdown;