import React, { Component } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export class DataRangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.handleSubmitByDate = this.handleSubmitByDate.bind(this);
        this.handleSubmitBySeason = this.handleSubmitBySeason.bind(this);
    }

    handleSubmitByDate(event) {
        event.preventDefault();

        this.setState({
            isLoading: true
        });

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
                this.setState({
                    isLoading: false
                });
                this.props.callback(result);
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                });

                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "positionClass": "toast-bottom-full-width",
                    "preventDuplicates": true,
                    "hideDuration": "1000",
                    "timeOut": "3000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr["error"]("", "Nepavyko pasiekti serverio");
            });
    }

    handleSubmitBySeason(event) {
        event.preventDefault();

        this.setState({
            isLoading: true
        });

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
                this.setState({
                    isLoading: false
                });
                this.props.callback(result);
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                });

                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "positionClass": "toast-bottom-full-width",
                    "preventDuplicates": true,
                    "hideDuration": "1000",
                    "timeOut": "3000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr["error"]("", "Nepavyko pasiekti serverio");
            });
    }

    render() {
        return (

            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={4}>
                        <Form onSubmit={this.handleSubmitByDate}>
                            <Form.Group controlId="From">
                                <Form.Label>Nuo</Form.Label>
                                <Form.Control type="number" min={1950} max={new Date().getFullYear()} name="From" required placeholder="Nuo..." defaultValue="2014" />
                            </Form.Group>
                            <Form.Group controlId="To">
                                <Form.Label>Iki</Form.Label>
                                <Form.Control type="number" min={1950} max={new Date().getFullYear()} name="To" required placeholder="Iki..." defaultValue="2020" />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit" disabled={this.state.isLoading}>
                                    {this.state.isLoading ? "Palaukite..." : "Rodyti pagal metus"}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={4}>
                        <Form onSubmit={this.handleSubmitBySeason}>
                            <Form.Group controlId="Season">
                                <Form.Label>Sezonas</Form.Label>
                                <Form.Control type="number" min={1950} max={new Date().getFullYear()} name="Season" required placeholder="Sezonas..." defaultValue="2020" />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit" disabled={this.state.isLoading}>
                                    {this.state.isLoading ? "Palaukite..." : "Rodyti pagal sezoną"}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}