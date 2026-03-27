# Books API

REST API for managing a book directory.

## Tech Stack
- Node.js
- NestJS
- MongoDB (Mongoose)

## Live Demo
API: https://books-api-tauq.onrender.com  
Swagger: https://books-api-tauq.onrender.com/api

## Features
- CRUD operations for books
- Pagination
- Filtering by status
- Sorting by published date
- Data validation (class-validator, class-transformer)
- Seed script (JSON -> MongoDB)
- Swagger documentation

## Endpoints
- GET /books
- GET /books/:id
- POST /books
- PUT /books/:id
- DELETE /books/:id

## Installation & Setup

### Clone the Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/artem-yaremchuk/books-api.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd books-api
   ```
   
3. Install dependencies:
   ```bash
   npm install
   ```
   
4. Create .env file:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=8080
   ```
   
5. Start the development server:
   ```bash
   npm run start:dev
   ```
   
6. Seed database:
   ```bash
   npm run seed:books
   ```