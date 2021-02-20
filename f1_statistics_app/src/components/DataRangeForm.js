import React, { Component } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

export class DataRangeForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmitByDate = this.handleSubmitByDate.bind(this);
        this.handleSubmitBySeason = this.handleSubmitBySeason.bind(this);
    }

    handleSubmitByDate(event) {
        event.preventDefault();
        console.log(event.target.From.value);
        console.log(event.target.To.value);
        var temp=[event.target.From.value, event.target.To.value];
        //this.props.callback(temp);

        fetch('http://localhost:55032/api/' + this.props.api, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'yearFrom': event.target.From.value,
                    'yearTo': event.target.To.value,
                    'season': 0
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            });
    }

    handleSubmitBySeason(event) {
        event.preventDefault();
        console.log(event.target.Season.value);
        console.log(this.props.api);
        var temp=[event.target.Season.value];
        //this.props.callback(temp);

        fetch('http://localhost:55032/api/' + this.props.api, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'yearFrom': 0,
                    'yearTo': 0,
                    'season': event.target.Season.value
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            });
    }

    render() {
        return (

            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmitByDate}>
                            <Form.Group controlId="From">
                                <Form.Label>Nuo</Form.Label>
                                <Form.Control type="number" min={1950} max={new Date().getFullYear()} name="From" required placeholder="Nuo..." />
                            </Form.Group>
                            <Form.Group controlId="To">
                                <Form.Label>Iki</Form.Label>
                                <Form.Control type="number" min={1950} max={new Date().getFullYear()} name="To" required placeholder="Iki..." />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Rodyti statistiką pagal metus
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmitBySeason}>
                            <Form.Group controlId="Season">
                                <Form.Label>Sezonas</Form.Label>
                                <Form.Control type="number" min={1950} max={new Date().getFullYear()} name="Season" required placeholder="Sezonas..." />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Rodyti statistiką pagal sezoną
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}