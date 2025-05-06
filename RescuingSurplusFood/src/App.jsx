import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react'
import { Container } from "react-bootstrap";
import NavHeader from './components/NavHeader'
import Establishments from './components/Establishments';
import EstablishmentInfo from './components/EstablishmentInfo';
import Homepage from './components/Homepage';
import NotFound from './components/NotFound';
import BagForm, { EditBagForm } from './components/BagForm';
import AvailableBags from './components/AvailableBags';
import { Bag, Establishment } from "./models/models.mjs";
import { Routes, Route } from "react-router";
import DefaultLayout from "./components/DefaultLayout";

const fakeEstablishment1 = new Establishment(1, "Pizzeria Bella Napoli", "Via Roma 10, Napoli", "0811234567", "Pizzeria");
const fakeEstablishment2 = new Establishment(2, "Panificio Il Fornaio", "Via Milano 25, Milano", "0287654321", "Bakery");

const fakeBag1 = new Bag(1, "surprise", null, 5.99, "small", "12:00-14:00", true, 1);
const fakeBag2 = new Bag(2, "regular", ["Pizza Margherita", "Coca Cola"], 7.99, "medium", "18:00-20:00", true, 1);
const fakeBag3 = new Bag(3, "regular", ["Pane Integrale", "Cornetti"], 4.99, "small", "08:00-10:00", true, 2);
const fakeBag4 = new Bag(4, "surprise", null, 6.99, "medium", "16:00-18:00", true, 2);
const fakeBag5 = new Bag(5, "regular", ["Pizza Diavola", "Birra"], 8.99, "large", "19:00-21:00", true, 1);
const fakeBag6 = new Bag(6, "surprise", null, 3.99, "small", "09:00-11:00", true, 2);

function App() {

    const [establishments, setEstablishments] = useState([
        fakeEstablishment1,
        fakeEstablishment2
    ]);

    const [bags, setBags] = useState([
        fakeBag1,
        fakeBag2,
        fakeBag3,
        fakeBag4,
        fakeBag5,
        fakeBag6
    ]);

    const addBag = (bag) => { 
        setBags(oldBags => {
            const newId = Math.max(...oldBags.map(b => b.id)) + 1;
            const newBag = new Bag(newId, bag.type, bag.content, bag.price, bag.size, bag.pickupTimeRange, true, bag.establishmentId);
            return [...oldBags, newBag];
        });
    }

    const editBag = (bag) => { 
        setBags(oldBags => {
            return oldBags.map(b => {
                if (b.id === bag.id) {
                    return new Bag(bag.id, bag.type, bag.content, bag.price, bag.size, bag.pickupTimeRange, bag.isAvailable, bag.establishmentId);
                }
                return b;
            });
        });
    }

    const deleteBag = (bagId) => {
        setBags(oldBags => {
            return oldBags.filter((bag) => bag.id !== bagId);
        });
    }


    {/*

    ROUTES:
    
    - / => Home (preview establishments and available bags)
    - /establishments => Establishments (list of all establishments)
    - /establishments/:estId => Establishment (details of a single establishment)
    - /bags => Bags (list of all bags)
    - /bags/:bagId => Bag (details of a single bag) --> DA CAPIRE SE HA SENSO!
    - /establishments/:estId/bags/new => Create Bag (form to create a new bag)
    - /establishments/:estId/bags/:bagId/edit => Edit Bag (form to edit an existing bag)
    
    */}

    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={ <Homepage establishments={establishments} bags={bags} /> } />
                <Route path="/establishments" element={ <Establishments establishments={establishments} /> } />
                <Route path="/bags" element={ <AvailableBags bags={bags} /> } />
                <Route path="/establishments/:estId" element={
                    <EstablishmentInfo
                        establishments={establishments}
                        bags={bags}
                        addBag={addBag}
                        editBag={editBag}
                        deleteBag={deleteBag}
                    />
                }>
                    <Route index element={null} />
                    <Route path="/establishments/:estId/bags/new" element={<BagForm addBag={addBag} />} />
                    <Route path="/establishments/:estId/bags/:bagId/edit" element={<EditBagForm bags={bags} editBag={editBag} /> } />
                </Route>
                <Route path="*" element={ <NotFound /> } />
            </Route>
        </Routes>
    );
};

export default App;