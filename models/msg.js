var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var msg= mongoose.Schema({

  chatroom:{type:Schema.ObjectId},
  from:String,
  date:{type:Date, default:Date.now},
  message:String
});


module.exports = mongoose.model('Msg',msg,'msg');


// var mongoose = require('mongoose');
// var dbURI = 'mongodb://localhost/specker';
// var connection = mongoose.createConnection(dbURI);
// var autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(connection);
// var Schema = mongoose.Schema;
//
// var msg= new Schema({
//
//   chatroom:{type:Schema.ObjectId},
//   from:String,
//   date:{type:Date, default:Date.now},
//   message:String
// });
//
// msg.plugin(autoIncrement.plugin, 'msg');
// module.exports= connection.model('msg', msg);
