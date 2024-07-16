BookStore CRUD System

- This project is a BookStore CRUD system with a React-based single-page application (SPA) as the frontend, a Spring Boot application as the middleware, and a MySQL database as the data store. The system allows for creating, reading, updating, and deleting (CRUD) operations on Books and Authors with a many-to-many relationship.

Prerequisites

- Node.js v20
- OpenJDK 17
- MySQL (v5 or higher)
- Maven (for building the Spring Boot application)

Frontend Implementation (React with TailwindCSS)

- Initialize the React application:

- Install TailwindCSS and required dependencies:

- Configure tailwind.config.js

- Create Components and Pages

- Create Author & Book Context

- Implement Routing using 'react-router-dom'

Backend Implementation (Java, Spring Boot)

- Initialize Spring Boot Application using Spring Initializr with some dependencies (Spring Web, Spring Data JPA, MySQL Driver)

- Download and unzip the project.

- Set up the application.properties file (database configuration)

- Create Entity Models

- Create Repositories

- Create Services

- Create Controllers

- Implement Exception Handling

- Unit Testing with JUnit

Run the Application

- Run the backend application:

```
cd backend
./mvn spring-boot:run
```

- Run the frontend application:

```
cd frontend
npm start
```