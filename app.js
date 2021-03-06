const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dataRouter = require('./routes/data');
const zlibRouter = require('./routes/zlib');
const serializeRouter = require('./routes/serialize');
const fileUpload = require('express-fileupload');
const app = express();
const cluster = require('cluster')
const child_process = require('child_process');

async function connectToDbMongo() {
    try {
        await mongoose.connect('mongodb', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    } catch (e) {
        console.log(e)
    }
}
async function connectToDbMyRedis() {}
async function connectToDbMemcached() {}
async function connectToDbMySql() {}
async function connectToDbPostgresql() {}
async function connectToDbFireBase() {}
async function connectToAzure() {}

connectToDbMongo()
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//TODO
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    createParentPath: true
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);
app.use('/zlib', zlibRouter);
app.use('/serialize', serializeRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
console.log(__dirname)
module.exports = app;