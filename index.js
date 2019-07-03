require('dotenv').config();
const express           = require('express');
const bodyParser        = require('body-parser');
const hbs               = require('hbs');
const path              = require('path');
const { check, validationResult } = require('express-validator');
const PORT              = process.env.PORT || 3000;

// create express app
const app = express();

//register partials for hbs
hbs.registerPartials(__dirname + '/views/partials');

//regiter view engine for express
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/images', express.static('public/images'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});


// define a simple route
app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home Page'
    }); 
});

let contacts = require('./routes/contacts');

app.use('/contacts', contacts);

// listen for requests
app.listen(PORT, () => console.log('Listening on '+ PORT));