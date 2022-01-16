const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

//EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/assets', express.static(__dirname + 'public/assets'));

/* Routes */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const port = 3000 || process.env.port;

app.listen(port, console.log(`server started on port ${port}`));