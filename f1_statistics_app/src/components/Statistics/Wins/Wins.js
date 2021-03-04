import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap'

export class Wins extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck className="flex-container">
                <a href="/wins/drivers" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex",height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų laimėjimai</Card.Title>
                        <Card.Text>
                            Atvaizduojami lenktynininkai, kurie yra laimėję bent vieną kartą, ir jų laimėtų lenktynių skaičius.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/driverspercent" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex",height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų laimėjimų procentas</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kokią dalį lenktynių yra laimėjęs lenktynininkas. Lenktynininko laimėtų lenktynių skaičius yra padalinamas iš jo startuotų lenktynių skaičiaus.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/constructors" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex",height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Komandų laimėjimai</Card.Title>
                        <Card.Text>
                            Atvaizduojamos komandos, kurios yra laimėjusios bent vieną kartą, ir jų laimėtų lenktynių skaičius.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/constructorspercent" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex",height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Komandų laimėjimų procentas</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kokią dalį lenktynių yra laimėjusi komanda. Komandos laimėtų lenktynių skaičius yra padalinamas iš jos startuotų lenktynių skaičiaus.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/driversunique" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex",height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Skirtingų lenktynininkų, laimėjusių lenktynes, skaičius</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek skirtingų lenktynininkų yra laimėję lenktynes tam tikrą sezoną.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/constructorsunique" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex",height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Skirtingų komandų, laimėjusių lenktynes, skaičius</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek skirtingų komandų yra laimėjusios lenktynes tam tikrą sezoną.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/driversbytrack" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex",height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynininkų laimėjimai pagal lenktynių trasą</Card.Title>
                        <Card.Text>
                            Atvaizduojami lenktynininkų laimėjimų kartai tam tikroje lenktynių trasoje. Įtraukiami tik tie lenktynininkai, kurie yra laimėję bent kartą toje trasoje.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/frompole" style={{marginBottom:"15px"}}>
                <Card style={{display:"flex",height:"100%"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold"}}>Lenktynių skaičius, kurios buvo laimėtos iš pole pozicijos</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek kartų buvo laimėta iš pole pozicijos. Užvedus ant grafiko, galima pamatyti lenktynininkus, kurie laimėjo iš pole pozicijos.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
        </CardDeck>
        );
    }
}