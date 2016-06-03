var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var user= mongoose.Schema({

  name:{type:String},
  email:{type:String, unique:true},
  phone:{type:String, unique:true},
  profile:String,
  signUpDate:Date,
  gender:String,
  age:Number,
  password:String,
  description:String,

  popular:{
    like:{type:Number, default:0},
    unlike:{type:Number, default:0}
  },

  passport:{
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
  },
  spec:[String],
  goal:[String],

  address : {
     post :String,
     subpost:String,
     zipcode:String
  },


  log:[String],
  teams :[{type:Schema.ObjectId}],
  rooms:[{type:Schema.ObjectId}],
  friends:[{type:Schema.ObjectId}]
});

user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User',user,'user');
