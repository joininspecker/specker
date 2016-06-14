// var user = require('../models/user.js');
var User = require('../models/user.js');
exports.sideBarChat = function(socket){
  console.log("hello");
  socket.on('send message',function(data){
    io.sockets.emit("new message",{msg:data});
  });
  // res.send({result:"hello"});
};
