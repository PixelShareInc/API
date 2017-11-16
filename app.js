const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const svg2png = require('svg2png');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DBURL || 'mongodb://localhost/pixelshare';

const port = process.env.PORT || 3001;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

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
    let svg = '<svg width="500" height="500" xmlns="https://www.w3.org/2000/svg" version="2" viewBox="0 0 500 500">';
    let iterator = 0;

    MongoClient.connect(url, (err, db) => {
        if(err) throw err;

        db.collection('quilt').find({}, { _id: false, color: true }).toArray((err, result) => {
            if(err) throw err;

            Promise.resolve()
            .then(() => {
                for(let b = 0; b < 100; b++){
                    for(let row = 0; row < 50; row++){
                        let rowColors = result[iterator].color.split(',');

                        for(let col = 0; col < 50; col++){
                            svg += getSVG(b, row, col, rowColors[col]);
                        }

                        iterator++;
                    }
                }
                svg += '</svg>';
            })
            .then(() => svg2png(svg, { width: 3000, height: 3000 }))
            .then(buffer => res.send(buffer))
            .catch(err => console.error(err));

            db.close();
        });
    });
});

function getSVG(b, row, col, color){
    let x = ((b % 10) * 50) + col;

    let y = (Math.floor(b / 10) * 50) + row;

    return `<rect x="${x}" y="${y}" width="1" height="1" fill="#${color}" stroke-width="0" />`;
}

io.on('connection', socket => {
    console.log('Connect from IP address: ' + socket.request.connection.remoteAddress.slice(7));

    socket.on('clientUpdate', (doc, b, row, col, newColors) => {
        io.emit('serverUpdate', doc, b, row, col, newColors);

        MongoClient.connect(url, (err, db) => {
            if(err) throw err;

            let query = { block_id: b, row_id: row };
            newColors = { $set: { color: newColors } };

            db.collection('quilt').update(query, newColors)
            .then(result => {
                let now = new Date();

                console.log(`${now.toString()}:  ${socket.request.connection.remoteAddress.slice(7)} Updated pixel at block ${b}, row ${row}, column ${col}`);

                db.close();
            })
            .catch(err => console.error(err));
        });
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
