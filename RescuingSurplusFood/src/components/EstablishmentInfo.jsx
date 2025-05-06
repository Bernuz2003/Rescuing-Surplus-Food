import React from 'react';
import { Container, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link, Outlet } from 'react-router';

function EstablishmentInfo(props) {
    const {estId} = useParams();
    const establishment = props.establishments.find(est => est.id === Number(estId));
    const bags = props.bags.filter(bag => bag.establishmentId === Number(estId));

  return (
    <Container style={{ maxWidth: 500, marginTop: '2rem' }}>
      <Card>
        <Card.Body>
          <Card.Title style={{ color: '#2c3e50' }}>{establishment.name}</Card.Title>
          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item>
              <strong>Indirizzo:</strong> {establishment.address}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Telefono:</strong> {establishment.phoneNumber}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Categoria:</strong> {establishment.category}
            </ListGroup.Item>
          </ListGroup>
          {bags.length > 0 && (
            <>
              <Card.Subtitle className="mb-2 mt-3" style={{ color: '#34495e' }}>
                Bags disponibili
              </Card.Subtitle>
              <ListGroup>
                {bags.map(bag => (
                  <ListGroup.Item key={bag.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <span>
                        <strong>
                          {bag.type === 'surprise' ? 'Surprise' : 'Regular'} Bag
                        </strong>{' '}
                        - {bag.size}, {bag.price}€
                        <Badge
                          bg={bag.isAvailable ? 'success' : 'secondary'}
                          className="ms-2"
                        >
                          {bag.isAvailable ? 'Disponibile' : 'Riservata'}
                        </Badge>
                      </span>
                      <br />
                      <small>Ritiro: {bag.pickupTimeRange}</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to={`bags/${bag.id}/edit`}>
                        <Button variant="outline-primary" size="sm" className="me-2">
                          edit
                        </Button>
                      </Link>
                      <Button
                        className="bi bi-trash"
                        variant="outline-danger"
                        onClick={() => props.deleteBag && props.deleteBag(bag.id)}
                        title="Elimina"
                      >
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
        <Card.Footer className="bg-white border-0">
              <Link to="bags/new">
                <Button variant="outline-primary" size="sm">Add bag</Button>
              </Link>
            </Card.Footer>
      </Card>
        <Outlet />
    </Container>
  );
}

export default EstablishmentInfo;
