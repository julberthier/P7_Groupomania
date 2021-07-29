require('dotenv').config();

const express = require('express');
const helmet = require("helmet");
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const path = require('path');
const cors = require("cors");
const mysql = require('mysql2');

//ROUTES 
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();

// const rateLimiterUsingThirdParty = rateLimit({
//     windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
//     max: 100,
//     message: 'You have exceeded the 100 requests in 24 hrs limit!', 
//     headers: true,
//   });
  
// app.use(rateLimiterUsingThirdParty)
  
let expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  
  //COOKIES
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret : 's3Cur3',
    name : 'sessionId',
    httpOnly: true,
    resave: true,
    saveUninitialized: true,
    expires: expiryDate
  })
);

app.use(helmet());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,  
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connexion à la base de donnée MySQL réussie !");
});

//HEADERS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
		);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
		);
	next();
});

app.use(express.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/groupomania/post', postRoutes);
app.use('/api/groupomania/user', userRoutes);

module.exports = app;