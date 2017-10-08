const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/pixelshare';
const quilt = [];
const colors = [
    'ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4',
    'd4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff,d4d4d4,ffffff'
];
let select;

function createSeed() {
    for(let b = 0; b < 100; b++){
        for(let row = 0; row < 50; row++){
            select = row % 2;

            quilt.push({
                block_id: b,
                row_id: row,
                color: colors[select]
            });
        }
    }
}

function seedDB() {
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        db.collection('quilt').insertMany(quilt, (err, res) => {
            if(err) throw err;

            console.log('Number of documents inserted: ' + res.insertedCount);
            db.close();
        });
    });
}

Promise.resolve()
    .then(() => createSeed())
    .then(() => seedDB())
    .catch(err => console.error(err));
