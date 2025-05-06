# 🥗 Rescuing Surplus Food

**Rescuing Surplus Food** is a web application designed to fight food waste, inspired by services like "Too Good To Go." It allows users to reserve unsold food bags ("surplus") from restaurants and shops at a discounted price.

🧪 **University project in active development** — it will gradually evolve with the addition of new features.

---

## 🚀 Main Features

* 📋 **View all participating establishments** (restaurants and shops)
* 🛍️ **Reserve food bags** ("surprise" or "regular") with details and pickup time slot
* 📦 **Availability system**: bags can be either available or already reserved
* 🧩 **Modern interface** built with **React** and **Bootstrap**
* 🧪 **Fake test data** for development and debugging purposes

---

## 🛠️ Technologies Used

| Layer    | Tools and Libraries                 |
| -------- | ----------------------------------- |
| Frontend | React, React-Bootstrap, Bootstrap 5 |
| Backend  | Node.js, Express.js                 |
| Database | SQLite3 (via DAO pattern)           |
| Styling  | Bootstrap + custom CSS              |

---

## 📚 Project Structure

```bash
RescuingSurplusFood/
├── dao.mjs
├── db.sqlite
├── index.mjs
├── package.json
├── vite.config.js
├── README.md
├── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── models/
    │   └── models.mjs
    └── components/
        ├── AvailableBags.jsx
        ├── BagForm.jsx
        ├── DefaultLayout.jsx
        ├── EstablishmentInfo.jsx
        ├── Establishments.jsx
        ├── Homepage.jsx
        ├── NavHeader.jsx
        └── NotFound.jsx
```

---

## 📪 Implemented APIs

```http
### List all establishments
GET /api/establishments

### List establishments by category
GET /api/establishments/:category

### List all bags
GET /api/bags

### List bags by type
GET /api/bags/:type

### List bags by size  ← (TO BE FIXED)
GET /api/bags/:size

### List bags for a specific establishment
GET /api/establishments/:id/bags

### Add a new establishment
POST /api/establishments
Body: {
  "name": "...",
  "address": "...",
  "phoneNumber": "...",
  "category": "..."
}

### Add a new bag (regular or surprise)
POST /api/bags
Body: {
  "type": "regular|surprise",
  "content": "...",
  "price": Number,
  "size": "small|medium|large",
  "pickupTimeRange": "...",
  "isAvailable": Boolean,
  "establishmentId": Number
}

### Reserve a bag (mark as unavailable)
PUT /api/bags/:id
Body: { "isAvailable": false }
```

---

## 🧪 Test Data (Frontend)

To test the interface, hardcoded fake data is used:

```js
const fakeEstablishment1 = new Establishment(1, "Pizzeria Bella Napoli", "Via Roma 10, Napoli", "0811234567", "Pizzeria");
const fakeBag1 = new Bag(1, "surprise", null, 5.99, "small", "12:00-14:00", true, 1);
```

These values are visible in the components and can be easily modified for development.

---

## 📷 Interface

* Top navbar with app title and logout button
* Responsive grid with establishment cards
* List of available bags with status badge and content preview

> ⚠️ The current version is for demonstration only and does not include real login, payment, or external APIs.

---

## ✅ Requirements Met (per exam specs)

* ✅ Establishment list from frontend
* ✅ Bag display filtered by type and size
* ✅ Responsive layout with Bootstrap
* ✅ React component-based structure (Nav, Establishments, Bags)
* ✅ Static layout with hardcoded fake data

---

## 📦 How to Run Locally

```bash
# Clone the repository
$ git clone https://github.com/your-username/rescuing-surplus-food.git

# Enter the project folder and install dependencies
$ cd rescuing-surplus-food
$ npm install

# Start the backend (with nodemon or node)
$ nodemon index.mjs

# Start the frontend (Vite in /src)
$ npm run dev
```

---

## 📝 License

This project was developed for academic purposes and does not have a commercial license.

---

## ✍️ Author

**Emanuele Bernacchi**
Computer Engineering Student
Politecnico di Torino

---

## 💡 Future Ideas

* Add user authentication
* Load real data from database
* Interactive reservation functionality
* User dashboard with booking history
* Filter by time range, price, or category
* Simulated payment at pickup

> Help fight food waste, one coding project at a time! 🌍
