$(document).ready(function(){
  $("#next").hide();
  var selectionChange=$('#ms-scrabble').magicSuggest({
    allowFreeEntries: false,
    data: '/classification/signUpSearch',
    ajaxConfig: {
      xhrFields: {
        withCredentials: true,
     }
   },
   renderer: function(data){
        return '<div style="padding: 5px; overflow:hidden;">' +
            '<div style="float: left;"><img src="" /></div>' +
            '<div style="float: left; margin-left: 5px">' +
                '<div style="font-weight: bold; color: #333; font-size: 10px; line-height: 11px">' + data.name + '</div>' +
                '<div style="color: #999; font-size: 9px">' + data.name + '</div>' +
            '</div>' +
        '</div><div style="clear:both;"></div>'; // make sure we have closed our dom stuff
    }
  });
  // $(".ms-close-btn").click(function(){
  // });
  $("input").css('background','transparent').css('width','100%');
  $(selectionChange).on('selectionchange', function(e,m){
    if(m._valueContainer.children().length>=3){
      $("#next").fadeIn(1000);
    }
    else{
      $("#next").fadeOut(1000);
    }
  });

  $("#next").click(function(){
    var tags=[];
    var tag=$('.ms-sel-ctn');
    for(var i=0; i<tag.children('.ms-sel-item').length; i++){
      // var temp=$(".ms-sel-ctn .ms-sel-item:nth-child("+i+1+")").text();
      // console.log(temp);
      var temp=tag.children('.ms-sel-item').eq(i);
      tags.push(temp.text());
    }
    jQuery.ajaxSettings.traditional = true;
    $.ajax({
      url:'/classification/enrollClassification',
      type:'post',
      data:{'tagData':tags},
      success:function(data){
        console.log(data);
        if(data)
          $("#goNext").submit();
        else
          return false;
      }
    });
  });

  // var flag = true;
  // var year=2000;
  // $(window).scroll(function() {
  //   if($(window).scrollTop() + $(window).height() == $(document).height()){
  //     //- first = $('#first').val();
  //     //- limit = $('#limit').val();
  //     no_data = true;
  //     if(flag && no_data){
  //       flag = false;
  //       $('#loader').show();
  //       setTimeout(function(){
  //       $.ajax({
  //         url : '/getNewsFeed',
  //         method: 'post',
  //         success: function( data ) {
  //           flag = true;
  //           console.log("hello");
  //           $('#loader').hide();
  //           if(data.result !=''){
  //             //- first = parseInt($('#first').val());
  //             //- limit = parseInt($('#limit').val());
  //             //- $('#first').val( first+limit );
  //             //- $('#timeline-conatiner').append( '<li class="year">'+year+'</li>');
  //             //- $('#timeline-conatiner').append( data );
  //             for(var i=0; i<4; i++){
  //               $('#more').append("<div style='margin-bottom:0px; cursor:pointrer;' class='thumbnail tile tile-large tile-green'><a href='#' class='fa-links'><h1>Home</h1><i class='fa fa-3x fa-rss-square' aria-hidden='true'></i></a></div>");
  //             }
  //             year--;
  //           }
  //           else{
  //             alert('No more data to show');
  //             no_data = false;
  //           }
  //         },
  //         error: function( data ){
  //           flag = true;
  //           $('#loader').hide();
  //           no_data = false;
  //           alert('Something went wrong, Please contact admin');
  //         }
  //       })},1000);
  //     }
  //   }
  // });
});
