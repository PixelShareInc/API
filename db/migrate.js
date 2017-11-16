const MongoClient = require('mongodb').MongoClient;
const url = process.env.DBURL || 'mongodb://localhost/pixelshare';

MongoClient.connect(url, (err, db) => {
    if(err) console.error(err);

    db.createCollection('quilt')
    .then(() => console.log('Quilt collection created!'))
    .then(() => db.createCollection('changes'))
    .then(() => console.log('Changes collection created!'))
    .then(() => db.close())
    .catch(err => console.error(err));
});
