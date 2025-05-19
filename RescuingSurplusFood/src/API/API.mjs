import { Establishment, Bag } from "../models/models.mjs";

const SERVER_URL = "http://localhost:3001";

const getEstablishments = async () => {
    const response = await fetch(`${SERVER_URL}/api/establishments`);
    if (response.ok) {
        const establishmentsJson = await response.json();
        const establishments = establishmentsJson.map((e) => new Establishment(
            e.id,
            e.name,
            e.address,
            e.phoneNumber,
            e.category,
        ));
        return establishments;
    }
    else 
        throw new Error("Internal Server Error");
}

const getBags = async () => {
    const response = await fetch(`${SERVER_URL}/api/bags`);
    if (response.ok) {
        const bagsJson = await response.json();
        const bags = bagsJson.map((b) => new Bag(
            b.id,
            b.type,
            b.content,
            b.price,
            b.size,
            b.pickupTimeRange,
            b.isAvailable,
            b.establishmentId,
        ));
        return bags;
    }
    else 
        throw new Error("Internal Server Error");
}

const API = {
    getEstablishments,
    getBags,
};
export default API;

