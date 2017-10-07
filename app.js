const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const svg2png = require('svg2png');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/pixelshare';

const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('/'));

app.get('/', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;

        db.collection('quilt').find({}, { _id: false, color: true }).toArray((err, result) => {
            if(err) throw err;
            res.json(result);
            db.close();
        });
    });
});

app.get('/image', (req, res) => {
    let svg = '<svg width="500" height="500" xmlns="https://www.w3.org/2000/svg" version="2">';
    let iterator = 0;

    MongoClient.connect(url, (err, db) => {
        if(err) throw err;

        db.collection('quilt').find({}, { _id: false, color: true }).toArray((err, result) => {
            if(err) throw err;

            Promise.resolve()
            .then(() => {
                for(let r = 0; r < 1; r++){
                    for(let b = 0; b < 100; b++){
                        for(let row = 0; row < 50; row++){
                            let rowColors = result[iterator].color.split(',');

                            for(let col = 0; col < 50; col++){
                                svg += getSVG(r, b, row, col, rowColors[col]);
                            }

                            iterator++;
                        }
                    }
                }
            })
            .then(() => svg += '</svg>')
            .then(() => svg2png(svg))
            .then(buffer => res.send(buffer))
            .catch(err => console.error(err));

            db.close();
        });
    });
});

function getSVG(r, b, row, col, color){
    let x = ((r % 3) * 500)
        + ((b % 10) * 50)
        + col;

    let y = (Math.floor(r / 3) * 500)
        + (Math.floor(b / 10) * 50)
        + row;

    return `<rect x="${x}" y="${y}" width="1" height="1" fill="#${color}" stroke-width="0" />`;
}

app.get('/test', (req, res) => {
    res.send('Test route working');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
