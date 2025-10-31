# BookIt: Experiences & Slots (Fullstack Intern Assignment)

This is a complete end-to-end web application where users can explore travel experiences,
[cite_start]select available slots, and complete bookings[cite: 5].

## Tech Stack

* [cite_start]**Frontend:** React, TypeScript, Vite, TailwindCSS, Axios [cite: 9, 10, 22]
* [cite_start]**Backend:** Node.js, Express, MongoDB, Mongoose [cite: 29, 30]

## Project Structure

The project is a monorepo with two main folders:
* `/client`: Contains the React frontend application.
* `/server`: Contains the Node.js/Express backend API.

## How to Run

### Prerequisites

* Node.js (v18 or later)
* npm
* MongoDB (A local instance or a free MongoDB Atlas connection string)

### 1. Setup Backend (`server/`)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create an environment file:**
    Create a file named `.env` in the `/server` directory. Copy the contents of `.env.example` (if you have one) or use the following template:

    ```
    PORT=8000
    MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>
    CORS_ORIGIN=http://localhost:5173
    ```
    *Replace `<YOUR_MONGODB_CONNECTION_STRING>` with your actual MongoDB URI.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:8000`.

### 2. Setup Frontend (`client/`)

1.  **Open a new terminal.**
2.  **Navigate to the client directory:**
    ```bash
    cd client
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The React app will start on `http://localhost:5173`.

5.  Open `http://localhost:5173` in your browser to use the application.

## [cite_start]API Endpoints [cite: 31]

* [cite_start]`GET /api/v1/experiences`: Return list of all experiences. [cite: 32]
* [cite_start]`GET /api/v1/experiences/:id`: Return details and available slots for a single experience. [cite: 33]
* [cite_start]`POST /api/v1/bookings`: Accept booking details, validate slot, and store the booking. [cite: 34]
* [cite_start]`POST /api/v1/promo/validate`: Validate a promo code. [cite: 36]