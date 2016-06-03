// var express        = require('express');
// var app            = express();
// var server         = require('http').createServer(app);
// var io             = require('socket.io').listen(server);
var app = require('express')();
var express        = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session        = require('express-session');    // 세션 인증을 위한 라이브러리
var sessionStore   = require('session-file-store')(session);
var passport = require('passport');


app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/views'));     // set the static files location /public/img will be /img for users
app.use('/signUp', express.static('public'));
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride());                  // simulate DELETE and PUT

app.use(session({
  secret: '1@Djsk2$0asdkfj$**si2md00DJWM1SO8$A',
  resave: false,
  saveUninitialized: true,
  store:new sessionStore()
}));

app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.locals.pretty=true;
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/passport-controller')(passport);
require('./router.js').router(app,io,passport);

require('./db.js').connect();


http.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
