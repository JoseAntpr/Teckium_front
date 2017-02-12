var $ = require('jquery');

module.exports = {

  uiStatus: 'hidden-menu',

  toggleMenu: function(){

    if(this.uiStatus == "hidden-menu"){
      $("nav").removeClass().addClass("navbar show-menu");
      this.uiStatus = "show-menu"

    }else{
      $("nav").removeClass().addClass("navbar hidden-menu");
      this.uiStatus = "hidden-menu"
    }
  }

}
