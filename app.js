var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var config = require('./config/index')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose.connect(config.DB_URL, {useNewUrlParser : true}).then(()=>{
    console.log("Successfully connected to MongoDB");
}).catch((err)=>{
    console.log("Unable to connect to MongoDB ",err);
})

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(config.PORT, function(){
    console.log('Started Successfully at ' + config.PORT)
})

module.exports = app;
