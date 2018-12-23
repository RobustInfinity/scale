var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cloudinary = require('cloudinary')

var config = require('./config/index')
var sessionHandler = require('./config/utils/sessionHandler')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imageRouter = require('./routes/images')

//connecting to DB
mongoose.connect(config.DB_URL, {useNewUrlParser : true}).then(()=>{
    console.log("Successfully connected to MongoDB");
}).catch((err)=>{
    console.log("Unable to connect to MongoDB ",err);
})

cloudinary.config({
    cloud_name : config.CLOUD_NAME,
    api_key : config.API_KEY,
    api_secret : config.API_SECRET
})

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.use(function(request, response, next){
    console.log("Requesting url ", request.url)
    next();
})

//middleware checking for session for auth urls
app.use(sessionHandler.checkSession)


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/images',imageRouter)


app.listen(config.PORT, function(){
    console.log('Started Successfully at ' + config.PORT)
})

module.exports = app;
