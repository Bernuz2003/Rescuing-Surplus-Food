import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react'
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
import API from './API/API.mjs';

function App() {

    const [establishments, setEstablishments] = useState([]);

    const [bags, setBags] = useState([]);

    useEffect(() => {
        const getEstablishments = async () => {
            const establishments = await API.getEstablishments();
            setEstablishments(establishments);
        }
        getEstablishments();
    }, []);

    useEffect(() => {
        const getBags = async () => {
            const bags = await API.getBags();
            setBags(bags);
        }
        getBags();
    }, []);

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