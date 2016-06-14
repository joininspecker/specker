$(document).ready(function(){


  /*뉴스피드 영역*/
  var flag = true;
  var year=2000;
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()){
      //- first = $('#first').val();
      //- limit = $('#limit').val();
      no_data = true;
      if(flag && no_data){
        flag = false;
        $('#loader').show();
        setTimeout(function(){
        $.ajax({
          url : '/getNewsFeed',
          method: 'post',
          success: function( data ) {
            flag = true;
            console.log("hello");
            $('#loader').hide();
            if(data.result !==''){
              $('#more').append('<p>'+data.result+'</p>');
              year--;
            }
            else{
              alert('No more data to show');
              no_data = false;
            }
          },
          error: function( data ){
            flag = true;
            $('#loader').hide();
            no_data = false;
            alert('Something went wrong, Please contact admin');
          }
        });},1000);
      }
    }
  });





  /*네비게이션 바 영역 */
  $('#goHome').click(function(e){
    e.preventDefault();
    $.ajax({
      type:'get',
      url:'../newsFeed/newsFeed.html',
      success:function(html){
        var list = $.parseHTML(html);
        $('#content').html('');
        $('#content').append(list);
        if(typeof(history.pushState) == 'function'){
          //현재 주소를 가져온다.
          var renewURL = location.href;
          //현재 주소 중 page 부분이 있다면 날려버린다.
          renewURL = renewURL.replace(/\/([a-zA-Z]+)\/?/ig,'');

          //새로 부여될 페이지 번호를 할당한다.
          // page는 ajax에서 넘기는 page 번호를 변수로 할당해주거나 할당된 변수로 변경
          renewURL += '/newsFeed';

          //페이지 갱신 실행!
          history.pushState(null, null, renewURL);
        }
        else{
          location.hash = '#newsFeed';
        }
      }
    });
  });

  $('#goInfo').click(function(e){
    e.preventDefault();
    $.ajax({
      type:'get',
      url:'../Info/Info.html',
      success:function(html){
        var list = $.parseHTML(html);
        $('#content').html('');
        $('#content').append(list);
        if(typeof(history.pushState) == 'function'){
          //현재 주소를 가져온다.
          var renewURL = location.href;
          //현재 주소 중 page 부분이 있다면 날려버린다.
          renewURL = renewURL.replace(/\/([a-zA-Z]+)\/?/ig,'');

          //새로 부여될 페이지 번호를 할당한다.
          // page는 ajax에서 넘기는 page 번호를 변수로 할당해주거나 할당된 변수로 변경
          renewURL += '/Info';

          //페이지 갱신 실행!
          history.pushState(null, null, renewURL);
        }
        else{
          location.hash = '#Info';
        }
      }
    });
  });
  $('#goFindTeam').click(function(e){
    e.preventDefault();
    $.ajax({
      type:'get',
      url:'../findTeam/findTeam.html',
      success:function(html){
        var list = $.parseHTML(html);
        $('#content').html('');
        $('#content').append(list);
        if(typeof(history.pushState) == 'function'){
          //현재 주소를 가져온다.
          var renewURL = location.href;
          //현재 주소 중 page 부분이 있다면 날려버린다.
          renewURL = renewURL.replace(/\/([a-zA-Z]+)\/?/ig,'');

          //새로 부여될 페이지 번호를 할당한다.
          // page는 ajax에서 넘기는 page 번호를 변수로 할당해주거나 할당된 변수로 변경
          renewURL += '/findTeam';

          //페이지 갱신 실행!
          history.pushState(null, null, renewURL);
        }
        else{
          location.hash = '#findTeam';
        }
      }
    });
  });

  // $('#goMessage').click(function(e){
  //   e.preventDefault();
  //   $.ajax({
  //     type:'get',
  //     url:'../Message/Message.html',
  //     success:function(html){
  //       var list = $.parseHTML(html);
  //       $('#content').html('');
  //       $('#content').append(list);
  //       if(typeof(history.pushState) == 'function'){
  //         //현재 주소를 가져온다.
  //         var renewURL = location.href;
  //         //현재 주소 중 page 부분이 있다면 날려버린다.
  //         renewURL = renewURL.replace(/\/([a-zA-Z]+)\/?/ig,'');
  //
  //         //새로 부여될 페이지 번호를 할당한다.
  //         // page는 ajax에서 넘기는 page 번호를 변수로 할당해주거나 할당된 변수로 변경
  //         renewURL += '/Message';
  //
  //         //페이지 갱신 실행!
  //         history.pushState(null, null, renewURL);
  //       }
  //       else{
  //         location.hash = '#Message';
  //       }
  //     }
  //   });
  // });

});
