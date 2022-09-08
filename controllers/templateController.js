const { parse } = require('json2csv');
const User = require('../models/user');
const mongoose = require('mongoose');
const csv = require('fast-csv'); // parses CSV files

exports.get_template = function(req, res, next) {
    const fields = ['email', 'password', 'admin'];
    const opts = { fields };
    const myData = '';

    try {
        const csv = parse(myData, opts);
        res.set("Content-Disposition", "attachment;filename=users.csv");
        res.set("Content-Type", "application/octet-stream");
        res.send(csv);
    } catch (err) {
        res.render('error', { error: err });
    }
}

exports.post_template = (req, res, next) => {
    if(!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    try{
        const userFile = req.files.file;
        const users = [];
        csv
        .fromString(userFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function(data){
            data['_id'] = new mongoose.Types.ObjectId();
            
            users.push(data);
        })
        .on("end", function(){
            User.create(users, function(err, documents) {
            if (err) throw err;
            });
            
            res.render('signup',{message: `${users.length} + authors have been successfully uploaded.`});
        });
    } catch (err) {
        res.render('error', { error: err });
    }
}