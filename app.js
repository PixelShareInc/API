const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/pixelshare';

const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;

        db.collection('quilt').find({}, { _id: false, color: true }).toArray((err, result) => {
            if(err) throw err;
            res.json(result);
            db.close();
        });
    });
});

app.use('/test', (req, res) => {
    res.send('Test route working');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
