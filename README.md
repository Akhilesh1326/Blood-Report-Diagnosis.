# Blood Report Diagnosis Website

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This is a Blood Report Diagnosis website designed to help users upload and analyze blood reports. The website offers user registration and login functionality, along with the ability to save the history of uploaded reports. The frontend is built using React with Vite and Tailwind CSS, while the backend is powered by Node.js, Express, Tesseract, and Multer. The application also integrates with the Gemini API for additional functionality and uses MySQL for data storage.

## Features
- User Registration and Login
- Upload and Analyze Blood Reports
- Save and View History of Reports
- Report Analysis using Tesseract OCR
- Secure File Uploads with Multer
- Integration with Gemini API

## Technologies Used
- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - React Router DOM

- **Backend:**
  - Node.js
  - Express
  - Tesseract
  - Multer
  - Gemini API

- **Database:**
  - MySQL

## Installation

### Prerequisites
- Node.js
- MySQL
- Git

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/blood-report-diagnosis.git
    cd blood-report-diagnosis
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Set up the MySQL database:
    - Create a MySQL database.
    - Update the database configuration in `backend/config/dbConfig.js` with your database credentials.

4. Run database migrations (if any).

5. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

2. Start the frontend development server:
    ```bash
    npm run dev
    ```

### Environment Variables
Create a `.env` file in the `backend` directory and add the following environment variables:


## Usage
1. Open your browser and navigate to `http://localhost:3000` for the frontend.
2. Register a new user or log in with existing credentials.
3. Upload a blood report and analyze it.
4. View the history of uploaded reports.