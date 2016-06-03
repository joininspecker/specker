// var user = require('../models/user.js');

exports.sideBarChat = function(io){
  return function(req, res){
    console.log(req.body);
  };
  // res.send({result:"hello"});
};

exports.chatConnection = function(io){
  return function(req, res){

  };
};
