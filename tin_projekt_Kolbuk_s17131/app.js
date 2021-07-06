var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authUtils = require('./util/authUtils');
const i18n = require('i18n');


var indexRouter = require('./routes/index');
const employeeRouter = require('./routes/employeeRoute');
const trainingRouter = require('./routes/trainingRoute');
const trainingHistoryRouter = require('./routes/trainingHistoryRoute');
const sequelizeInit = require('./config/sequelize/init');
const empApiRouter = require('./routes/api/EmployeeApiRoute');
const trainingApiRouter = require('./routes/api/TrainingApiRoute');
const trainingHistoryApiRouter = require('./routes/api/TrainingHistoryApiRoute');
const session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik 
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'zetka-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o 
  //  języku aktualnie wybranym przez użytkownika
});
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my_secret_password',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if (!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});
app.use((req, res, next) => {
  if (!res.locals.lang) {
    const currentLang = req.cookies['zetka-lang'];
    res.locals.lang = currentLang;
  }
  next();
});


app.use('/', indexRouter);
app.use('/employees', authUtils.permitAuthenticatedUser, employeeRouter);
app.use('/trainings', authUtils.permitAuthenticatedUser, trainingRouter);
app.use('/history', authUtils.permitAuthenticatedUser, trainingHistoryRouter);

app.use('/api/employees', empApiRouter);
app.use('/api/trainings', trainingApiRouter);
app.use('/api/history', trainingHistoryApiRouter);

sequelizeInit()
  .catch(err => {
    console.log(err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// sequelizeInit()
//   .catch(err => {
//     console.log(err);
//   });


module.exports = app;
