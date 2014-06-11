var sections = ['about', 'studies', 'projects', 'code', 'books'];

function navigateTo(sectionNumber){
  $('html,body').animate({ scrollTop: $('#' + sections[sectionNumber]).offset().top }, 'slow');
}

function goto(url){
  window.location = url;
}

function reformatElements(){
  if($(window).width() >= 1020){
    $('.blank-content').css('width', '180px');
    $('.pa-container').css('padding-left', '0');
    $('.pa-container').css('padding-right', '0');
  }else{
    $('.blank-content').css('width', '0');
    $('.pa-container').css('padding-left', '90px');
    $('.pa-container').css('padding-right', '90px');
  }
}

$(document).ready(function(){
  if($(window).width() >= 1020){
    $.stellar({
      horizontalScrolling: false
    });
  }else{
    $('.blank-content').css('width', '0');
    $('.pa-container').css('padding-left', '90px');
    $('.pa-container').css('padding-right', '90px');
  }


  $(window).resize(function(){
    reformatElements();
  });
});



