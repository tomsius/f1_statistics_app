import React, { Component } from 'react';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <br />
                <h2>Lenktynių rezultatų portalas</h2>
                <h4>Bakalaurinis darbas</h4>
                <br />
                <p>
                    Bakalaurinio darbo tikslas - agreguoti įvairias „Formula 1“ statistikas ir pateikti jas vizualiai.
                    <br />
                    <b style={{ color:"red" }}>Papildyti naudotų technologijų informacija</b>
                </p>
            </div>
        );
    }
}