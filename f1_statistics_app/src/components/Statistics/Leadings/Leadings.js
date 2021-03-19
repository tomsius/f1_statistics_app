import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap'

export class Leadings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck className="flex-container">
                <a href="/leadings/drivers" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų pirmavimai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek ratų koks lenktynininkas pirmavo. Pirmavimas - tai rato apvažiavimas pirmoje pozicijoje.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/leadings/constructors" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Komandų pirmavimai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek ratų kokia komanda pirmavo. Pirmavimas - tai rato apvažiavimas pirmoje pozicijoje.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
        </CardDeck>
        );
    }
}