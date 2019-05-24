const express = require('express')
const Router = express.Router()
const User = require('../models/user')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

Router.route('/').get(function (req, res) {
    res.render('register', { err: "" })
})

Router.route('/').post(function (req, res) {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username: username }, function (err, userInServer) {
        if (userInServer) {
            res.render('register', { err: "username ซ้ำ" })
        } else {
            const data = new User({ username: username, password: cryptr.encrypt(password) })
            data.save()
            res.redirect('/login')
        }
    })
})

module.exports = Router