var $ = require('jquery');

module.exports = {

   showLikes : function(){
      for(i=0;i<localStorage.length;i++){
        $("#"+localStorage.getItem(i)).attr("data-action","unvote");
        $("#"+localStorage.getItem(i)).addClass("active");
      }
    },

    clickLike: function(likeId){
      if($(likeId).attr("data-action") === "upvote"){
        localStorage.setItem($(likeId).attr("id"),$(likeId).attr("id"));
        $(likeId).attr("data-action","unvote");
        $(likeId).addClass("active");
      }else{
        localStorage.removeItem($(likeId).attr("id"));
        $(likeId).attr("data-action","upvote");
        $(likeId).removeClass("active");
      }
    }

}
