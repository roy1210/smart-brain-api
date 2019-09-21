const express = require('express');
// get JSON body
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
// Allow to access from any domain (Security)
const cors = require('cors');
// SQL builder works with Node
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    // 127.0.0.1: means local host
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'smart-brain1'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(db.users);
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
