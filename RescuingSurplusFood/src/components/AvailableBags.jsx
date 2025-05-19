import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const bagImages = {
  surprise: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  regular: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80"
};

const AvailableBags = ({ bags }) => (
  <Container className="mt-4">
    <Row className="align-items-center mb-4">
      <Col>
        <h2 className="mb-0">Available Bags</h2>
      </Col>
      <Col className="text-end">
        <Link to="/bags">vedi tutti</Link>
      </Col>
    </Row>
    <Row>
      {bags.map(bag => (
        <Col md={4} key={bag.id} className="mb-3">
          <Card className="h-100 shadow-sm card-hover">
            <Card.Img 
              variant="top" 
              src={bagImages[bag.type] || bagImages.regular} 
              alt={bag.type === 'surprise' ? 'Surprise Bag' : 'Regular Bag'} 
              style={{ objectFit: 'cover', height: '200px' }}
            />
            <Card.Body>
              <Card.Title>
                {bag.type === 'surprise' ? 'Surprise Bag' : 'Regular Bag'}
              </Card.Title>
              {bag.type === 'regular' && bag.content && (
                <Card.Text><strong>Contents:</strong> {bag.content}</Card.Text>
              )}
              <Card.Text className='card-text'><strong>Price:</strong> €{bag.price}</Card.Text>
              <Card.Text><strong>Size:</strong> <Badge bg="info">{bag.size}</Badge></Card.Text>
              <Card.Text><strong>Pickup:</strong> {bag.pickupTimeRange}</Card.Text>
              <Card.Text>
                <strong>Status:</strong> {bag.isAvailable ? (
                  <Badge bg="success">Available</Badge>
                ) : (
                  <Badge bg="danger">Reserved</Badge>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default AvailableBags;