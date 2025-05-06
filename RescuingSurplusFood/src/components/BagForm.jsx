import React, { useActionState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router';


export function EditBagForm(props) { 
    const params = useParams();
    const bagId = params.bagId;

    const bag = props.bags.find(b => b.id === Number(bagId));

    if(bag)
        return <BagForm bag={bag} editBag={props.editBag} />;
    else {
        return (
            <Container style={{ maxWidth: 500, marginTop: '2rem' }}>
                <h2 className="mb-4">Bag not found</h2>
                <Alert variant="danger">The bag with ID {bagId} was not found.</Alert>
            </Container>
        );
    }
}

export function BagForm(props) {

    const navigate = useNavigate();
    const { estId, bagId } = useParams();

    const initialState = { 
        type: props.bag?.type || "regular",
        content: props.bag?.content ? (Array.isArray(props.bag.content) ? props.bag.content.join(", ") : props.bag.content) : "",
        price: props.bag?.price || "",
        size: props.bag?.size || "small",
        pickupTimeRange: props.bag?.pickupTimeRange || "",
        isAvailable: props.bag?.isAvailable || false,
        establishmentId: estId
    }

    const handleSubmit = async (prevState, formData) => {

        // creo un oggetto {} dal FormData
        const bag = Object.fromEntries(formData.entries());

        // Conversioni necessarie
        bag.type = bag.type;
        bag.size = bag.size;
        bag.price = parseFloat(bag.price);
        bag.pickupTimeRange = bag.pickupTimeRange;
        bag.isAvailable = formData.get("isAvailable") === "on" ? true : false;
        bag.establishmentId = Number(estId);

        // Gestione content
        if (bag.type === "regular") {
            bag.content = bag.content ? bag.content.split(",").map(s => s.trim()) : [];
        } else {
            bag.content = null;
        }

        // Se edit, aggiungi id
        if(props.bag) {
            bag.id = props.bag.id;
        }

        // Debug
        console.log(bag.id);
        console.log(bag.type);
        console.log(bag.content);
        console.log(bag.price);
        console.log(bag.size);
        console.log(bag.pickupTimeRange);
        console.log(bag.isAvailable);
        console.log(bag.establishmentId);

        if(props.addBag)
            props.addBag(bag);
        else
            props.editBag(bag);

        navigate(`/establishments/${estId}`, { replace: true });
    }

    const [state, formAction] = useActionState(handleSubmit, initialState);

  return (
    <Container style={{ maxWidth: 500, marginTop: '2rem' }}>
      <h2 className="mb-4">Crea una nuova Bag</h2>
      { state.error && <Alert variant="secondary">{state.error}</Alert> }
      <Form action={formAction}>
        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Select name="type" defaultValue={state.type}>
            <option value="regular">Regular</option>
            <option value="surprise">Surprise</option>
          </Form.Select>
        </Form.Group>
        {state.type === 'regular' && (
          <Form.Group className="mb-3">
            <Form.Label>Contenuto (separa con virgola)</Form.Label>
            <Form.Control
              name="content"
              type="text"
              required={true}
              defaultValue={state.content}
              placeholder="Es: Pizza Margherita, Coca Cola"
            />
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Prezzo (€)</Form.Label>
          <Form.Control
            name="price"
            type="number"
            required={true}
            min="0"
            step="0.01"
            defaultValue={state.price}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Dimensione</Form.Label>
          <Form.Select name="size" defaultValue={state.size}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Intervallo di ritiro</Form.Label>
          <Form.Control
            name="pickupTimeRange"
            type="text"
            required={true}
            defaultValue={state.pickupTimeRange}
            placeholder="Es: 12:00-14:00"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            name="isAvailable"
            type="checkbox"
            label="Disponibile"
            defaultChecked={state.isAvailable}
          />
        </Form.Group>
        { props.addBag && <Button variant="primary" type="submit">Crea Bag</Button> }
        { props.editBag && <Button variant="success" type="submit">Edit Bag</Button> }
        {" "}
        <Link className="btn btn-danger" to={`/establishments/${estId}`}>Cancel</Link>
      </Form>
    </Container>
  );
}

export default BagForm;
