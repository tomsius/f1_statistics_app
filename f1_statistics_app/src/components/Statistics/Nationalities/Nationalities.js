import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Nationalities extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck className="flex-container">
                <Link to="/nationalities/drivers" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Lenktynininkų pilietybės</Card.Title>
                            <Card.Text>
                                Atvaizduojama, kiek kokios pilietybės lenktynininkų yra dalyvavę lenktynėse.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/nationalities/racewinners" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Lenktynes laimėjusių lenktynininkų pilietybės</Card.Title>
                            <Card.Text>
                                Atvaizduojama, kiek lenktynių yra laimėta kokios pilietybės.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/nationalities/seasonwinners" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Čempionatą laimėjusių lenktynininkų pilietybės</Card.Title>
                            <Card.Text>
                                Atvaizduojama, kiek čempionatų yra laimėta kokios pilietybės.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </CardDeck>
        );
    }
}