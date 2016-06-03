var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var calendarEvent= mongoose.Schema({

  team:{type:Schema.ObjectId},
  date:Date,
  event:String,
  post:String,
  description:String,
  member:[{type:Schema.ObjectId}]


});


module.exports = mongoose.model('CalendarEvent',calendarEvent,'calendarEvent');
