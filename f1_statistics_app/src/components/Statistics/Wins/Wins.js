import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap'

export class Wins extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"10px"}}>
                <a href="/wins/drivers">
                <Card style={{height:"250px", marginBottom:"15px"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold", height:"50px"}}>Lenktynininkų laimėjimai</Card.Title>
                        <Card.Text>
                            Atvaizduojami lenktynininkai, kurie yra laimėję bent vieną kartą, ir jų laimėtų lenktynių skaičius.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/driverspercent">
                <Card style={{height:"250px", marginBottom:"15px"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold", height:"50px"}}>Lenktynininkų laimėjimų procentas</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kokią dalį lenktynių yra laimėjęs lenktynininkas. Lenktynininko laimėtų lenktynių skaičius yra padalinamas iš jo startuotų lenktynių skaičiaus.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/constructors">
                <Card style={{height:"250px", marginBottom:"15px"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold", height:"50px"}}>Komandų laimėjimai</Card.Title>
                        <Card.Text>
                            Atvaizduojamos komandos, kurios yra laimėjusios bent vieną kartą, ir jų laimėtų lenktynių skaičius.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/constructorspercent">
                <Card style={{height:"250px", marginBottom:"15px"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold", height:"50px"}}>Komandų laimėjimų procentas</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kokią dalį lenktynių yra laimėjusi komanda. Komandos laimėtų lenktynių skaičius yra padalinamas iš jos startuotų lenktynių skaičiaus.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/driversunique">
                <Card style={{height:"250px", marginBottom:"15px"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold", height:"50px"}}>Skirtingų lenktynininkų, laimėjusių lenktynes, skaičius</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek skirtingų lenktynininkų yra laimėję lenktynes tam tikrą sezoną.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/constructorsunique">
                <Card style={{height:"250px", marginBottom:"15px"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold", height:"50px"}}>Skirtingų komandų, laimėjusių lenktynes, skaičius</Card.Title>
                        <Card.Text>
                            Atvaizduojama, kiek skirtingų komandų yra laimėjusios lenktynes tam tikrą sezoną.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <a href="/wins/driversbytrack">
                <Card style={{height:"250px", marginBottom:"15px"}}>
                    <Card.Body>
                        <Card.Title style={{fontWeight:"bold", height:"50px"}}>Lenktynininkų laimėjimai pagal lenktynių trasą</Card.Title>
                        <Card.Text>
                            Atvaizduojami lenktynininkų laimėjimų kartai tam tikroje lenktynių trasoje. Įtraukiami tik tie lenktynininkai, kurie yra laimėję bent kartą toje trasoje.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
            </CardDeck>
        );
    }
}