import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router';

const Establishments = ({ establishments }) => (
  <Container className="mt-4">
    <Row className="align-items-center mb-4">
      <Col>
        <h2 className="mb-0">Establishments</h2>
      </Col>
      <Col className="text-end">
        <Link to="/establishments">vedi tutti</Link>
      </Col>
    </Row>
    <Row>
      {establishments.map(est => (
        <Col md={6} key={est.id} className="mb-3">
          <Card className="h-100 clickable-card">
            <Link
              to={`/establishments/${est.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card.Body>
                <Card.Title>{est.name}</Card.Title>
                <Card.Text>{est.address}</Card.Text>
                <Card.Text>
                  <small className="text-muted">Tel: {est.phoneNumber}</small>
                </Card.Text>
                <Badge bg="secondary">{est.category}</Badge>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default Establishments;