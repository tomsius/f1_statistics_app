import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap'

export class Points extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck className="flex-container">
                <a href="/points/drivers" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų pelnyti taškai</Card.Title>
                        <Card.Text>
                            Atvaizduojami lenktynininkų pelnyti taškai per sezoną. Skritulinėje diagramoje atvaizduoajmas lenktynininkų pelnytų taškų procentas tame sezone.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/points/constructors" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Komandų pelnyti taškai</Card.Title>
                        <Card.Text>
                            Atvaizduojami komandų pelnyti taškai per sezoną. Skritulinėje diagramoje atvaizduoajmas komandų pelnytų taškų procentas tame sezone.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/points/winnerdrivers" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Čempionatą laimėjusių lenktynininkų taškai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek taškų pelnė lenktynininkas, laimėjęs čempionatą, kiekvieną sezoną.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/points/winnerconstructors" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Čempionatą laimėjusių komandų taškai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek taškų pelnė komanda, laimėjusi čempionatą, kiekvieną sezoną.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/points/driverpointschanges" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų taškų pokyčiai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kaip kito kiekvieno lenktynininko pelnyti taškai po kiekvienų lenktynių. Paspaudus ant lenktynininko vardo legendoje, galima paslėpti jo duomenis.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/points/constructorpointschanges" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Komandų taškų pokyčiai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kaip kito kiekvienos komandos pelnyti taškai po kiekvienų lenktynių. Paspaudus ant komandos pavadinimo legendoje, galima paslėpti jos duomenis.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
        </CardDeck>
        );
    }
}