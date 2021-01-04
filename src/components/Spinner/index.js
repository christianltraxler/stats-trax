import React, {Component} from 'react';

export default class Spinner extends Component {

render() {
    return (<div className="text-center">
                <div className="spinner-border" role="status" style={{height: "150px", width:"150px"}}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>)
    }
}