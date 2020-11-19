require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const { MongoClient } = require('mongodb');

// Instruct mongoose to connect to your local MongoDB instance.
// mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true });

// Instruct mongoose to connect to MongoDB Atlas Cluster                         
const url = process.env.MONGODB_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Instruct client to connect to MongoDB Atlas Cluster
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// The database to use
/*
const dbName = 'my-blog';

async function run() {
    try {
        //await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection 'blog-data'
        const col = db.collection('blog-data');

        // Construct a document
        let userDocument = {

        }

        // Insert a single document, wait for promise so we can read it back
        const u = await col.insertOne(userDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);
*/

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