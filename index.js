const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//DB connections
const db = require('./config/keys').MongoURI;


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Body Parser
app.use(express.urlencoded({extended: false}));

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/assets', express.static(__dirname + 'public/assets'));

/* Routes */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected Successfully...'))
  .catch(err => console.log(err));


const port = 3000 || process.env.port;

app.listen(port, console.log(`server started on port ${port}`));