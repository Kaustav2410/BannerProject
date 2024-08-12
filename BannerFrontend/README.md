# Banner Project

## Overview

This project is a banner application where users can create, manage, and toggle banners. Each banner has a timer that makes it disappear when it reaches zero. Users can also update banners and control their visibility while visiting.

## Features

- **Create Banners**: Users can create new banners.
- **Banner Timer**: Banners disappear when the timer hits zero.
- **Update Banners**: Users can update existing banners.
- **Toggle Visibility**: Users can turn banners on or off while visiting.

## API Endpoints

- **GET /:id**: Retrieve a specific banner by its ID.
- **POST /create**: Create a new banner.
- **PATCH /:id**: Update an existing banner by its ID.

## Backend

The backend is developed using TypeScript and Express.js, with MySQL as the database and Prisma as the ORM for database interactions.

### Dependencies

- **@prisma/client**: Prisma Client for interacting with the database.
- **@types/cors**: TypeScript definitions for the CORS middleware.
- **@types/express**: TypeScript definitions for Express.js.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Web framework for building the server.
- **http-status-codes**: Utility for HTTP status codes.
- **prisma**: Prisma ORM for managing the database schema and migrations.

### Setup and Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Environment Variables**:
   Create a `.env` file and configure your database connection.

3. **Run Database Migrations**:
   ```bash
   npx prisma migrate dev
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **Start the Server**:
   ```bash
   npm start
   ```

## Frontend

The frontend is built with React.js and Redux for state management, styled using Tailwind CSS.

### Dependencies

- **@reduxjs/toolkit**: Redux toolkit for efficient state management.
- **axios**: Promise-based HTTP client for making API requests.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: React package for DOM-specific methods.
- **react-redux**: React bindings for Redux.
- **react-router-dom**: DOM bindings for React Router to handle routing.

### Setup and Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```
