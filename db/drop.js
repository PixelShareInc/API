const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/pixelshare';

MongoClient.connect(url, (err, db) => {
    if(err) console.error(new Error(err));

    db.collection('quilt').drop()
    .then(() => console.log('Quilt collection dropped!'))
    .then(() => db.collection('changes').drop())
    .then(() => console.log('Changes collection dropped!'))
    .then(() => db.close())
    .catch(err => console.error(err));
});
