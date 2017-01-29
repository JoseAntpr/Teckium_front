// Definición de imports
var gulp = require('gulp');
var sass = require('gulp-sass');


// Definimos la tarea por defecto de gulp
gulp.task("default",function(){
  console.log("Hello world");
  //Cuando haya cambios en cualquier *scss, compila sass
  gulp.watch("./src/scss/style.scss",["compile-sass"]);

});

//Definición de otras tareas de gulp.

gulp.task("compile-sass", function(){
  gulp.src('./src/scss/style.scss')
  .pipe(sass().on('error'sass.logError))
  .pipe(gulp.dest('./dist/'))

});
