import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex flex-column" style={{ marginTop: "100px" }}>
                <footer className="footer">
                    <hr />
                    <div>
                        <span>F-1 lenktynių rezultatų portalas {new Date().getFullYear()}</span>
                        <br />
                        <span>Tomas Kašelynas <a href="https://github.com/tomsius" target="_blank"><span className="fa" style={{ fontSize: "24px" }}>&#xf09b;</span></a></span>
                        <br />
                        <span><a href="mailto:tomas.kaselynas@ktu.edu"><i>tomas.kaselynas@ktu.edu</i></a></span>
                    </div>
                    <div className="ml-auto">
                        <a href="https://github.com/tomsius/racing4you" target="_blank">Back-end</a> | <a href="https://github.com/tomsius/racing4you_app" target="_blank">Front-end</a>
                    </div>
                </footer>
            </div>
        );
    }
}
