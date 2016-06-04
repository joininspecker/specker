var User = require('../models/user.js');
var mongoose = require('mongoose');
exports.getNewsFeed = function(req, res){
  console.log(req.body);
  res.send({result:"hello"});
};

exports.newsFeed = function(req, res){
  console.log("newfeed!!");
  var key = mongoose.Types.ObjectId(req.session.passport.user);
  if(!req.session.passport)
    res.redirect('/');
  User.findOne({'_id':key}, function(err, userData){
    if(err)
      throw err;
    if(userData.goal.length>=3)
      res.render('newsFeed/newsFeed');
    else
      res.redirect('/classification');
  })
};
