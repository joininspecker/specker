// var user = require('../models/user.js');

exports.getNewsFeed = function(req, res){
  console.log(req.body);
  res.send({result:"hello"});
};

exports.newsFeed = function(req, res){
  res.render('newsfeed/newsfeed')
};
