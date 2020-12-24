//import { data } from 'jquery';
import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import "./AtoZLinks.css";

class AtoZLinks extends Component {

    constructor(props)
    {
        super(props);
        this.state={ 
            isActive: ""
        };
    }

    updateActive = (value) => {
        this.setState({isActive: value});
    }

    getLetterLinks = () => {
        var letterLinks = [];
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        for (var letter in alphabet) {
            letterLinks.push(<>
                <input className={`btn btn-primary mr-2 ${this.state.isActive === alphabet[letter] ? "active" : ""}`} value={alphabet[letter]} id={alphabet[letter]} 
                    onClick={e => this.updateActive(e.target.value)} type="Button"  readOnly={true}/>
            </>);
        }
        return letterLinks;
    }

    render() {
        return (<div className="col text-center" role="toolbar" aria-label="Letter Links Toolbar">
                    {this.getLetterLinks()}
                </div>)
    }
}

export default AtoZLinks;