import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap'

export class Misc extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck className="flex-container">
                <a href="/misc/racecount" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynių skaičius</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek buvo lenktynių tam tikrame sezone.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/misc/hattricks" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>„Hat Tricks“</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek kartų koks lenktynininkas pelnė „hat trick“. „Hat trick“ yra pelnamas tada, kai lenktynininkas kvalifikacijoje buvo pirmas, greičiausiai apvažiavo lenktynių ratą ir laimėjo lenktynes.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/misc/grandslams" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>„Grand Slams“</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek kartų koks lenktynininkas pelnė „grand slam“. „Grand slam“ yra pelnamas tada, kai lenktynininkas kvalifikacijoje buvo pirmas, greičiausiai apvažiavo lenktynių ratą, laimėjo lenktynes ir pirmavo visus ratus.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/misc/dnfs" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Nebaigę lenktynių</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek kartų koks lenktynininkas nebaigė lenktynių.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/misc/positiondifferences" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Pozicijų pokytis</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek pozicijų koks lenktynininkas pelnė viso sezono metu. Iš lenktynininko starto pozicijos atimama jo finišavimo pozicija. Jei pokytis teigiamas, tai lenktynininkas finišavo aukštesnėje pozicijoje nei startavo. Jei pokytis neigiamas, tai lenktynininkas prarado daugiau pozicijų nei jų pelnė per lenktynes viso sezono metu.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
        </CardDeck>
        );
    }
}