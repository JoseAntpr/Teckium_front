var $ = require('jquery');
var API_URL = "/api/comments/"

module.exports = {
  //Recuperar todos los comentarios
  list: function(successCallBack, errorCallback){
    $.ajax({
      url: API_URL,
      type: "get",
      success : function(data){
        successCallBack(data);
      },
      error: function(error){
        errorCallback(error);
        console.error("Error al recuperar las canciones". error);
      }
    });
  },

  //Guardar un comentario

  save: function(comment, successCallBack, errorCallback){
    $.ajax({
      url: API_URL,
      type: "post",
      data: comment,
      success: function(data){
        //Si se guarda bien
        successCallBack(data);
      },
      error: function(error){
        //Si no se guarda
        errorCallback(error);
        console.error("Error al guardar la cancion", error);
      }

    });
  }
}
