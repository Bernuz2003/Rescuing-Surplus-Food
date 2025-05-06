function Establishment(id, name, address, phoneNumber, category) {
  this.id = id;
  this.name = name;
  this.address = address;
  this.phoneNumber = phoneNumber;
  this.category = category;    // es: "Pizzeria", "Bakery", "Supermarket" ...
}

/**
 * Rappresenta una "bag" (borsa) di surplus food.
 */
function Bag(id, type, content, price, size, pickupTimeRange, isAvailable, establishmentId) {
  this.id = id;
  this.type = type;                               // "surprise" oppure "regular"
  this.content = content;                         // array di item (solo se regular) oppure null/stringa se surprise
  this.price = price;                             // prezzo scontato
  this.size = size;                               // "small", "medium", "large"
  this.pickupTimeRange = pickupTimeRange;         // stringa descrittiva dell'intervallo di ritiro
  this.isAvailable = isAvailable;                 // true = disponibile, false = riservata
  this.establishmentId = establishmentId;         // riferimento testuale all'Establishment

  this.getEstablishment = () => {
    return this.establishmentId;
  }
}

/**
 * Contenitore principale che gestisce collezioni di Establishment e di Bag.
**/
function SurplusFood() {
        this.establishments = []; // elenco di ristoranti/negozi
        this.bags = [];           // elenco di bags
}

export { Establishment, Bag, SurplusFood };