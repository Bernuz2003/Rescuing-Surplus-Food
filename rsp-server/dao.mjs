/* Data Access Object (DAO) module */
import dayjs from "dayjs";
import sqlite from "sqlite3";
import { Establishment, Bag } from "./models.mjs";


// open the database
const db = new sqlite.Database("surplus_data.sqlite", (err) => {
    if (err) throw err;
});

/*
* Restituisce la lista di tutti i ristoranti
*/
export const listEstablishments = (establishment) => {
    return new Promise((resolve, reject) => {
        const sql_query = "SELECT * FROM establishment";
        db.all(sql_query, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const establishments = rows.map((e) => new Establishment(e.id, e.name, e.address, e.phoneNumber, e.category));
                resolve(establishments);
            }
        })
    })
}

/*
* Restituisce la lista di tutte le bags
*/
export const listBags = (bag) => {
    return new Promise((resolve, reject) => {
        const sql_query = "SELECT * FROM bag";
        db.all(sql_query, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const bag = rows.map((b) => new Bag(b.id, b.type, b.content, b.price, b.size, b.pickupTimeRange, b.isAvailable, b.establishmentId));
                resolve(bag);
            }
        })
    })
}


/**
 * Restituisce tutti gli esercizi di una certa categoria
 **/
export const listEstablishmentsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        const sql_query = "SELECT * FROM establishment WHERE category = ?";
        db.all(sql_query, [category], (err, rows) => {
            if (err)
                reject(err);
            else {
                const establishments = rows.map((e) => new Establishment(e.id, e.name, e.address, e.phoneNumber, e.category));
                resolve(establishments);
            }
        })
    });
}


/**
 * Restituisce tutte le bag di un certo tipo: "surprise" o "regular"
 **/
export const listBagsByType = (type) => {
    return new Promise((resolve, reject) => {
        const sql_query = "SELECT * FROM bag WHERE type = ?";
        db.all(sql_query, [type], (err, rows) => {
            if (err)
                reject(err);
            else {
                const bags = rows.map((b) => new Bag(b.id, b.type, b.content, b.price, b.size, b.pickupTimeRange, b.isAvailable, b.establishmentId));
                resolve(bags);
            }
        })
    });
}

/**
 * Restituisce tutte le bag filtrate per dimensione: "small", "medium" o "large"
 **/
export const listBagsBySize = (size) => {
    return new Promise((resolve, reject) => {
        const sql_query = "SELECT * FROM bag WHERE size = ?";
        db.all(sql_query, [size], (err, rows) => {
            if (err)
                reject(err);
            else {
                const bags = rows.map((b) => new Bag(b.id, b.type, b.content, b.price, b.size, b.pickupTimeRange, b.isAvailable, b.establishmentId));
                resolve(bags);
            }
        })
    });
}


/**
 * Restituisce tutte le bag di un certo esercizio commerciale
 **/
export const listBagsByEstablishment = (establishmentId) => {
    return new Promise((resolve, reject) => {
        const sql_query = "SELECT * FROM bag JOIN establishment ON establishment.id = bag.establishmentId WHERE establishment.id = ?";
        db.all(sql_query, [establishmentId], (err, rows) => {
            if (err)
                reject(err);
            else {
                const bags = rows.map((b) => new Bag(b.id, b.type, b.content, b.price, b.size, b.pickupTimeRange, b.isAvailable, b.establishmentId));
                resolve(bags);
            }
        })
    });
}

/**
 * Aggiunge un nuovo esercizio commerciale
 **/
export const addEstablishment = (establishment) => {
    return new Promise((resolve, reject) => {
        const sql_query = "INSERT INTO establishment(name, address, phoneNumber, category) VALUES(?, ?, ?, ?)";
        db.run(sql_query, [establishment.name, establishment.address, establishment.phoneNumber, establishment.category], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
        });
    });
}

/**
 * Aggiunge una nuova bag
 **/
export const addBag = (bag) => {
    return new Promise((resolve, reject) => {
        const sql_query = "INSERT INTO bag(type, content, price, size, pickupTimeRange, isAvailable, establishmentId) VALUES(?, ?, ?, ?, ?, ?, ?)";
        db.run(sql_query, [bag.type, bag.content, bag.price, bag.size, bag.pickupTimeRange, bag.isAvailable, bag.establishmentId], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
        });
    });
}

/**
 * Cambia lo stato di una bag specifica in "riservata" (isAvailable = false)
 **/
export const reserveBag = (bagId) => {
    return new Promise((resolve, reject) => {
        const sql_query = "UPDATE bag SET isAvailable = 0 WHERE id = ?";
        db.run(sql_query, [bagId], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes);
        });
    });
}

/**
 * Elimina un esercizio commerciale dall'elenco
 **/
export const deleteEstablishment = (establishmentId) => {
    return new Promise((resolve, reject) => {
        const sql_query = "DELETE FROM establishment WHERE id = ?";
        db.run(sql_query, [establishmentId], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes);
        });
    });
};

/**
 * Elimina una bag dall'elenco
 **/
export const deleteBag = (bagId) => {
    return new Promise((resolve, reject) => {
        const sql_query = "DELETE FROM bag WHERE id = ?";
        db.run(sql_query, [bagId], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes);
        });
    });
};

export default {
    listEstablishments,
    listBags,
    listEstablishmentsByCategory,
    listBagsByType,
    listBagsBySize,
    listBagsByEstablishment,
    addEstablishment,
    addBag,
    reserveBag,
    deleteEstablishment,
    deleteBag,
};