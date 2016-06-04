var user = require('../models/user.js');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
//signUp


// module.exports = function (passport) {


  // passport.use('login', new LocalStrategy({
  //   usernameField : 'email',
  //   passwordField : 'password',
  //   passReqToCallback : true
  // }, function (email, password, done) {
  //
  //     User.findOne({ email: email }, function (err, user) {
  //
  //       if (err) {
  //
  //         return done(err);
  //
  //       }
  //
  //       if (!user) {
  //
  //         return done(null, false, { message: 'Incorrect username.' });
  //
  //       }
  //
  //       if (!user.validPassword(password)) {
  //
  //         return done(null, false, { message: 'Incorrect password.' });
  //
  //       }
  //
  //       return done(null, user);
  //
  //     });
  //
  //   }
  //
  // ));

// };


exports.emailExisted = function(req, res){
  var isExisted = false;
  user.find({'email':req.body.email}, function(err, emailData){
    if(err)
      throw err;
     if(emailData.length==0){
       isExisted=true;     //된다.
     }
     res.send({result:isExisted});
  });
};


exports.phoneExisted = function(req, res){
  var isExisted = false;
  user.find({'phone':req.body.phone.replace(/\-/g,'')}, function(err, phoneData){
    if(err)
      throw err;
     if(phoneData.length==0){
       isExisted=true;    //된다.
     }
     res.send({result:isExisted});
  });
};

exports.signUp = function(req, res){
  var User= new user();
  User.email     =  req.body.signUpEmail;
  User.name      =  req.body.signUpName;
  User.phone     =  req.body.signUpPhone.replace(/\-/g,'');
  User.password  =  User.generateHash(req.body.signUpPassword);
  User.signUpDate=  Date.now();
  User.save(function(err){
    if(err)
      throw err;
    else {
      console.log('user: ' + User.email + " saved.");
      req.login(User, function(err) {
        if (err) {
          console.log(err);
        }
        return res.redirect('/classification');
      });
    }
  });
};






//signIn

exports.signInConfirm = function(req, res){
  var isExisted = 0;   // 0:ok; 1:없는 아이디, 2:아이디는 있으나 비밀번호가 다름.
  user.findOne({'email':req.body.email}, function(err, userData){
    if(err)
      throw err;

    if(userData){
      console.log(userData.password);
      console.log(userData.validPassword(req.body.password));
      if(userData.validPassword(req.body.password)){
        res.send({result:isExisted});
      }
      else{
        isExisted=2;
        res.send({result:isExisted});
      }
    }
    else{
      isExisted=1;
      res.send({result:isExisted});
    }
  });
};


exports.signIn = function(req, res){
  console.log(req.body);
  res.redirect('/classification');
};

exports.signOut = function(req, res){
  req.logout();
  res.redirect('/');
};



// passport.use(new LocalStrategy(
//   function(signInEmail, signInPassword, done) {
//     ser.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));


// exports.signIn = function(req, res){
//   var verification=req.session.success;
//   req.session.success='';
//   res.render('signIn',{verification:verification});
//
// };
//
//
// exports.signInProcess = function(req, res){
//   //backURL=req.header('Referer') || '/';
//   //sanghyun! change algorithm here maybe function must will be added in models/user.js!
//
//   user.find({email:req.body.email, password:req.body.password}, function(err,tasks){
//
//     if(err)
//       throw err;
//
//     var isMyUser = true;
//
//     if(tasks.length==0){
//       console.error('user is not existed!');
//       isMyUser = false;
//     }
//
//     if(isMyUser){
//       req.session.user = tasks;
//       req.session.success = 'Authenticated as ' + tasks.email;  // 세션 인증 생성
//       console.log('succeed to sign in');
//       res.redirect('/');
//     }
//     else{
//       req.session.success="NO";
//       res.redirect('/signIn');
//       res.end();
//     }
//
//   });
//
//
// };
//
//
// exports.signUpStep1 = function(req, res){
//   res.render('signUp1');
// };
//
// exports.signUpStep2 = function(req, res){
//     req.session.username=req.body.username;
//     req.session.password=req.body.password;
//     req.session.email=req.body.eamil;
//     req.session.phone=req.body.phone;
//     res.render('signUp2');
// };
// exports.signUpStep3 = function(req, res){
//   res.render('signUp3');
// };
//
// exports.signUpSuccess = function(req, res){
//   res.redirect('/');
// };
//
// exports.signUpEmailCheck=function(req, res){
//     var isExisted = false;
//     user.find({email:req.body.emailData}, function(err,tasks){
//       console.log('are you sure?');
//       if(tasks.length!=0){
//         isExisted = true;
//       }
//       res.send(isExisted);
//     });
// };
//
// exports.signUpPhoneCheck=function(req,res){
//     var isExisted = false;
//     user.find({phone:req.body.phoneData}, function(err,tasks){
//       if(tasks.length!=0){
//         isExisted = true;
//       }
//       res.send(isExisted);
//     });
// };
//
//
// exports.getKindOfMajor=function(req, res){
//
//
//
//
// };
//
// exports.getKindOfSpec=function(req, res){
//
//
// };
//
//
// exports.signUpProcess = function(req, res){
//
// };
//
//
// exports.signOut = function(req, res){
//   req.session.destroy(function(){     // 로그 아웃하면 세션 삭제하고 login 페이지로 이동
//     res.redirect('/');
//   });
// };
