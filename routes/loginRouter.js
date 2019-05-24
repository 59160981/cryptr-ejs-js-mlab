const express = require('express')
const Router = express.Router()
const User = require('../models/user')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

Router.route('/').get(function (req, res) {
    res.render('login', { err: "" })
});

Router.route("/").post(function (req, res) {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username: username }, function (err, user) {
        if (user) {
            if (password == cryptr.decrypt(user.password)) {
                console.log("login success")
            } else {
                res.render('login', { err: "password ผิด" })
            }
        }else{
            res.render('login', { err: "ข้อมูลไม่ถูกต้อง" })
        }
    })
})


module.exports = Router