$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', 'thirdPage','forthpage','lastpage'],
    sectionsColor: ['#fff', '#fff', '#fff','#fff','#fff'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['First page', 'Second page', 'Third page','Forth page','Last page'],
    responsiveWidth: 300,
    scrollingSpeed: 1700,
    'afterLoad': function (anchorLink, index) {
      if (index == 1) {
        if($('#itemSignIn').hasClass('active')){
          $('#itemSignIn').hide();
          $('#itemSignIn').fadeIn(2000);

        }
        else if($('#itemSignUp').hasClass('active')){
          $('#itemSignUp').hide();
          $('#itemSignUp').fadeIn(2000);
        }
        else{
          $('.main').hide();
          $('.main').fadeIn(2000);
        }
        //- $('#upperSignInButton').hide();
        //- $('#upperSignUpButton').hide();
      }
    },
    'onLeave': function (index, nextIndex, direction) {
      if (index == 1 && direction == 'down') {
        $('#itemSignIn').fadeOut(1000);
        $('#itemSignUp').fadeOut(1000);
        $('.main').fadeOut(1000);

        $('#upperSignInForm').show();
        $('#upperSignUpForm').show();
        $('.main').fadeOut(1000);
      }
      else if (index == 2 && direction == 'up') {
        if($('#itemSignIn').hasClass('active')){
          $('#upperSignInForm').hide();
          $('#upperSignUpForm').show();
        }
        else if($('#itemSignUp').hasClass('active')){
          $('#upperSignInForm').show();
          $('#upperSignUpForm').hide();
        }

        else{
          $('#upperSignInForm').hide();
          $('#upperSignUpForm').hide();
        }

      }
      else if (index == 4 && direction == 'down') {
        $('#upperSignInForm').hide();
        $('#upperSignUpForm').hide();
      }
      else if (index == 5 && direction == 'up') {
        $('#upperSignInForm').show();
        $('#upperSignUpForm').show();
      }
    }
  });
  $('#signUpBtn').click(function(){
    $('.main').hide();
    $('#itemSignIn').hide();
    $('#upperSignUpForm').hide();
    $('#upperSignInForm').fadeIn(1000);
    if(!$('body').hasClass('fp-viewing-firstPage-0')){
      $('.main').hide();
      $('#itemSignIn').hide();
      $('#itemSignUp').hide();
    }
    else{
      $('#itemSignUp').hide();
      $('#itemSignUp').fadeIn(2000);
    }

  });
  $('#signInBtn').click(function(){
    $('.main').hide();
    $('#itemSignUp').hide();
    $('#upperSignInForm').hide();
    $('#upperSignUpForm').fadeIn(1000);
    if(!$('body').hasClass('fp-viewing-firstPage-0')){
      $('.main').hide();
      $('#itemSignIn').hide();
      $('#itemSignUp').hide();
    }
    else{
      $('#itemSignIn').hide();
      $('#itemSignIn').fadeIn(2000);
    }

  });
  $(document).on('click','#upperSignInButton',function(){
    //- $('#wrapBtn').hide();
    //- $( "#foo" ).slideUp( 300 ).delay( 800 ).fadeIn( 400 );
    $('#signInBtn').trigger('click');
    //- $('#wrapBtn').show();
  });
  $(document).on('click','#upperSignUpButton',function(){
    //- $('#wrapBtn').hide();
    $('#signUpBtn').trigger('click');
    //- $('#wrapBtn').show();
  });

  /*회원가입 확인.*/
  var signUpEmailFlag=false;
  var signUpNameFlag=false;
  var signUpPhoneFlag=false;
  var signUpPasswordFlag=false;
  var signUpPasswordConfirmFlag=false;
  $("input[name='signUpEmail']").focusout(function(){
    var regex=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if(!regex.test($("input[name='signUpEmail']").val())){
      $("input[name='signUpEmail']").val('');
      $("input[name='signUpEmail']").attr('placeholder','이메일 형식이 잘못됬습니다.');
      signUpEmailFlag=false;
    }
    else{
      $.ajax({
        url:'/signUp/emailExisted',
        type:'post',
        data:{email:$("input[name='signUpEmail']").val()},
        success:function(data){
          if(data.result==false){
            $("input[name='signUpEmail']").val('');
            $("input[name='signUpEmail']").attr('placeholder','이미 존재하는 이메일입니다.');
            signUpEmailFlag=false;
          }
          else{
            signUpEmailFlag=true;
          }
        }
      });
    }
  });

  $("input[name='signUpName']").focusout(function(){
    var regex=/^[가-힣]{2,5}$/;
    if(!regex.test($("input[name='signUpName']").val())){
      $("input[name='signUpName']").val('');
      $("input[name='signUpName']").attr('placeholder','이름 형식이 맞지 않습니다.');
      signUpNameFlag=false;
    }
    else{
      signUpNameFlag=true;
    }
  });


  $("input[name='signUpPhone']").focusout(function(){
    var regex=/^\d{3}-?\d{3,4}-?\d{4}$/;
    if(!regex.test($("input[name='signUpPhone']").val())){
      $("input[name='signUpPhone']").val('');
      $("input[name='signUpPhone']").attr('placeholder','번호 형식이 맞지 않습니다.');
      signUpPhoneFlag=false;
    }
    else{
      $.ajax({
        url:'/signUp/phoneExisted',
        type:'post',
        data:{phone:$("input[name='signUpPhone']").val()},
        success:function(data){
          if(data.result==false){
            $("input[name='signUpPhone']").val('');
            $("input[name='signUpPhone']").attr('placeholder','이미 존재하는 번호입니다.');
            signUpPhoneFlag=false;
          }
          else{
            signUpPhoneFlag=true;
          }
        }
      });
    }
  });

  $("input[name='signUpPassword']").focusout(function(){
    var regex=/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    if(!regex.test($("input[name='signUpPassword']").val())){
      $("input[name='signUpPassword']").val('');
      $("input[name='signUpPassword']").attr('placeholder','비밀번호 형식이 맞지 않습니다.');
      signUpPasswordFlag=false;
    }
    else{
      signUpPasswordFlag=true;
    }
  });

  $("input[name='signUpPasswordConfirm']").focusout(function(){
    if($("input[name='signUpPasswordConfirm']").val()!=$("input[name='signUpPassword']").val()){
      $("input[name='signUpPasswordConfirm']").val('');
      $("input[name='signUpPasswordConfirm']").attr('placeholder','비밀번호와 다릅니다.');
      signUpPasswordConfirmFlag=false;
    }
    else{
      signUpPasswordConfirmFlag=true;
    }
  });

  $('#GoSignUp').click(function(){
    if(signUpEmailFlag&&signUpNameFlag&&signUpPhoneFlag&&signUpPasswordFlag&&signUpPasswordConfirmFlag){
      $('#signUpForm').submit();
    }
    else{
      return false;
    }
  });


  /* 로그인 확인. */
  $('#GoSignIn').click(function(){
    if($("input[name='signInEmail']").val()==""||$("input[name='signInPassword']").val()==""){
      if($("input[name='signInEmail']").val()==""){
        $("input[name='signInEmail']").val('');
        $("input[name='signInEmail']").attr('placeholder','이메일을 적어주세요.');
      }

      if($("input[name='signInPassword']").val()==""){
        $("input[name='signInPassword']").val('');
        $("input[name='signInPassword']").attr('placeholder','비밀번호를 적어주세요.');
      }
    }
    else{
      $.ajax({
        url:'/signIn/confirm',
        type:'post',
        data:{email:$("input[name='signInEmail']").val(), password:$("input[name='signInPassword']").val()},
        success:function(data){
          if(data.result==0){
            $('#signInForm').submit();
          }
          else if(data.result==1){
            $("input[name='signInEmail']").val('');
            $("input[name='signInEmail']").attr('placeholder','없는 아이디 입니다.');
            return false;
          }
          else{
            $("input[name='signInPassword']").val('');
            $("input[name='signInPassword']").attr('placeholder','비밀번호가 다릅니다.');
            return false;
          }
        }
      });
    }

  });
});
