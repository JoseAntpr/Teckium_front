var moment = require('moment');

var $ = require('jquery');



module.exports = {

  calcTime : function(){
    moment.locale("es");

    initialDate = $('.time');

    initialDate.each(function(){
      var date = moment($(this).text());

      if(moment().diff(moment($(this).text()),'days') > 1){
        date = date.calendar();
      }else{
        date = date.fromNow();;

      }
      $(this).replaceWith("<div class='time'>" + date +"</div>");

    });

  }

}
