import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { Export } from './Export';

export class ChartOptionsModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Grafiko parinktys
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label><b>Bendros grafiko parinktys</b></Form.Label>
                                </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                
                                    <Col>
                                        <Form.Label>Pavadinimas</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" name="title" placeholder="Įveskite grafiko pavadinimą..." defaultValue={this.props.title} onChange={this.props.handleoptionschange} />
                                    </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                
                                    <Col>
                                        <Form.Label>Saugomo failo pavadinimas</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" name="exportFileName" placeholder="Įveskite failo pavadinimą..." defaultValue={this.props.exportfilename} onChange={this.props.handleoptionschange} />
                                    </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                
                                    <Col>
                                        <Form.Label>Grafiko tipas</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" custom name="type" onChange={this.props.handleoptionschange}>
                                            {this.props.types.map(x => 
                                                x.type === this.props.currenttype ? <option key={x.type} value={x.type} selected>{x.name}</option> : <option key={x.type} value={x.type}>{x.name}</option>
                                            )}
                                        </Form.Control>
                                    </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                
                                    <Col>
                                        <Form.Label>Tema</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" custom name="theme" onChange={this.props.handleoptionschange}>
                                            {this.props.themes.map(x => 
                                                x.value === this.props.currenttheme ? <option key={x.value} value={x.value} selected>{x.content}</option> : <option key={x.value} value={x.value}>{x.content}</option>
                                            )}
                                        </Form.Control>
                                    </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                
                                    <Col>
                                        <Form.Label>Interaktyvumas</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Check type="switch" id="custom-switch" name="interactivityEnabled" checked={this.props.interactivityenabled} onChange={this.props.handleoptionschange} />
                                    </Col>
                            </Row>
                            {this.props.zoomEnabled !== undefined && 
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Priartinimas</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Check type="switch" id="custom-switch" name="zoomEnabled" checked={this.props.zoomenabled} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>}
                            {this.props.currenttype === "column" &&
                            <>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                <Form.Label><b>X ašies parinktys</b></Form.Label>
                            </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            
                                <Col>
                                    <Form.Label>Pavadinimas</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name="axisXTitle" placeholder="Įveskite ašies pavadinimą..." defaultValue={this.props.axisxtitle} onChange={this.props.handleoptionschange} />
                                </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                <Form.Label>Žymeklio pasukimo kampas (<span>&#176;</span>)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" name="axisXLabelAngle" placeholder="Žymeklio pasukimo kampas..." defaultValue={this.props.axisxlabelangle} onChange={this.props.handleoptionschange} />
                            </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                <Form.Label>Linijų storis (px)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" min={0} name="axisXGridThickness" placeholder="Linijų storis..." defaultValue={this.props.axisxgridthickness} onChange={this.props.handleoptionschange} />
                            </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                <Form.Label><b>Y ašies parinktys</b></Form.Label>
                            </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            
                                <Col>
                                    <Form.Label>Pavadinimas</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name="axisYTitle" placeholder="Įveskite ašies pavadinimą..." defaultValue={this.props.axisytitle} onChange={this.props.handleoptionschange} />
                                </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                <Form.Label>Žymeklio pasukimo kampas (<span>&#176;</span>)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" name="axisYLabelAngle" placeholder="Žymeklio pasukimo kampas..." defaultValue={this.props.axisylabelangle} onChange={this.props.handleoptionschange} />
                            </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                <Form.Label>Linijų storis (px)</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" min={0} name="axisYGridThickness" placeholder="Linijų storis..." defaultValue={this.props.axisygridthickness} onChange={this.props.handleoptionschange} />
                            </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                <Form.Label>Mažiausia vertė</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" name="axisYMinimum" placeholder="Mažiausia vertė..." defaultValue={this.props.axisyminimum} onChange={this.props.handleoptionschange} />
                            </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                <Form.Label>Didžiausia vertė</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" name="axisYMaximum" placeholder="Didžiausia vertė..." defaultValue={this.props.axisymaximum} onChange={this.props.handleoptionschange} />
                            </Col>
                        </Row>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                <Form.Label>Intervalas tarp verčių</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" min={1} name="axisYInterval" placeholder="Intervalas tarp verčių..." defaultValue={this.props.axisyinterval} onChange={this.props.handleoptionschange} />
                            </Col>
                        </Row></>}
                        </Container>
                    </Form>
                    <br />
                    <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
                        <Row style={{paddingLeft: 0, paddingRight: 0}}>
                            <Col>
                                Kopijuoti diagramos duomenis <Export />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Uždaryti</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}