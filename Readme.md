# IntelliSqrApp Documentation

## **Overview**
IntelliSqrApp is a full-stack web application built with a modern tech stack. It provides user authentication, user management, and secure API endpoints. The application is designed to demonstrate best practices in full-stack development, including state management, API integration, and secure backend implementation.

---

## **Features**
### **Frontend**
1. **User Authentication**:
   - Login and registration with form validation.
   - Password hashing and secure token-based authentication.

2. **User Management**:
   - Display a list of all registered users in a table.
   - Delete the logged-in user's account.

3. **Protected Routes**:
   - Certain routes are accessible only to authenticated users.

4. **Responsive UI**:
   - Built with Tailwind CSS for a modern and responsive design.

5. **Error Handling**:
   - User-friendly error messages for API failures and form validation errors.

---

### **Backend**
1. **Authentication**:
   - JWT-based authentication with secure cookie storage.
   - Middleware to protect routes and validate tokens.

2. **User Management**:
   - Fetch all users.
   - Delete the logged-in user's account.

3. **Error Handling**:
   - Centralized error-handling middleware for consistent error responses.

4. **Database**:
   - MongoDB integration using Prisma ORM for user data management.

---

## **Tech Stack**
### **Frontend**
- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **React Query**: For data fetching, caching, and state management.
- **React Hook Form**: For form validation and management.
- **Zod**: For schema validation.
- **Tailwind CSS**: For styling.
- **Vite**: For fast development and build tooling.

### **Backend**
- **Node.js**: For building the server.
- **Express**: For creating RESTful APIs.
- **Prisma**: For database ORM.
- **MongoDB**: For storing user data.
- **JWT**: For authentication.
- **bcrypt**: For password hashing.

---

## **Project Structure**
### **Frontend**
```
src/
  ├── assets/                # Static assets
  ├── components/            # Reusable UI components
  ├── context/               # Global state management (AuthContext)
  ├── hooks/                 # Custom React hooks
  ├── pages/                 # Page components (Login, Register, UserManagement)
  ├── routes/                # Application routes
  ├── services/              # API service functions
  ├── App.tsx                # Main application component
  ├── index.css              # Global styles
  ├── main.tsx               # Application entry point
```

### **Backend**
```
src/
  ├── controllers/           # API controllers
  ├── db/                    # Prisma database client
  ├── middleware/            # Middleware for error handling and route protection
  ├── routes/                # API routes
  ├── utils/                 # Utility functions (e.g., token generation)
  ├── index.ts               # Application entry point
prisma/
  ├── schema.prisma          # Prisma schema for MongoDB
```

---

## **How to Initialize the Project in a Local Environment**

### **Prerequisites**
1. **Node.js**: Ensure you have Node.js installed (v16 or higher).
2. **MongoDB**: Set up a MongoDB instance (local or cloud).
3. **Environment Variables**:
   - Create a .env file in the backend directory with the following variables:
     ```
     MONGODBURL=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     NODE_ENV=development
     ```

---

### **Steps to Run the Project**

#### **1. Clone the Repository**
```bash
git clone <repository_url>
cd IntelliSqrApp
```

#### **2. Install Dependencies**
- **Frontend**:
  ```bash
  cd frontend
  npm install
  ```

- **Backend**:
- Go to the topmost path where the repository is cloned
  ```bash
  npm install
  ```

#### **3. Set Up the Database**
- **Prisma Setup**:
  ```bash
  cd backend
  npx prisma generate
  ```

#### **4. Start the Backend**
```bash
cd backend
npm run dev
```
The backend server will start at `http://localhost:5000`.

#### **5. Start the Frontend**
```bash
cd frontend
npm run dev
```
The frontend application will start at `http://localhost:5173`.

---

## **API Endpoints**
### **Authentication**
- **POST `/api/auth/register`**: Register a new user.
- **POST `/api/auth/login`**: Login a user.
- **POST `/api/auth/me`**: Get the logged-in user's details.
- **POST `/api/auth/logout`**: Logout the user.

### **User Management**
- **GET `/api/user/details`**: Fetch all users.
- **DELETE `/api/user/remove-details`**: Delete the logged-in user's account.

---

## **Frontend Features**
### **Login Page**
- **Path**: `/login`
- **Description**: Allows users to log in with their email and password.
- **Validation**:
  - Email must be in a valid format.
  - Password must be at least 6 characters.

### **Register Page**
- **Path**: `/register`
- **Description**: Allows users to register a new account.
- **Validation**:
  - Email must be in a valid format.
  - Password must be at least 6 characters.
  - Password and confirm password must match.

### **User Management Page**
- **Path**: `/user-management`
- **Description**: Displays a list of all users and allows the logged-in user to delete their account.
- **Protected**: Only accessible to authenticated users.

---

## **Backend Features**
### **Authentication**
- **JWT-Based Authentication**:
  - Tokens are stored in HTTP-only cookies for security.
  - Middleware (`protectRoutes`) ensures that protected routes are only accessible to authenticated users.

### **Error Handling**
- Centralized error handling using `errorMiddleware`.

### **Database**
- **Prisma ORM**:
  - MongoDB integration for user data management.
  - Schema defined in `prisma/schema.prisma`.

---

## **Development Notes**
- **Frontend**:
  - Uses React Query for efficient data fetching and caching.
  - Tailwind CSS for responsive and modern UI design.

- **Backend**:
  - Prisma ORM simplifies database operations.
  - Middleware ensures secure and clean API endpoints.

---

## **Future Enhancements**
1. **Role-Based Access Control**:
   - Add roles (e.g., admin, user) for more granular permissions.

2. **Pagination**:
   - Implement pagination for the user list.

3. **Unit Tests**:
   - Add unit tests for both frontend and backend.

4. **Deployment**:
   - Deploy the application to a cloud platform (e.g., Vercel for frontend, AWS for backend).

---

This documentation provides a comprehensive overview of the IntelliSqrApp project, including its features, tech stack, and setup instructions. Let me know if you need further assistance!The frontend application will start at `http://localhost:5173`.

---

## **API Endpoints**
### **Authentication**
- **POST `/api/auth/register`**: Register a new user.
- **POST `/api/auth/login`**: Login a user.
- **POST `/api/auth/me`**: Get the logged-in user's details.
- **POST `/api/auth/logout`**: Logout the user.

### **User Management**
- **GET `/api/user/details`**: Fetch all users.
- **DELETE `/api/user/remove-details`**: Delete the logged-in user's account.

---

## **Frontend Features**
### **Login Page**
- **Path**: `/login`
- **Description**: Allows users to log in with their email and password.
- **Validation**:
  - Email must be in a valid format.
  - Password must be at least 6 characters.

### **Register Page**
- **Path**: `/register`
- **Description**: Allows users to register a new account.
- **Validation**:
  - Email must be in a valid format.
  - Password must be at least 6 characters.
  - Password and confirm password must match.

### **User Management Page**
- **Path**: `/user-management`
- **Description**: Displays a list of all users and allows the logged-in user to delete their account.
- **Protected**: Only accessible to authenticated users.

---

## **Backend Features**
### **Authentication**
- **JWT-Based Authentication**:
  - Tokens are stored in HTTP-only cookies for security.
  - Middleware (`protectRoutes`) ensures that protected routes are only accessible to authenticated users.

### **Error Handling**
- Centralized error handling using `errorMiddleware`.

### **Database**
- **Prisma ORM**:
  - MongoDB integration for user data management.
  - Schema defined in `prisma/schema.prisma`.

---

## **Development Notes**
- **Frontend**:
  - Uses React Query for efficient data fetching and caching.
  - Tailwind CSS for responsive and modern UI design.

- **Backend**:
  - Prisma ORM simplifies database operations.
  - Middleware ensures secure and clean API endpoints.

---

## **Future Enhancements**
1. **Role-Based Access Control**:
   - Add roles (e.g., admin, user) for more granular permissions.

2. **Pagination**:
   - Implement pagination for the user list.

3. **Unit Tests**:
   - Add unit tests for both frontend and backend.

4. **Deployment**:
   - Deploy the application to a cloud platform (e.g., Vercel for frontend, AWS for backend).

---

This documentation provides a comprehensive overview of the IntelliSqrApp project, including its features, tech stack, and setup instructions. Let me know if you need further assistance!
