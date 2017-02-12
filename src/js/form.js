var $ = require('jquery');
var CommentService = require('./CommentService');

var form = $(".comment-form");

form.on("submit", function(event){

  self = this;

  var nombreInput = document.getElementById("nombre");
  var apellidosInput = document.getElementById("apellidos");
  var emailInput = document.getElementById("email");
  var comentarioTextArea = document.getElementById("comentario");



  if(nombreInput.checkValidity() == false){
    alert("Debes escribir tu nombre");
    nombreInput.focus();
    event.preventDefault();
    return false;
  }

  if(apellidosInput.checkValidity() == false){
    alert("Debes escribir tu apellidos");
    apellidosInput.focus();
    event.preventDefault();
    return false;
  }

  if(emailInput.checkValidity() == false){
    alert(emailInput.validationMessage);
    apellidosInput.focus();
    event.preventDefault();
    return false;
  }

  if(comentarioTextArea.checkValidity() == false){
    alert("El comentario no puede estar vacío.");
    comentarioTextArea.focus();
    event.preventDefault();
    return false;

  } else if(wordCount(comentarioTextArea.value) > 120){
    alert("Has sobrepasado el número de palabras");
    comentarioTextArea.focus();
    event.preventDefault();
    return false;
  }

  //Con todos los campos OK, guardamos en el backend el comentario

  //Creamos el objeto comentario que quiero guardar
  var comment = {
    nombre: nombreInput.value,
    apellidos:apellidosInput.value,
    email:emailInput.value,
    comentario:comentarioTextArea.value
  }
  //Antes de enviar el formulario, bloqueamos el botón enviar.

  $(this).find("button").text("Saving comment...").attr("disabled",true);
  //lo enviamos al back
  CommentService.save(comment, function(data){
    alert("Comentario guardado correctamente");
    self.reset();
    $(self).find("button").text("Enviar comentario").attr("disabled",false)
  }, function(error){
    alert("Se ha producido un error");
    $(self).find("button").text("Enviar comentario").attr("disabled",false)
  });

  return false; //No queremos enviar el formulario nunca

});

wordCount = function(texto){
  NumeroCaracteres = texto.lenght;

  textoDividido = texto.split(" ");

  return textoDividido.length;
}
