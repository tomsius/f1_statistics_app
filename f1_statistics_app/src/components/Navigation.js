import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Pradžia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="d-inline p-2 text-light" to="/wins">Laimėjimai</NavLink>
                        <NavLink className="d-inline p-2 text-light" to="/poles">Pole pozicijos</NavLink>
                        <NavLink className="d-inline p-2 text-light" to="/fastestlaps">Greičiausi ratai</NavLink>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
        );
    }
}