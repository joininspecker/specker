var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spec= mongoose.Schema({
  name:String,
  depth:String,
  member:[String],
  like:{type:Number, default:0}
}).index({
  'name':'text',
});

module.exports = mongoose.model('Spec',spec,'spec');
