import React, { Component } from 'react';
import { Card, CardDeck, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Poles extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            <h1>„Pole“ pozicijų statistikos</h1>
            <CardDeck className="flex-container">
                <Link to="/poles/drivers" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Lenktynininkų „pole“ pozicijos</Card.Title>
                            <Card.Text>
                                Atvaizduojami lenktynininkai, kurie yra laimėję „pole“ poziciją (kvalifikacijoje buvo greičiausias) bent vieną kartą, ir jų „pole“ pozicijų skaičius.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/poles/constructors" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Komandų „pole“ pozicijos</Card.Title>
                            <Card.Text>
                                Atvaizduojamos komandos, kurios yra laimėję „pole“ poziciją (kvalifikacijoje komandos lenktynininkas buvo greičiausias) bent vieną kartą, ir jų „pole“ pozicijų skaičius.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/poles/driversunique" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Skirtingų lenktynininkų, laimėjusių „pole“ poziciją, skaičius</Card.Title>
                            <Card.Text>
                                Atvaizduojama, kiek skirtingų lenktynininkų yra laimėję „pole“ poziciją (kvalifikacijoje buvo greičiausi) tam tikrą sezoną. Užvedus ant grafiko, galima pamatyti lenktynininkus, kurie laimėjo „pole“ poziciją.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/poles/constructorsunique" style={{ marginBottom: "15px" }}>
                    <Card style={{ display: "flex", height: "100%" }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "bold" }}>Skirtingų komandų, laimėjusių „pole“ poziciją, skaičius</Card.Title>
                            <Card.Text>
                                Atvaizduojama, kiek skirtingų komandų yra laimėjusios „pole“ poziciją (kvalifikacijoje komandos lenktynininkas buvo greičiausias) tam tikrą sezoną. Užvedus ant grafiko, galima pamatyti komandas, kurios laimėjo „pole“ poziciją.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </CardDeck>
            </>
        );
    }
}