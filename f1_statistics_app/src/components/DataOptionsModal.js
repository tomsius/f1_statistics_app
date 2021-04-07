import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { Export } from './Export';

export class DataOptionsModal extends Component {
    constructor(props) {
        super(props);

        this.resetValues = this.resetValues.bind(this);
    }

    resetValues() {
        var inputelement = document.getElementsByName("from")[0];
        inputelement.value = this.props.from;

        inputelement = document.getElementsByName("to")[0];
        inputelement.value = this.props.to;

        inputelement = document.getElementsByName("gapFrom")[0];
        if (inputelement) {
            inputelement.value = this.props.gapfrom;
        }

        inputelement = document.getElementsByName("gapTo")[0];
        if (inputelement) {
            inputelement.value = this.props.gapto;
        }

        inputelement = document.getElementsByName("gridFrom")[0];
        if (inputelement) {
            inputelement.value = this.props.gridfrom;
        }

        inputelement = document.getElementsByName("gridTo")[0];
        if (inputelement) {
            inputelement.value = this.props.gridto;
        }

        inputelement = document.getElementsByName("podiumFrom")[0];
        if (inputelement) {
            inputelement.value = this.props.podiumfrom;
        }

        inputelement = document.getElementsByName("podiumTo")[0];
        if (inputelement) {
            inputelement.value = this.props.podiumto;
        }
    }

    render() {
        const { handleoptionschange, setdefaultdatafilters, ...rest } = this.props;

        return (
            <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Duomenų parinktys
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Col>
                                    <Form.Label>Reikšmių sritis</Form.Label>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Col>
                                    <Form.Label>Nuo</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" name="from" placeholder="Nuo..." defaultValue={this.props.from} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <Col>
                                    <Form.Label>Iki</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" name="to" placeholder="Iki..." defaultValue={this.props.to} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>
                            {this.props.gapfrom !== undefined &&
                                <>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Laiko tarpas iki antros vietos</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Nuo (s)</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control type="number" name="gapFrom" placeholder="Nuo..." defaultValue={this.props.gapfrom} onChange={this.props.handleoptionschange} />
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Iki (s)</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control type="number" name="gapTo" placeholder="Iki..." defaultValue={this.props.gapto} onChange={this.props.handleoptionschange} />
                                        </Col>
                                    </Row>
                                </>}
                            {this.props.gridfrom !== undefined &&
                                <>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Starto pozicija</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Nuo</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control type="number" name="gridFrom" placeholder="Nuo..." defaultValue={this.props.gridfrom} onChange={this.props.handleoptionschange} />
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Iki</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control type="number" name="gridTo" placeholder="Iki..." defaultValue={this.props.gridto} onChange={this.props.handleoptionschange} />
                                        </Col>
                                    </Row>
                                </>}
                            {this.props.podiumfrom !== undefined &&
                                <>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Podiumo vieta</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Nuo</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control type="number" name="podiumFrom" placeholder="Nuo..." defaultValue={this.props.podiumfrom} onChange={this.props.handleoptionschange} />
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Iki</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control type="number" name="podiumTo" placeholder="Iki..." defaultValue={this.props.podiumto} onChange={this.props.handleoptionschange} />
                                        </Col>
                                    </Row>
                                </>}
                            {this.props.podiumfinishertitle !== undefined &&
                                <>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>{this.props.podiumfinishertitle}</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                                {this.props.selectedpodiumfinishers.map(x =>
                                                        <Form.Check
                                                            type="checkbox"
                                                            inline
                                                            value={x.podiumFinisher}
                                                            label={x.podiumFinisher}
                                                            name="selectedPodiumFinishers"
                                                            checked={x.checked}
                                                            onChange={this.props.handleoptionschange}
                                                            style={{ float: "left", paddingLeft: 0, paddingRight: 0 }}
                                                        />
                                                )}
                                        </Col>
                                    </Row>
                                </>}
                            {this.props.selectedcircuits !== undefined &&
                                <>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <Form.Label>Lenktynių trasos</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Col>
                                            <div style={{ textAlign: "center", paddingLeft: 0, paddingRight: 0, display: "inline-block" }}>
                                                {this.props.selectedcircuits.map(x =>
                                                    <>
                                                        <Form.Check
                                                            type="checkbox"
                                                            value={x.circuit}
                                                            label={x.circuit}
                                                            name="selectedCircuits"
                                                            checked={x.checked}
                                                            onChange={this.props.handleoptionschange}
                                                            style={{ float: "left", paddingLeft: 0, paddingRight: 0 }}
                                                        />
                                                        <br />
                                                    </>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </>}
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { this.props.setdefaultdatafilters(this.resetValues) }}>Atstatyti reikšmes</Button>
                    <Button onClick={this.props.onHide}>Uždaryti</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}