import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Establishments from './Establishments';
import AvailableBags from './AvailableBags';
import './../App.css';


function HomePage({ establishments, bags }) {
  return (
    <>
      {/* HERO SECTION */}
      <Container fluid as="header" className="hero-container">
        <div className="hero-content px-3">
          <h1 className="display-4 fw-bold mb-3">Rescuing Surplus Food</h1>
          <p className="lead mb-4">Aiuta l’ambiente, risparmia e mangia bene</p>
          <Button variant="success" size="lg">Scopri le offerte</Button>
        </div>
      </Container>
      {/* MAIN CONTENT */}
      <Container className="py-5">
        <Establishments establishments={establishments} />
        <AvailableBags bags={bags} />
      </Container>
    </>
  );
}

export default HomePage;
