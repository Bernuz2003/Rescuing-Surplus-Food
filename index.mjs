//import
import express from 'express';
import morgan from 'morgan';
import { check, validationResult } from 'express-validator';
import dao from './dao.mjs';

//init
const app = express();
const port = 3001;

//middleware
app.use(express.json());
app.use(morgan('dev'));

/* ROUTES */

// GET /api/establishments
app.get('/api/establishments', async (req, res) => {
	try {
		const establishments = await dao.listEstablishments();
		res.json(establishments);
	}
	catch {
		res.status(500).end();
	}
});

// GET /api/bags
app.get('/api/bags', async (req, res) => {
	try {
		const bags = await dao.listBags();
		res.json(bags);
	}
	catch {
		res.status(500).end();
	}
});

// GET /api/establishments/:category
app.get('/api/establishments/:category', async (req, res) => {
	try {
		const establishments = await dao.listEstablishmentsByCategory(req.params.category);
		res.json(establishments);
	}
	catch {
		res.status(500).end();
	}
});

// GET /api/bags/<type>
app.get('/api/bags/:type', async (req, res) => {
	try {
		const bags = await dao.listBagsByType(req.params.type);
		res.json(bags);
	}
	catch {
		res.status(500).end();
	}
});

// GET /api/bags/<size>
app.get('/api/bags/:size', async (req, res) => {
	try {
		const bags = await dao.listBagsBySize(req.params.size);
		res.json(bags);
	}
	catch {
		res.status(500).end();
	}
});


// GET /api/establishments/:id/bags
app.get('/api/establishments/:id/bags', async (req, res) => {
	try {
		const bags = await dao.listBagsByEstablishment(req.params.id);
		res.json(bags);
	}
	catch {
		res.status(500).end();
	}
});

// POST /api/establishments
app.post('/api/establishments', [
	check('name').notEmpty(),
	check('address').isString(),
	check('phoneNumber').isString(),
	check('category').isString()
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	try {
		const id = await dao.addEstablishment(req.body);
		res.status(201).json(id);
	}
	catch (e) {
		console.error(`ERROR: ${e.message}`);
		res.status(503).json({ error: `Database error during the creation of the establishment.` });
	}
});

// POST /api/bags
app.post('/api/bags', [
	check('type').isString(),
	check('price').isNumeric(),
	check('size').isString(),
	check('establishmentId').isNumeric()
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	try {
		const id = await dao.addBag(req.body);
		res.status(201).json(id);
	}
	catch (e) {
		console.error(`ERROR: ${e.message}`);
		res.status(503).json({ error: `Database error during the creation of the bag.` });
	}
});

// PUT /api/bags/:id
app.put('/api/bags/:id', [
	check('isAvailable').isBoolean()
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	try {
		const bagUpdated = await dao.reserveBag(req.params.id, req.body.isAvailable);
		if (!bagUpdated) {
			return res.status(404).json({ error: 'Bag not found.' });
		}
		res.status(200).end();
	}
	catch {
		res.status(503).json({ error: 'Database error during the update of the bag.' });
	}
});

// far partire il server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });
