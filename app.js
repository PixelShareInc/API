const fs = require('fs');
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
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.get('/', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    db.collection('quilt').find({}, {
      _id: false,
      color: true
    }).toArray((err, result) => {
      if (err) throw err;

      res.json(result);
      db.close();
    });
  });
});

app.get('/image', (req, res) => {
  fs.stat('./quilt.png', (err, stat) => {
    if (err) return res.send(err);

    res.sendFile(path.join(__dirname, 'quilt.png'), (err) => {
      if (err) console.error(err)
    });
  });
});

app.get('/quilt', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    db.collection('quilt').find({}).toArray((err, result) => {
      if (err) throw err;

      db.close();

      res.json(result);
    });
  });
});

io.on('connection', socket => {
  const ip = socket.request.connection.remoteAddress.slice(7);

  console.log(`${(new Date()).toUTCString()}: New connection from IP address: ${ip || '<Unknown>'}`);

  socket.on('clientUpdate', (doc, b, row, col, newColors) => {
    io.emit('serverUpdate', doc, b, row, col, newColors);

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;

      let query = {
        block_id: b,
        row_id: row
      };
      newColors = {
        $set: {
          color: newColors
        }
      };

      db.collection('quilt').update(query, newColors)
        .then(() => {
          db.close();

          console.log(`${(new Date()).toUTCString()}: ${ip || '<Unknown>'} updated pixel at block ${b}, row ${row}, column ${col}`);
        })
        .catch((err) => console.error(err));
    });
  });
});

function getSVG(b, row, col, color) {
  let x = ((b % 10) * 50) + col;

  let y = (Math.floor(b / 10) * 50) + row;

  return `<rect x="${x}" y="${y}" width="1" height="1" fill="#${color}" stroke-width="0" />`;
}

function writeImage() {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    db.collection('quilt').find({}, {
      _id: false,
      color: true
    }).toArray((err, result) => {
      if (err) throw err;

      (async () => {
        let svg = '<svg width="500" height="500" xmlns="https://www.w3.org/2000/svg" version="2" viewBox="0 0 500 500">';
        let iterator = 0;

        for (let b = 0; b < 100; b++) {
          for (let row = 0; row < 50; row++) {
            let rowColors = result[iterator].color.split(',');

            for (let col = 0; col < 50; col++) {
              svg += getSVG(b, row, col, rowColors[col]);
            }

            iterator++;
          }
        }
        svg += '</svg>';

        return svg;
      })()
      .then((svg) => svg2png(svg))
      .then((buffer) => fs.writeFile('quilt.png', buffer, (err) => {
        if (err) throw err;

        db.close();

        console.log(`${(new Date()).toUTCString()}: Imaged pixel quilt`);
      }))
      .catch((err) => console.error(err));
    });
  });
}

setInterval(() => writeImage(), 600000);

server.listen(port, () => console.log(`${(new Date()).toUTCString()}: Listening on port ${port}`));