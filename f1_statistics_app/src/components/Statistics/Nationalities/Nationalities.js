import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap'

export class Nationalities extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck className="flex-container">
                <a href="/nationalities/drivers" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų pilietybės</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek kokios pilietybės lenktynininkų yra dalyvavę lenktynėse.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/nationalities/racewinners" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynes laimėjusių lenktynininkų pilietybės</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek lenktynių yra laimėta kokios pilietybės.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/nationalities/seasonwinners" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Čempionatą laimėjusių lenktynininkų pilietybės</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek čempionatų yra laimėta kokios pilietybės.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
        </CardDeck>
        );
    }
}