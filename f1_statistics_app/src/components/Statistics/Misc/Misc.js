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
                <a href="/misc/frontrows" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Komandų „Front Rows“</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek kokia komanda kvalifikacijoje užėmė „front row“. „Front row“ - tai 1-2 vietos kvalifikacijoje.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/misc/driverpositionsinrace" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų finišavimo pozicijos</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek kartų koks lenktynininkas finišavo tam tikroje pozicijoje.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/misc/driverstandingschanges" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų čempionato pozicijų pokyčiai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kaip kito kiekvieno lenktynininko pozicija lenktynininkų čempionato lentelėje po kiekvienų lenktynių. Paspaudus ant lenktynininko vardo legendoje, galima paslėpti jo duomenis.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/misc/constructorstandingschanges" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Komandų čempionato pozicijų pokyčiai</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kaip kito kiekvienos komandos pozicija komandų čempionato lentelėje po kiekvienų lenktynių. Paspaudus ant komandos pavadinimo legendoje, galima paslėpti jos duomenis.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/misc/racepositionschanges" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex", height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų pozicijų pokyčiai lenktynių metu</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kaip kito kiekvieno lenktynininko pozicija lenktynių metu. Paspaudus ant lenktynininko vardo legendoje, galima paslėpti jo duomenis.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
        </CardDeck>
        );
    }
}