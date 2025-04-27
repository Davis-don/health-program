# Health Program Management System

## Overview

This project is a **Health Program Management System** built using modern web technologies. It allows users to:

- Create health programs (TB, Malaria, HIV, etc.).
- Register new clients.
- Enroll clients in one or more health programs.
- Search for a client from a list of registered clients.
- View a client's profile, including the programs they are enrolled in.
- Expose client profiles via an API for integration with other systems.

You can access the **Health Program Management System** live at:  
[Health Program System on Render](https://health-program.onrender.com/)

### Login Credentilals

### Email:

1234@gmail.com

### password

1234

## 📹 Health Program System Demo

You can watch a short prototype/demo of the system in action here:

👉 [Watch the Demo Video](https://youtu.be/SoTNYB7yDyg)

(Click the link to play the video with full controls)

## Technologies Used

### Frontend

- **React.js** – A JavaScript library for building user interfaces.
- **Bootstrap** – For styling and responsive UI components.
- **React Context API** – For state management.
- **Zustand** – For global state management (alternative to Context API, making state management easier and more scalable).
- **Axios** – To interact with the backend API.
- **Prisma** – ORM for seamless database management and easy interaction with the database.

### Backend

- **Node.js** – JavaScript runtime for handling server-side logic.
- **Express.js** – Web framework for API creation.
- **Prisma ORM** – For managing database operations with a robust schema.
- **PostgreSQL** – Relational database for storing client and program data.
- **JWT (JSON Web Token)** – For authentication and security.
- **Dotenv** – For environment variable management.

## File Structure

```plaintext
health-system/
│
├── backend/                  # Node.js + Prisma backend
│   ├── prisma/               # Prisma schema and migrations
│   │   ├── schema.prisma
│   │   ├── migrations/
│   ├── src/
│   │   ├── controllers/      # Business logic for handling requests
│   │   │   ├── clientController.js
│   │   │   ├── programController.js
│   │   ├── services/         # Service layer to interact with database
│   │   │   ├── clientService.js
│   │   │   ├── programService.js
│   │   ├── routes/           # Express routes
│   │   │   ├── clientRoutes.js
│   │   │   ├── programRoutes.js
│   │   ├── middleware/       # Middleware functions
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   ├── utils/            # Utility functions
│   │   │   ├── validation.js
│   │   ├── config/           # Configuration files
│   │   │   ├── dbConfig.js
│   │   ├── models/           # Prisma models and database interaction
│   │   │   ├── clientModel.js
│   │   │   ├── programModel.js
│   │   ├── index.js          # Entry point for the backend server
│   ├── package.json
│   ├── .env
│
├── frontend/                 # React client
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ClientForm.js
│   │   │   ├── ProgramList.js
│   │   │   ├── ClientProfile.js
│   │   ├── pages/            # Main application pages
│   │   │   ├── Home.js
│   │   │   ├── Clients.js
│   │   │   ├── Programs.js
│   │   │   ├── Profile.js
│   │   ├── services/         # API interaction layer
│   │   │   ├── apiClient.js
│   │   ├── context/          # Global state management
│   │   │   ├── ClientContext.js
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useFetchClients.js
│   │   │   ├── useFetchPrograms.js
│   │   ├── utils/            # Helper functions
│   │   │   ├── formatDate.js
│   │   ├── App.js            # Main React app component
│   │   ├── index.js          # Entry point for React
│   ├── public/
│   ├── package.json
│   ├── .env
│
├── README.md                 # Documentation
├── .gitignore

```

# Health Program Management System

## Installation Guide

### Prerequisites

Before installing the project, ensure that you have the following dependencies installed:

- [Node.js](https://nodejs.org/) (>= v16)
- [PostgreSQL](https://www.postgresql.org/) (Database)
- [Git](https://git-scm.com/) (Version control system)

### 1️⃣ Clone the Repository

To get started, clone the project repository from GitHub:

```sh
git clone https://github.com/Davis-don/health-program

```

### 🔧 Backend Installation

Navigate to the backend folder:

```bash
cd health-system/backend

```

#### Install the necessary dependencies:

```bash
npm install


```

Configure environment variables by creating a .env file and adding the following:

```
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
```

Set up Prisma to interact with your database:

```
npx prisma migrate dev

```

Start the backend server:

```
npm run dev
```

### 🖥️ Frontend Installation

Navigate to the frontend folder:

```
cd health-system/frontend

```

Install the necessary dependencies:

```
npm install

```

Configure the frontend to communicate with your live backend API by editing the .env file in the frontend directory:

```
REACT_APP_API_URL=https://health-program.onrender.com

```

Start the React development server:

```
npm start

```

PROFILE API Response Format

```JS
http://localhost:4000/clients/get/(client_id)
```

```json
[
  {
    "id": "eaec83db-c64c-4dfa-bb4f-a22987991a75",
    "firstName": "Davis",
    "middleName": "Mwai",
    "lastName": "Ikou",
    "age": 30,
    "gender": "Male",
    "phone": "0758420860",
    "email": "davismugoikou@gmail.com",
    "address": "Nairobi",
    "medicalHistory": "anaemic",
    "createdAt": "2025-04-27T12:00:53.445Z",
    "updatedAt": "2025-04-27T12:00:53.445Z",
    "enrollments": []
  },
  {
    "id": "f3b2a109-a6c7-4e58-b912-2f5d1a7c9d8e",
    "firstName": "John",
    "middleName": "Doe",
    "lastName": "Smith",
    "age": 45,
    "gender": "Male",
    "phone": "0723456789",
    "email": "johnsmith@gmail.com",
    "address": "Mombasa",
    "medicalHistory": "hypertension",
    "createdAt": "2025-04-27T12:30:21.445Z",
    "updatedAt": "2025-04-27T12:30:21.445Z",
    "enrollments": []
  }
]
```
