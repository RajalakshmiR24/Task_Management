# MERN Task Management Application

This is a simple MERN stack application that allows users to log in and manage a list of tasks. Users can sign up, log in, add new tasks, view their tasks, and perform CRUD operations on their tasks.

### Features:
- User Authentication (Sign Up & Log In)
- Task Management (CRUD operations)
- JWT-based authentication
- Input validation for task creation

## Technologies Used:
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **User Password Hashing**: bcrypt.js
- **Validation**: Joi / express-validator

## Project Setup

### 1. Clone the Repository
Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/mern-task-app.git
    cd mern-task-app
  
## 2. Backend Setup

### Install Dependencies:
Navigate to the backend directory and install the required dependencies.

    ```bash
    cd backend
    npm install

## 3. Configure Environment Variables:
Create a .env file in the backend directory and add the following environment variables:

    ```bash
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    PORT=5000
    
-MONGODB_URI: Your MongoDB connection string.
-JWT_SECRET: A secret key for JWT token generation.
-PORT: The port where your backend will run (default: 5000).

## 4. Start the Backend Server:
Run the following command to start the backend server:

    bash
    npm start
The backend will now be running at http://localhost:5000.

## 5. Frontend Setup
Install Dependencies:
Navigate to the frontend directory and install the required dependencies:

        bash

        cd frontend
        npm install

Configure API URL:
Ensure that the frontend is pointing to the correct backend URL by updating the API_URL in the frontend configuration file (if necessary).

Start the Frontend Server:
Run the following command to start the frontend development server:

    bash
    npm start
The frontend will now be running at http://localhost:3000.

![image](https://github.com/user-attachments/assets/450c10b9-3b41-4c1a-9423-e35d7ae4054a)

![image](https://github.com/user-attachments/assets/52cefdeb-93c9-46cd-95ac-528260dd92ca)

![Task Management __ LemonPay_file](https://github.com/user-attachments/assets/0c59dab8-ce57-415e-85f7-291ae233a5a3)

![Task Management](https://github.com/user-attachments/assets/75954f85-9386-47bf-b78f-aea88b200a9a)
