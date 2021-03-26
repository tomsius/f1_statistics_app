import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex flex-column" style={{marginTop: "100px"}}>
                <footer className="footer">
                    <hr />
                    <div>
                        <span>Tomas Kašelynas <a href="https://github.com/tomsius" target="_blank"><i className="fa" style={{fontSize: "24px"}}>&#xf09b;</i></a></span>
                        <br />
                        <span>Lenktynių rezultatų portalas {new Date().getFullYear()}</span>
                    </div>
                    <div className="ml-auto">
                        <a href="https://github.com/tomsius/f1_statistics" target="_blank">Back-end</a> | <a href="https://github.com/tomsius/f1_statistics_app" target="_blank">Front-end</a>
                    </div>
                </footer>
            </div>
        );
    }
}
