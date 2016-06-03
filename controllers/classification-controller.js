var Spec = require('../models/spec.js');
var User = require('../models/user.js');
var mongoose = require('mongoose');
exports.getClassification = function(req, res){
  data=[];
  Spec.find({name : {$regex : req.body.query},depth:"C"},function(err, datas){
    for(var i=0; i<datas.length; i++){
      data.push({"id":i,"name":datas[i].name});
    }
    res.send(data);
  });
  // db.terms.findOne({term : {$regex : "지수적"}})
};


exports.classification = function(req, res){
  console.log(req.session);
  console.log("hello");
  var key = mongoose.Types.ObjectId(req.session.passport.user);
  console.log(key);
  User.findOne({'_id' : key}, function(err, datas){
      if(!datas){
        res.redirect('/');
      }
      console.log(datas);
      if(datas.goal.length<=3)
        res.render('classification/classification');
      else
        res.render('newfeed/newfeed');
  });

};

/* 디비 입맞에 맞게 바꿀떄 사용

  import 명령어: mongoimport --db specker --collection specs --file init_spec.json
  export 명령어: mongoexport -d specker -c specs -o init_spec.json


*/
// exports.makeSpec = function(req, res){
//
//   Spec.find({depth:"B"}, function(err, datas){
//     for(var i=0; i<datas.length; i++){
//       for(var j=0; j<datas[i].member.length; j++){
//         var specker= new Spec();
//         specker.name=datas[i].member[j];
//         specker.depth="C";
//         specker.save(function(err){
//           if(err){
//             throw err;
//           }
//         })
//       }
//     }
//   });
//
// }
