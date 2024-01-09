const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const otplib = require('otplib');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());

// Multer middleware to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const CLIENT_ID = 'ENTER YOUR CLIENT ID'
const CLIENT_SECRET = 'ENTER YOUR CLIENT_SECRET'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = 'ENTER YOUR API REFRESH TOKEN'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const usersFilePath = 'F:/t__project/nodeserver/users.json';

function generateOTP() {
    const secret = otplib.authenticator.generateSecret();
    const otp = otplib.authenticator.generate(secret);
    return otp;
  }
  function generateAPIToken() {
    // Generate a UUID (Universally Unique Identifier) as the API token
    const apiToken = uuidv4();
    return apiToken;
}
app.post('/register',(req,res)=>{
    const{username, password} = req.body;
    const users = loadUsers();

    if(users.find(user => user.username == username)){
        return res.status(400).json({ error: 'Username already taken.' });
    }
    const apiToken = generateAPIToken();
    users.push({username, password, apiToken});
    saveUsers(users);
    res.json({ message: 'User registered successfully.' });
})

app.post('/login', (req,res)=>{
    const {username, password} = req.body;
    const users = loadUsers();

    // Check if the username and password match
    const user = users.find(user => user.username === username && user.password === password);
  
    if (user) {
      res.json({ message: 'Login successful.' });
    } else {
      res.status(401).json({ error: 'Invalid credentials.' });
    }

})
app.post('/generate-otp', async (req, res) => {
  const { username } = req.body;
  // console.log('Request Body:', req.body); 
  const users = loadUsers();

  const user = users.find(user => user.username === username);

  if (!user) {
      return res.status(404).json({ error: 'User not found.' });
  }

  // Generate OTP
  const generatedOTP = generateOTP();

  // Store the OTP with the user
  user.otp = generatedOTP;

  // Save the updated users array
  saveUsers(users);
  console.log('otp generated');
  // let a = user.username;
  // console.log(a);


  // Send OTP via email
  try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              type: 'OAuth2',
              user: 'MAIL ID WHICH HAS ACCESS TO GMAIL API',
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
          },
      });

      const mailOptions = {
          from: 'One Time Password <MAIL ID WHICH HAS ACCESS TO GMAIL API>',
          to: user.username,
          subject: 'Your OTP Code',
          text: `Your OTP is: ${generatedOTP}`,
          html: `<h1>Your OTP is: ${generatedOTP}</h1>`,
      };

      const result = await transport.sendMail(mailOptions);
      console.log('Email sent result:', result);
  } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send OTP via email.' });
  }

  res.json({ otp: generatedOTP });
  console.log('Generate OTP request received.');
});

app.post('/verify-otp', (req, res) => {
  const { username, enteredOTP } = req.body;
  const users = loadUsers();

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  // Check if enteredOTP matches the stored OTP
  if (enteredOTP === user.otp) {
    // Clear the OTP after successful verification
    user.otp = '';
    saveUsers(users);

    // You might want to perform additional actions upon successful verification

    res.json({ verificationResult: true });
  } else {
    res.json({ verificationResult: false });
  }
});

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.post('/extract-pdf-text', (req, res) => {
  const { pdfPath } = req.body;
  const pythonProcess = spawn('python', ['E:/t_project/nodeserver/extract_text.py', pdfPath]);

  let pdfText = '';
  let error = '';

  pythonProcess.stdout.on('data', (data) => {
    pdfText += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
    error += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.json({ success: true, pdfText });
    } else {
      console.error(`Failed to extract text from PDF. Error: ${error}`);
      res.json({ success: false, message: 'Failed to extract text from PDF' });
    }
  });
});

app.listen(port,()=>{
    console.log(`server is running at at ${port}`)
})

function loadUsers(){
    try{
        const usersData = fs.readFileSync(usersFilePath,'utf-8');
        return JSON.parse(usersData);
    }catch (error) {
        return [];
    }
}
function saveUsers(users) {
    const usersData = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFilePath, usersData);
  }
