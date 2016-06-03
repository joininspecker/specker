$(document).ready(function(){
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
            if(data.result !=''){
              //- first = parseInt($('#first').val());
              //- limit = parseInt($('#limit').val());
              //- $('#first').val( first+limit );
              //- $('#timeline-conatiner').append( '<li class="year">'+year+'</li>');
              //- $('#timeline-conatiner').append( data );
              $('#more').append('<p>'+data.result+'</p>')
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
        })},1000);
      }
    }
  });
});
