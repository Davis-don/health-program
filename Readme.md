# Health Program Management System

## Overview

This project is a **Health Program Management System** built using modern web technologies. It allows users to:

- Create health programs (TB, Malaria, HIV, etc.).
- Register new clients.
- Enroll clients in one or more health programs.
- Search for a client from a list of registered clients.
- View a client's profile, including the programs they are enrolled in.
- Expose client profiles via an API for integration with other systems.

## Technologies Used

### Frontend

- **React.js** – A JavaScript library for building user interfaces.
- **Bootstrap** – For styling and responsive UI components.
- **React Context API** – For state management.
- **Axios** – To interact with the backend API.

### Backend

- **Node.js** – JavaScript runtime for handling server-side logic.
- **Express.js** – Web framework for API creation.
- **Prisma ORM** – For managing database operations.
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

## Installation Guide

### Prerequisites

Before installing the project, ensure that you have the following dependencies installed:

- [Node.js](https://nodejs.org/) (>= v16)
- [PostgreSQL](https://www.postgresql.org/) (Database)
- [Git](https://git-scm.com/) (Version control system)

### Clone the Repository

To get started, clone the project repository from GitHub:

```sh
git clone https://github.com/your-repo/health-system.git
```

## Program API Routes

These API endpoints allow the management of health programs, including creating, retrieving, and enrolling clients.

### Program Management

- `POST /programs` – Create a new health program.
- `GET /programs` – Retrieve all available health programs.
- `GET /programs/:id` – Get details of a specific program by its ID.
- `PUT /programs/:id` – Update program details.
- `DELETE /programs/:id` – Remove a program from the system.

### Client Enrollment

- `POST /clients/:id/enroll` – Enroll a client in one or more programs.
- `GET /clients/:id/programs` – Fetch a list of programs the client is enrolled in.

### API Response Format

Example JSON response from fetching all programs:

```json
[
  {
    "id": 1,
    "name": "Tuberculosis Treatment",
    "description": "Provides medication and health monitoring for TB patients.",
    "createdAt": "2025-04-26T09:32:00.000Z"
  },
  {
    "id": 2,
    "name": "Malaria Prevention",
    "description": "Distributes mosquito nets and conducts awareness programs.",
    "createdAt": "2025-04-26T09:32:00.000Z"
  }
]
```
