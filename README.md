# Task Manager Application

## Overview
This is a full-stack task manager application built with:
- **Frontend:** Vue.js (App)
- **Backend:** NestJS (Server)
- **Database:** PostgreSQL
- **Authentication:** JWT
- **API Documentation:** Swagger

## Features
- User authentication (JWT)
- CRUD operations for tasks
- Pagination for task retrieval
- Tasks are associated with users
- API validation and error handling
- Swagger documentation for API testing

## Installation

### Backend (Server) Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/batsdk/task-manager-vue-nest.git
   cd server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `server` root directory and add:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=123456
   DB_NAME=taskdb
   JWT_SECRET=supersecretkey
   ```

4. Run database migrations (if using TypeORM migrations):
   ```sh
   npm run migration:run
   ```

5. Start the backend server:
   ```sh
   npm run start:dev
   ```

6. API documentation can be accessed at:
   ```
   http://localhost:3000/api/docs
   ```

### Frontend (App) Setup
1. Navigate to the frontend directory:
   ```sh
   cd app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `app` root directory and add:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. Start the frontend application:
   ```sh
   npm run dev
   ```

5. The frontend will be available at:
   ```
   http://localhost:5173
   ```

## API Documentation
Once the backend is running, you can access the API documentation via Swagger at:
```
http://localhost:3000/api/docs
```
This allows you to test all API endpoints directly from the browser.

## Contributing
Feel free to submit issues or pull requests if you find any improvements.

## License
This project is licensed under the MIT License.

