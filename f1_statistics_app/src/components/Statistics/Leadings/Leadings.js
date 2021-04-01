import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Leadings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck className="flex-container">
                <Link to="/leadings/drivers" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Lenktynininkų pirmavimai</Card.Title>
                            <Card.Text>
                                Atvaizduojama, kiek ratų koks lenktynininkas pirmavo. Pirmavimas - tai rato apvažiavimas pirmoje pozicijoje.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/leadings/constructors" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Komandų pirmavimai</Card.Title>
                            <Card.Text>
                                Atvaizduojama, kiek ratų kokia komanda pirmavo. Pirmavimas - tai rato apvažiavimas pirmoje pozicijoje.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </CardDeck>
        );
    }
}