# Todo List API

A RESTful API built with NestJS, TypeScript, TypeORM, MySQL, and JWT for managing user authentication and todo lists. This project implements secure user authentication, CRUD operations for todos, pagination, filtering, sorting.This project is implemented based on [Todo List API project on roadmap.sh](https://roadmap.sh/projects/todo-list-api)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)

## Features

- **User Authentication**: Register and login with JWT-based authentication.
- **Todo Management**: Create, read, update, and delete todo items with user-specific access control.
- **Pagination, Filtering, and Sorting**: Retrieve todo lists with pagination, filter by title, and sort by ID.
- **Security**: Password hashing with bcrypt, JWT token validation.
- **Data Validation**: Request validation using class-validator.
- **Database**: MySQL with TypeORM for schema management and migrations.

## Technologies

- **NestJS**: A progressive Node.js framework for building scalable server-side applications.
- **TypeScript**: For type safety and improved developer experience.
- **TypeORM**: ORM for MySQL database operations.
- **MySQL**: Relational database for storing users and todos.
- **JWT**: JSON Web Tokens for secure authentication.
- **Passport**: Authentication middleware for JWT strategy.
- **bcrypt**: For password hashing.
- **class-validator**: For request validation.

## Project Structure

```bash
src/
├── app.module.ts
├── main.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── jwt.strategy.ts
│   └── dto/
│       ├── login.dto.ts
│       ├── register.dto.ts
├── common/
│   ├── guards/
│   │   └── auth.guard.ts
├── config/
│   └── typeorm.config.ts
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── entities/
│       └── user.entity.ts
├── todos/
│   ├── todos.module.ts
│   ├── todos.service.ts
│   ├── todos.controller.ts
│   ├── entities/
│   │   └── todo.entity.ts
│   └── dto/
│       ├── create-todo.dto.ts
│       ├── update-todo.dto.ts
├── .env
├── tsconfig.json
└── README.md
```

## Installation

```bash
git clone https://github.com/dtduc-ptit/Todo-List-API.git
cd Todo-List-API
npm install
```
## Configuration

Create a .env file by copying the example and adding your configuration:

```bash
cp .env
```
Edit .env with your MySQL credentials and JWT secret:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_name
JWT_SECRET=your_jwt_secret
```

## Running the API

Start the development server:

```bash
npm run start:dev
```
The API will be available at http://localhost:3000.

## API Endpoints

Below is a summary of the available endpoints. All endpoints except /auth/Register and /auth/Login require a JWT token in the Authorization header (Bearer <token>).

| Method | Endpoint       | Description                               |
| ------ | -------------- | ----------------------------------------- |
| POST   | register | Register a new user                       |
| POST   | login    | Login and get tokens                      |
| POST   | /todos         | Create a new todo (authenticated)         |
| GET    | /todos         | Get paginated, filtered, and sorted todos |
| PUT    | /todos/:id    | Update a todo (authenticated, authorized) |
| DELETE | /todos/:id    | Delete a todo (authenticated, authorized) |
