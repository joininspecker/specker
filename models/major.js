var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var major= mongoose.Schema({
  name:String,
  depth:String,
  member:[String],
  like:{type:Number, default:0}
}).index({
  'name':'text',
});

module.exports = mongoose.model('Major',major,'major');
