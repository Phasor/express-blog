const User = require('../models/user');
const mongoose = require('mongoose');
const csv = require('fast-csv'); // parses CSV files
const fs = require('fs');
const path = require('path');


exports.user_create_post = (req, res, next) => { 
    res.json({message: 'created post'});
}


exports.user_create_get = (req, res, next) => {
    res.render('signup');
}