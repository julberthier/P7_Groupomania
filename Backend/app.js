const express = require('express');
const helmet = require("helmet");
const session = require('express-session');
const rateLimit = require('express-rate-limit');


const app = express();

const rateLimiterUsingThirdParty = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 100,
    message: 'You have exceeded the 100 requests in 24 hrs limit!', 
    headers: true,
  });
  
  app.use(rateLimiterUsingThirdParty)
  
  var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  
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

//HEADERS
app.use((req, res, next) => {
	res.setHeader(
		"Access-Control-Allow-Origin", "*"
		);
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
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;