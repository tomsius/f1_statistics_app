import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap'

export class Podiums extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck className="flex-container">
                <a href="/podiums/drivers" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų podiumai</Card.Title>
                        <Card.Text>
                            Atvaizduojamas lenktynininkų finišavimo ant podiumo (1-3 vietos) skaičius.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/podiums/constructors" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Komandų podiumai</Card.Title>
                        <Card.Text>
                            Atvaizduojamas komandų finišavimo ant podiumo (1-3 vietos) skaičius.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/podiums/driversthree" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų trejetukai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek kartų koks lenktynininkų trejetukas finišavo ant podiumo (1-3 vietos). Lenktynininkų vietos ant podiumo gali skirtis.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/podiums/constructorsthree" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Komandų trejetukai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek kartų koks komandų trejetukas finišavo ant podiumo (1-3 vietos). Komandų vietos ant podiumo gali skirtis.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
        </CardDeck>
        );
    }
}