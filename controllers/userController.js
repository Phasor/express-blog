const User = require('../models/user');
//const { parse } = require('json2csv');
const mongoose = require('mongoose');
const csv = require('fast-csv'); // parses CSV files
const fs = require('fs');
const path = require('path');


exports.user_create_post = (req, res, next) => {
    // const user = new User({
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // user.save((err) => {
    //     if (err) { 
    //         return res.render('/user', { error: err });
    //     }
    //      res.render('/user');
    // });

    if(!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    try{
        const userFile = req.files.file;
        const users = [];

        fs.createReadStream(userFile)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', function(data) {
                data['_id'] = new mongoose.Types.ObjectId();
                
                users.push(data);
            })
            .on('end', function(){
                User.create(users, function(err, documents) {
                    if (err) throw err;
                });

                res.render('signup',{message: `${users.length} + authors have been successfully uploaded.`});
            });
    } catch (err) {
        res.render('error', { error: err });
    }
}


//         csv
//         .fromString(userFile.data.toString(), {
//             headers: true,
//             ignoreEmpty: true
//         })
//         .on("data", function(data){
//             data['_id'] = new mongoose.Types.ObjectId();
            
//             users.push(data);
//         })
//         .on("end", function(){
//             User.create(users, function(err, documents) {
//             if (err) throw err;
//             });
            
//             res.render('signup',{message: `${users.length} + authors have been successfully uploaded.`});
//         });
//     } catch (err) {
//         res.render('error', { error: err });
//     }
// }

exports.user_create_get = (req, res, next) => {
    res.render('signup');
}