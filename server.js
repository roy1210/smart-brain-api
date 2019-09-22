const express = require('express');
// get JSON body
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
// Allow to access from any domain (Security)
const cors = require('cors');
// SQL builder works with Node
const knex = require('knex');
// Security, Can get client's header information
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

console.log(process.env.POSTGRES_URI);
const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
  // {
  // 127.0.0.1: means local host
  // host: process.env.POSTGRES_HOST,
  // user: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  // database: 'smart-brain1'
  // database: process.env.POSTGRES_DB
  // }
});

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("It's working");
});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

/*
morgan shows below (client info) in terminal
[21/Sep/2019:10:19:27 +0000] "GET / HTTP/1.1" 200 12 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
*/
