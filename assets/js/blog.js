$(document).ready(function(){
  $('.submit-new-post-button').click(function(){
    if(confirm('Are you sure you want to post this?')){
      var newPostText = $('.new-post-text').val();
      var today = new Date();
      $.post('/blog', {text: newPostText, date: today}, function(err, success){
        location.reload();
      });
    }
  });

  function postComment(event){
    var postIndex = event.currentTarget.id.slice(event.currentTarget.id.length - 1);
    $.get('/blog', function(posts){
      var postId = posts[postIndex]._id;
      $.post('/comment/' + postId, {text: $('.new-comment-text').val(), post: postId}, function(data){
        $($('.comment-button')[postIndex]).before('<div class="comment-body">' + data.text + '</div>');
        $('.new-comment-template').remove();
        $('.comment-button').css('display', 'block');
      });
    });
  }

  $('.comment-button').click(function(event){
    $('.comment-button').css('display', 'block');
    $('.new-comment-template').remove();
    $(event.currentTarget).after( $('#new-comment-template').html() );
    var currentTargetId = event.currentTarget.id;
    $('.post-comment-button')[0].id = 'post-comment-button-' + currentTargetId.slice(currentTargetId.length - 1);
    $('.post-comment-button').click(postComment);
    $(event.currentTarget).css('display', 'none');
  });
});



