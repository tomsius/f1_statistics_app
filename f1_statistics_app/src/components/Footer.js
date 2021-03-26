import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="d-flex flex-column" style={{marginTop: "100px"}}>
                <footer class="footer">
                    <hr />
                    <div>
                        <span>Tomas Kašelynas <a href="https://github.com/tomsius" target="_blank"><i class="fa" style={{fontSize: "24px"}}>&#xf09b;</i></a></span>
                        <br />
                        <span>Lenktynių rezultatų portalas {new Date().getFullYear()}</span>
                    </div>
                    <div class="ml-auto">
                        <a href="https://github.com/tomsius/f1_statistics" target="_blank">Back-end</a> | <a href="https://github.com/tomsius/f1_statistics_app" target="_blank">Front-end</a>
                    </div>
                </footer>
            </div>
        );
    }
}
