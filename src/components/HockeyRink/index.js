import React, {Component} from 'react';
import './index.css';
import NavBar from '../NavBar';

export default class HockeyRink extends Component {

/*
constructor(props) {
    super(props)
    }
*/

/*
TODO:
Add calculation for top-crease height based on width (width/2)
13.25, 25.75
22.472 + 8px, 23.529 + 8px
*/ 
render() {
    return (<div className="container">
                <NavBar/>
                <div className="container-row">
                    <div className="top-layer">
                        <div className="transparent-background">
                            {this.props.children}
                        </div>
                    </div>
                    <div className="background-layer">
                        <div>
                            <div className="top-crease" ></div> 
                            <div className="bottom-crease"></div>
                        </div>
                        <div className="grid-container">
                            <div className="item1">
                                <div className="faceoff-dot" style={{top:"30%"}}></div>
                                <div className="faceoff-circle" style={{top: "4%"}}></div>
                            </div>
                            <div className="item2">
                                <div className="faceoff-dot" style={{top:"30%"}}></div>
                                
                            <div className="faceoff-circle" style={{top: "4%"}}></div>
                            </div>

                            <div className="item3"> 
                                <div className="faceoff-dot" style={{top:"0%"}}></div>
                                <div className="faceoff-dot" style={{bottom:"0%"}}></div>
                            </div>
                            <div className="item4">
                                <div className="faceoff-dot" style={{top:"0%"}}></div>
                                <div className="faceoff-dot" style={{bottom:"0%"}}></div>
                            </div>
                            <div className="item5">
                                <div className="faceoff-dot" style={{bottom:"30%"}}></div>
                                <div className="faceoff-circle" style={{bottom: "4%"}}></div>
                            </div>
                            <div className="item6">
                                <div className="faceoff-dot" style={{bottom:"30%"}}></div>
                                <div className="faceoff-circle" style={{bottom: "4%"}}></div>
                            </div>
                        </div>
                        <div>
                            <hr className="horizontal-line" style={{backgroundColor: "#4495EE", top: "36%"}}></hr>
                            <hr className="horizontal-line" style={{backgroundColor: "#D64C4A", top: "calc(50% - 1.75%)"}}></hr> 
                            <hr className="horizontal-line" style={{backgroundColor: "#4495EE", bottom: "36%"}}></hr>
                        </div>            
                    </div>
                    <NavBar/>
                </div>
            </div>)
    }
}