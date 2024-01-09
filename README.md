# VeriGate-Fullstack-App

The project involves the development of a full-stack web application utilizing both React for 
the front end and Node.js for the server side. The application begins with a user authentication flow, 
including login and registration pages. After user credentials are entered, the flow proceeds to an OTP 
generation page where OTPs are created and sent to users via email using the Google API. The server, 
implemented using Node.js with nodemon for automatic server restarts, stores user data in a JSON file. 
Upon successful OTP verification, users are redirected to a dashboard. This comprehensive setup 
encompasses user registration, login, secure OTP generation, and persistent data storage, providing a 
functional foundation for a secure and dynamic web application.

## Node.js Server
The Node.js server (server.js) provides the backend for user registration, login, OTP generation, verification, and PDF text extraction. It uses Express for handling HTTP requests, Nodemailer for sending emails, and otplib for OTP generation.

Endpoints:
POST /register: Register a new user.
POST /login: Authenticate a user.
POST /generate-otp: Generate and send OTP to the user's email.
POST /verify-otp: Verify the entered OTP.
POST /extract-pdf-text: Extract text from a PDF file.
React Application
The React application (Dashboard.js, Loginsignup.js, OTPComponent.js) provides a simple UI for user interaction. Users can register, log in, generate OTP, and extract text from a PDF.

## React Components:
Dashboard: Main dashboard with a form to input PDF paths and extract text.
Loginsignup: User registration and login page.
OTPComponent: OTP generation and verification page.

This project consists of a PDF reader implemented in Python and an OTP (One-Time Password) authentication system implemented in a Node.js server and a React application.

PDF Reader (Python)
The PDF reader script (pdf_reader.py) extracts text from a given PDF file using the PyMuPDF library. It can be used as a standalone script or integrated with other applications.

Dependencies--

Python Dependencies:
PyMuPDF (fitz)

Node.js Dependencies:
Express
Body-parser
Cors
Nodemailer
Google APIs
Multer

React Dependencies:
Axios
React Router
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Steps to run --

1) Install node - 
Use this link - https://nodejs.org/en/download
Install LTS and select the windows bit according to the system


Download the Project

Extract the Project

Open a Terminal or Command Prompt


1. For NODEJS SERVER --
	Navigate to the directory where you extracted the React app using the terminal or command prompt.
		cd nodeserver
	Install Dependencies:
		Run the following command to install the project dependencies using npm:
		npm install
	Run the following command - 
		pip install PyMuPDF
	Run the node Server -
		node index.js

2. For REACT APP --

	Navigate to the directory where you extracted the React app using the terminal or command prompt.
		cd react/my-app

	Install Dependencies:
		Run the following command to install the project dependencies using npm:
			npm install

	Start the Development Server:
		Once the dependencies are installed, start the development server by running:
			npm start

	View the App:
		Open your web browser and go to http://localhost:3000/ (or another port if specified in the console).
		You should see the React app running locally on your machine.

When you're done, go back to the terminal or command prompt where the development server is running and press Ctrl + C to stop it.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
