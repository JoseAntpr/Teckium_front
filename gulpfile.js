// Definición de imports
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();


// Definimos la tarea por defecto de gulp
gulp.task("default",["compile-sass"],function(){
  notify().write("Iniciando gulp");
  //Cuando haya cambios en cualquier *scss, compila sass
  browserSync.init({
    server: "./"
  });

  //Cuando haya cambio compila sass
  gulp.watch("./src/scss/style.scss",["compile-sass"]);
  gulp.watch("./*.html",function(){
    browserSync.reload();
    notify().write("Navegador recargado");

  });

});

//Definición de otras tareas de gulp.

gulp.task("compile-sass", function(){
  gulp.src('./src/scss/style.scss')
  .pipe(sass().on('error',function(error){
    return notify().write(error);
  }))
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream())  //Recargamos tener el css en el navegador
  .pipe(notify("SASS compilado"))

});
