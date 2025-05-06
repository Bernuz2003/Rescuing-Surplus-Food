import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const NavHeader = () => (
  <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
        <Link to="/">
            <Navbar.Brand>Rescuing Surplus Food</Navbar.Brand>
        </Link>
    </Container>
  </Navbar>
);

export default NavHeader;