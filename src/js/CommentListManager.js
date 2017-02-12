var $ = require('jquery');
var CommentsService = require('./CommentService');

module.exports = {

  setUiIdeal: function(){
    $('.comments-list').removeClass().addClass('comments-list ideal');
  },

  setUiBlank: function(){
    $('.comments-list').removeClass().addClass('comments-list blank');
  },

  setUiError: function(){
    $('.comments-list').removeClass().addClass('comments-list error');
  },

  setUiLoading: function(){
    $('.comments-list').removeClass().addClass('comments-list loading');
  },

  loadComments: function(){
    var self = this;

    //Mostrar el mensaje de cargando
    self.setUiLoading();

    //Cargamos las canciones desde el backend
    CommentsService.list(function(comments){
      if(comments.length == 0){
        self.setUiBlank();
      }else{

        self.renderComments(comments);

        self.setUiIdeal();

      }

    },function(error){
      self.setUiError();
    });

  },


  renderComments: function(comments){
    var html = '';
    for( var i in comments){
      var comment = comments[i];
      html+='<div class="comment">';
      html += '<div class="user">' + comment.nombre + " " +  comment.apellidos + "</div>";
      html += '<div class="comment-text">' + comment.comentario + "</div>";
      html+='</div>';
    }

    $(".comments-list .ui-ideal").html(html);
  }
}
