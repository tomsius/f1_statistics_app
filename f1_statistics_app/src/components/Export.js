import React, { Component } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

export class Export extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();

        var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[0];
        var dataURL = canvas.toDataURL('image/jpeg');

        var dummy = document.createElement('input');
        dummy.value = dataURL;

        document.body.appendChild(dummy);
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);

        this.setState({
            show: true
        });
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleClick}>
                    Kopijuoti diagramos duomenis
                </Button>
            </div>
        );
    }
}