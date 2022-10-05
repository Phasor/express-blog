const Post = require('../models/post');
const csv = require('fast-csv'); // parses CSV files
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

async function main() {
    // connect to db
    const mongoDB = process.env.DB_STRING_TEST;
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    

    // read csv file
    const posts = [];
    fs.createReadStream(path.join(__dirname, '/posts.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', function(data) {
            data['_id'] = new mongoose.Types.ObjectId();
            data['author'] = new mongoose.Types.ObjectId();
            data['date'] = Date.now();
            data['published'] = Boolean(data.published);
            posts.push(data);
        })
        .on('end', async function(){
            // insert posts into db
            Post.insertMany(posts, function(err, documents) {
                if (err) {
                    console.log(err);
                }
            });
            console.log(`${posts.length} + posts have been successfully uploaded.`);
            return;
        });
}

main().catch((error) => {
    console.error(error);
    process.exit();
  });

