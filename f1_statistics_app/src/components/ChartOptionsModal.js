import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { Export } from './Export';

export class ChartOptionsModal extends Component {
    constructor(props) {
        super(props);

        this.resetValues = this.resetValues.bind(this);
    }

    resetValues() {
        var inputelement = document.getElementsByName("title")[0];
        inputelement.value = this.props.title;

        inputelement = document.getElementsByName("exportFileName")[0];
        inputelement.value = this.props.exportfilename;

        inputelement = document.getElementsByName("type")[0];
        inputelement.value = this.props.currenttype;

        inputelement = document.getElementsByName("theme")[0];
        inputelement.value = this.props.currenttheme;

        inputelement = document.getElementsByName("interactivityEnabled")[0];
        inputelement.value = this.props.interactivityenabled;

        inputelement = document.getElementsByName("zoomEnabled")[0];
        if (inputelement) {
            inputelement.value = this.props.zoomenabled;
        }

        inputelement = document.getElementsByName("axisXTitle")[0];
        inputelement.value = this.props.axisxtitle;

        inputelement = document.getElementsByName("axisXLabelAngle")[0];
        inputelement.value = this.props.axisxlabelangle;

        inputelement = document.getElementsByName("axisXGridThickness")[0];
        inputelement.value = this.props.axisxgridthickness;

        inputelement = document.getElementsByName("axisXMinimum")[0];
        if (inputelement) {
            inputelement.value = this.props.axisxminimum;
        }

        inputelement = document.getElementsByName("axisXMaximum")[0];
        if (inputelement) {
            inputelement.value = this.props.axisxmaximum;
        }

        inputelement = document.getElementsByName("axisXInterval")[0];
        if (inputelement) {
            inputelement.value = this.props.axisxinterval;
        }

        inputelement = document.getElementsByName("axisYTitle")[0];
        inputelement.value = this.props.axisytitle;

        inputelement = document.getElementsByName("axisYLabelAngle")[0];
        inputelement.value = this.props.axisylabelangle;

        inputelement = document.getElementsByName("axisYGridThickness")[0];
        inputelement.value = this.props.axisygridthickness;

        inputelement = document.getElementsByName("axisYMinimum")[0];
        inputelement.value = this.props.axisyminimum;

        inputelement = document.getElementsByName("axisYMaximum")[0];
        inputelement.value = this.props.axisymaximum;

        inputelement = document.getElementsByName("axisYInterval")[0];
        if (inputelement) {
            inputelement.value = this.props.axisyinterval;
        }
    }

    render() {
        const {handleoptionschange, setdefaultvalues, ...rest} = this.props;

        return (
            <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
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
                                        <Form.Control type="text" name="title" placeholder="Grafiko pavadinimas..." defaultValue={this.props.title} onChange={this.props.handleoptionschange} />
                                    </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                
                                    <Col>
                                        <Form.Label>Saugomo failo pavadinimas</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" name="exportFileName" placeholder="Failo pavadinimas..." defaultValue={this.props.exportfilename} onChange={this.props.handleoptionschange} />
                                    </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                
                                    <Col>
                                        <Form.Label>Grafiko tipas</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" custom name="type" defaultValue={this.props.currenttype} onChange={this.props.handleoptionschange}>
                                            {this.props.types.map(x => 
                                                <option key={x.type} value={x.type}>{x.name}</option>
                                            )}
                                        </Form.Control>
                                    </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                
                                    <Col>
                                        <Form.Label>Tema</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" custom name="theme" defaultValue={this.props.currenttheme} onChange={this.props.handleoptionschange}>
                                            {this.props.themes.map(x => 
                                                <option key={x.value} value={x.value}>{x.content}</option>
                                            )}
                                        </Form.Control>
                                    </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                
                                    <Col>
                                        <Form.Label>Interaktyvumas</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Check type="switch" id="custom-switch1" name="interactivityEnabled" checked={this.props.interactivityenabled} onChange={this.props.handleoptionschange} />
                                    </Col>
                            </Row>
                            {this.props.zoomenabled !== undefined && 
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Priartinimas</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Check type="switch" id="custom-switch2" name="zoomEnabled" checked={this.props.zoomenabled} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>}
                            {this.props.currenttype !== "pie" &&
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
                                        <Form.Control type="text" name="axisXTitle" placeholder="Ašies pavadinimas..." defaultValue={this.props.axisxtitle} onChange={this.props.handleoptionschange} />
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
                            {this.props.axisxminimum !== undefined &&
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Mažiausia vertė</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" min={1} name="axisXMinimum" placeholder="Mažiausia vertė..." defaultValue={this.props.axisxminimum} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>}
                            {this.props.axisxmaximum !== undefined &&
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Didžiausia vertė</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" name="axisXMaximum" placeholder="Didžiausia vertė..." defaultValue={this.props.axisxmaximum} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>}
                            {this.props.axisxinterval !== undefined &&
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Intervalas tarp verčių</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" min={1} name="axisXInterval" placeholder="Intervalas tarp verčių..." defaultValue={this.props.axisxinterval} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>}
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
                                    <Form.Control type="text" name="axisYTitle" placeholder="Ašies pavadinimas..." defaultValue={this.props.axisytitle} onChange={this.props.handleoptionschange} />
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
                            {this.props.axisyminimum !== undefined &&
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Mažiausia vertė</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" name="axisYMinimum" placeholder="Mažiausia vertė..." defaultValue={this.props.axisyminimum} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>}
                            {this.props.axisymaximum !== undefined &&
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Didžiausia vertė</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" name="axisYMaximum" placeholder="Didžiausia vertė..." defaultValue={this.props.axisymaximum} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>}
                            {this.props.axisyinterval !== undefined &&
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Intervalas tarp verčių</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" min={1} name="axisYInterval" placeholder="Intervalas tarp verčių..." defaultValue={this.props.axisyinterval} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>}
                        </>}
                        {this.props.secondaxis &&
                            <>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label><b>Y2 ašies parinktys</b></Form.Label>
                                </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Pavadinimas</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name="axisY2Title" placeholder="Ašies pavadinimas..." defaultValue={this.props.axisy2title} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Žymeklio pasukimo kampas (<span>&#176;</span>)</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" name="axisY2LabelAngle" placeholder="Žymeklio pasukimo kampas..." defaultValue={this.props.axisy2labelangle} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>
                            <Row style={{paddingLeft: 0, paddingRight: 0}}>
                                <Col>
                                    <Form.Label>Intervalas tarp verčių</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="number" min={1} name="axisY2Interval" placeholder="Intervalas tarp verčių..." defaultValue={this.props.axisy2interval} onChange={this.props.handleoptionschange} />
                                </Col>
                            </Row>
                            </>}
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
                    <Button variant="secondary" onClick={() => {this.props.setdefaultvalues(this.resetValues)}}>Atstatyti reikšmes</Button>
                    <Button onClick={this.props.onHide}>Uždaryti</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}