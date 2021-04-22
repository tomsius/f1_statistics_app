import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class FastestLaps extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck className="flex-container">
                <Link to="/fastestlaps/drivers" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Greičiausiai lenktynių ratą apvažiavę lenktynininkai</Card.Title>
                            <Card.Text>
                                Atvaizduojami lenktynininkai, kurie yra greičiausiai apvažiavę lenktynių ratą bent vieną kartą, ir jų greičiausiai apvažiuotų ratų skaičius. Imamas visų lenktynių greičiausias ratas.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/fastestlaps/constructors" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Greičiausiai lenktynių ratą apvažiavusios komandos</Card.Title>
                            <Card.Text>
                                Atvaizduojamos komandos, kurių lenktynininkai yra greičiausiai apvažiavę lenktynių ratą bent vieną kartą, ir jų greičiausiai apvažiuotų ratų skaičius. Imamas visų lenktynių greičiausias ratas.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/fastestlaps/driversunique" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Skirtingų lenktynininkų, greičiausiai apvažiavusių ratą, skaičius</Card.Title>
                            <Card.Text>
                                Atvaizduojama, kiek skirtingų lenktynininkų yra greičiausiai apvažiavę lenktynių ratą tam tikrą sezoną. Užvedus ant grafiko, galima pamatyti lenktynininkus, kurie greičiausiai apvažiavo ratą.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/fastestlaps/constructorsunique" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Skirtingų komandų, greičiausiai apvažiavusių ratą, skaičius</Card.Title>
                            <Card.Text>
                                Atvaizduojama, kiek skirtingų komandų lenktynininkų yra greičiausiai apvažiavę lenktynių ratą tam tikrą sezoną. Užvedus ant grafiko, galima pamatyti komandas, kurios lenktynininkai greičiausiai apvažiavo ratą.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </CardDeck>
        );
    }
}