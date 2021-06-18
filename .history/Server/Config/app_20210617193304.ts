import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from '../Routes/index';
import clothingRouter from '../Routes/clothing';
//App configuration
const app = express(); //exports app as the default object of  this module
export default app;

//DB configuration
import * as DBConfig from "./db"
mongoose.connect(DBConfig.LocalURI,{useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error')); //On error
db.once('open',function()
{
  console.log(`Connected to mongoDB at: ${DBConfig.HostName}`);

}); //If connection was successful
// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Routing happens now
app.use('/', indexRouter);
app.use('/clothing-list', clothingRouter); //defines a new area of our website called clothing-list

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:express.Request, res:express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;