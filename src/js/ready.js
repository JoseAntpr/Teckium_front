var $ = require('jquery');
var storage = require("./storage");
var time = require("./time");
var uiManager = require('./uiManager');
var CommentListManager = require('./CommentListManager');
var ScrollPoints = require('scrollpoints');

var config = {
  when: 'left',
  reversed: true,
  once:false,
  offset:500,
}

$(document).ready(function(){

  storage.showLikes();
  time.calcTime();


  $(".icon-menu").on("click",function(){
    uiManager.toggleMenu();
  });

  $('.favourite-button').on("click",function(){
    storage.clickLike($(this));
  });

  $("#scroll-top").on("click",function(){
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });

  //Cargar comentarios

  ScrollPoints.add($(".comments-list"),CommentListManager.loadComments());



});
