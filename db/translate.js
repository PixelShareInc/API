const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/pixelshare';

const currentQuilt = require('./oldquilt');

let bigQuilt = [];
let newQuilt = [];
let iterator = 0;

Promise.resolve()
.then(() => {
    for(let row = 0; row < 500; row++) {
        bigQuilt.push(['']);
    }
})
.then(() => {
    for(let y = 0; y < 8; y++) {
        for(let x = 0; x < 8; x++) {
            for(let row = 0; row < 32; row++) {
                let key = 'row_' + (row + 1);
                let loc = (y * 32) + row;

                bigQuilt[loc] += currentQuilt.data[iterator][key];
            }

            iterator++;
        }
    }
})
.then(() => {
    for(let i = 0; i < 256; i++) {
        for(let j = 0; j < 244; j++) {
            let color;

            if(i % 2) color = j % 2 ? 'E' : 'O';
            else color = j % 2 ? 'O' : 'E';

            bigQuilt[i] += color;
        }
    }
})
.then(() => {
    for(let i = 256; i < 500; i++) {
        for(let j = 0; j < 500; j++) {
            let color;

            if(i % 2) color = j % 2 ? 'E' : 'O';
            else color = j % 2 ? 'O' : 'E';

            bigQuilt[i] += color;
        }
    }
})
.then(() => {
    for(let block = 0; block < 100; block++) {
        for(let row = 0; row < 50; row++) {
            let rowLoc = (Math.floor(block / 10) * 50) + row;
            let colLoc = (block % 10) * 50;

            let colors = bigQuilt[rowLoc].substr(colLoc, 50);

            newQuilt.push({
                block_id: block,
                row_id: row,
                color: colors
            });
        }
    }
})
.then(() => {
    newQuilt.forEach(row => {
        let newRow = ''

        for(let col = 0; col < row.color.length; col++) {
            switch(row.color[col]){
                case 'A':
                    newRow += '247a23,';
                    break;
                case 'B':
                    newRow += '30bf2e,';
                    break;
                case 'C':
                    newRow += '269e8c,';
                    break;
                case 'D':
                    newRow += '205988,';
                    break;
                case 'P':
                    newRow += '37abe4,';
                    break;
                case 'F':
                    newRow += '8300dc,';
                    break;
                case 'G':
                    newRow += 'ac0f5f,';
                    break;
                case 'H':
                    newRow += 'f42618,';
                    break;
                case 'I':
                    newRow += 'e9671d,';
                    break;
                case 'J':
                    newRow += 'f29221,';
                    break;
                case 'K':
                    newRow += 'ff78e9,';
                    break;
                case 'L':
                    newRow += 'ffcd94,';
                    break;
                case 'M':
                    newRow += 'f0ee4d,';
                    break;
                case 'N':
                    newRow += '8b4513,';
                    break;
                case 'O':
                    newRow += 'ffffff,';
                    break;
                case 'E':
                    newRow += 'd4d4d4,';
                    break;
                case 'Q':
                    newRow += '868686,';
                    break;
                case 'R':
                    newRow += '000000,';
                    break;
                default:
                    newRow += 'ffffff,';
            }
        }

        row.color = newRow.slice(0, -1);
    });
})
.then(() => {
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        db.collection('quilt').insertMany(newQuilt, (err, res) => {
            if(err) throw err;

            console.log('Number of documents inserted: ' + res.insertedCount);
            db.close();
        });
    });
})
.catch(err => console.error(err));
