const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Instruct mongoose to connect to your local MongoDB instance.
mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true });

// Enable Promises for mongoose (for easier async operations).
mongoose.Promise = Promise;

const app = express();

app.use(morgan('dev'));  
app.use(bodyParser.urlencoded({ extended: false }));            
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');
                
app.get('/', (req, res) => {
    res.render('index');
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));

app.use('/api/blogs', require('./routes/blogs'));
                
module.exports = app;