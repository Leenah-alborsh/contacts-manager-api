<div align="center">

# MyContacts Backend API

**A simple RESTful API for managing contacts using Node.js, Express, MongoDB Atlas, and Mongoose.**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## Overview

MyContacts Backend API is a beginner-friendly backend project that performs full CRUD operations for contact records.

Users can:

- Create a new contact
- View all contacts
- View one contact by ID
- Update a contact
- Delete a contact

---

## Features

| Feature | Status |
| --- | --- |
| Express server setup | Done |
| Simple frontend interface | Done |
| MongoDB Atlas connection | Done |
| Mongoose contact model | Done |
| Create contact | Done |
| Get all contacts | Done |
| Get contact by ID | Done |
| Update contact | Done |
| Delete contact | Done |
| Error handling middleware | Done |
| Environment variables | Done |

---

## Technologies Used

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express.js | Backend server framework |
| Tailwind CSS | Frontend styling |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| dotenv | Environment variables |
| express-async-handler | Async error handling |
| Nodemon | Development server auto-restart |

---

## Project Structure

```text
mycontacts-backend/
+-- Config/
|   +-- dbConection.js
+-- Models/
|   +-- contactModel.js
+-- public/
|   +-- app.js
|   +-- index.html
+-- controllers/
|   +-- contactController.js
+-- middleware/
|   +-- errorHandler.js
+-- routes/
|   +-- contactRoutes.js
+-- constants.js
+-- package.json
+-- server.js
+-- README.md
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` File

Create a `.env` file in the project root:

```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
```

### 3. Run The Project

Development mode:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

If everything is working, the terminal should show:

```text
MongoDB connected: cluster-host/mycontacts-backend
Server is running on port 5001
```

Open the frontend in your browser:

```text
http://localhost:5001
```

---

## API Endpoints

Base URL:

```text
http://localhost:5001/api/contacts
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/contacts` | Get all contacts |
| `POST` | `/api/contacts` | Create a new contact |
| `GET` | `/api/contacts/:id` | Get a contact by ID |
| `PUT` | `/api/contacts/:id` | Update a contact by ID |
| `DELETE` | `/api/contacts/:id` | Delete a contact by ID |

---

## Request Body Example

Use this JSON body when creating a new contact:

```json
{
  "name": "Leenah",
  "email": "leenah@example.com",
  "phone": "0590000000"
}
```

---

## Example Responses

### Create Contact

```json
{
  "_id": "665f4c1f9b1f5a0012345678",
  "name": "Leenah",
  "email": "leenah@example.com",
  "phone": "0590000000",
  "createdAt": "2026-05-31T09:00:00.000Z",
  "updatedAt": "2026-05-31T09:00:00.000Z"
}
```

### Validation Error

```json
{
  "title": "Validation Error",
  "message": "All fields are mandatory!"
}
```

---

## MongoDB Atlas

After creating the first contact, open MongoDB Atlas and go to:

```text
Database > Browse Collections
```

You should see:

| Item | Name |
| --- | --- |
| Database | `mycontacts-backend` |
| Collection | `contacts` |

Each contact document will include:

- `_id`
- `name`
- `email`
- `phone`
- `createdAt`
- `updatedAt`

---

## Notes

- Make sure your MongoDB Atlas connection string is correct.
- Make sure your IP address is allowed in MongoDB Atlas Network Access.
- If port `5001` is already in use, stop the old Node process or change the `PORT` value in `.env`.
- Do not upload your real `.env` file to GitHub.

---

<div align="center">

## Author

**Leenah Alborsh**

</div>
