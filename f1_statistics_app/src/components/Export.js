import React, { Component } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import clipboard from '../clipboard.png';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export class Export extends Component {
    constructor(props) {
        super(props);

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

        toastr["info"]("", "Diagramos duomenys nukopijuoti į iškarpinę");
    }

    render() {

        return (
            <>
                <button style={{ border: "none", width: "50px", backgroundColor: "white" }} onClick={this.handleClick}>
                    <img width="75%" height="75%" src={clipboard} />
                </button>
            </>
        );
    }
}