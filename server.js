const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://boat:boat1234@ds159546.mlab.com:59546/test-database');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//router
app.use('/login', require('./routes/loginRouter'))
app.use('/register', require('./routes/registerRouter'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index'));
});

app.listen(port, function() {
    console.log('start port http://localhost:' + port + "/login");
});