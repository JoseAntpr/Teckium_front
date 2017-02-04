// Definición de imports
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

var sassConfig = {
  compileSassTaskName: 'compile-sass',
  watchFiles: './src/scss/*.scss',
  src: './src/scss/style.scss',
  dest:'./dist/'
};

var jsConfig = {
  concatJsTaskName: 'concat-js',
  watchFiles: './src/js/*.js',
  src: './src/js/*.js',
  concatFile: 'main.js',
  dest: './dist'
}


// Definimos la tarea por defecto de gulp
gulp.task("default",[sassConfig.compileSassTaskName,jsConfig.concatJsTaskName],function(){
  notify().write("Iniciando gulp");
  //Cuando haya cambios en cualquier *scss, compila sass
  browserSync.init({
    server: "./"
  });

  //Cuando haya cambios en archivos js, los Concatena
  gulp.watch(sassConfig.watchFiles,["sassConfig.compileSassTaskName"]);

  //Cuando haya cambio compila sass
  gulp.watch(jsConfig.watchFiles,jsConfig.concatJsTaskName);
  gulp.watch("./*.html",function(){
    browserSync.reload();
    notify().write("Navegador recargado");

  });

});

//Definición de otras tareas de gulp.

gulp.task("compile-sass", function(){
  gulp.src(sassConfig.src)
  .pipe(sass().on('error',function(error){
    return notify().write(error);
  }))
  .pipe(gulp.dest(sassConfig.dest))
  .pipe(browserSync.stream())  //Recargamos tener el css en el navegador
  .pipe(notify("SASS compilado"))

});

//Concatena JS
gulp.task("concat-js",function(){
  gulp.src(jsConfig.src)
  .pipe(concat(jsConfig.concatFile))
  .pipe(gulp.dest(jsConfig.dest))
  .pipe(notify("JS Concatenado"))
  .pipe(browserSync.stream());
});
