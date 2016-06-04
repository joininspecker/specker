var user = require('./controllers/user-controller.js');
var newsFeed = require('./controllers/newsFeed-controller.js');
var classification = require('./controllers/classification-controller.js');
var chat = require('./controllers/chat-controller.js');
var User = require('./models/user.js');
connections=[];
exports.router=function(app,io,passport){
  //chat
  io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log("hello");
    console.log('connected: %s sockets connected', connections.length);
    //disconnect
    connections.splice(connections.indexOf(socket),1);
    console.log('disconnected : %s sockets connected', connections.length);
    socket.on('send message',function(data){
      io.sockets.emit("new message",{msg:data});
    });
  });
  app.route('/chatConnection')
    .post(chat.chatConnection(io));
  app.route('/sideBarChat')
    .post(chat.sideBarChat(io));

  app.route('/')
    .get(function(req, res, next) {
      res.render('welcome/welcome');
    });

  //signUp
  app.route('/signUp/emailExisted')
    .post(user.emailExisted);

  app.route('/signUp/phoneExisted')
    .post(user.phoneExisted);

  app.route('/signUp')
    .post(user.signUp);


  //signIn
  app.route('/signIn/confirm')
    .post(user.signInConfirm);

  // app.post('/signIn',passport.authenticate('local', {
  //     successRedirect: '/classification',
  //     failureRedirect: '/',
  //     failureFlash: true
  //   })
  // );
  app.post('/signIn',function(req, res,next){
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        if(user.goal.length>=3)
          return res.redirect('/newsFeed');
        else
          return res.redirect('/classification');

      });
    })(req, res, next);
  });
  //signOut
  app.get('/signOut',user.signOut);

  // app.get('/login', function(req, res, next) {
  //   passport.authenticate('local', function(err, user, info) {
  //     if (err) { return next(err); }
  //     if (!user) { return res.redirect('/login'); }
  //     req.logIn(user, function(err) {
  //       if (err) { return next(err); }
  //       return res.redirect('/users/' + user.username);
  //     });
  //   })(req, res, next);
  // });



  // app.route('/signIn')
  //   .post(user.signIn);

  //newsfeed
  app.route('/newsFeed')
    .get(isLoggedIn,newsFeed.newsFeed)
    .post(newsFeed.newsFeed);

  app.route('/getNewsFeed')
    .post(newsFeed.getNewsFeed);



  //classification
  app.route('/classification')
    .get(isLoggedIn,classification.classification)
  app.route('/classification/signUpSearch')
    .post(classification.getClassification);
  app.route('/classification/enrollClassification')
    .post(classification.enrollClassification);

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
