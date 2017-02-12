// Definición de imports
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
//var concat = require('gulp-concat');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');

var sassConfig = {
  compileSassTaskName: 'compile-sass',
  watchFiles: './src/scss/*.scss',
  src: './src/scss/style.scss',
  dest:'./dist/'
};

var jsConfig = {
  concatJsTaskName: 'concat-js',
  watchFiles: './src/js/*.js',
  src: './src/js/main.js',
  concatFile: 'main.js',
  dest: './dist'
};

var uglifyConfig = {
  uglifyTaskName :'uglify',
  src: './dist/main.js',
  dest: './dist'
};

var imagesConfig = {
  imagesTaskName : "optimize-images",
  src: "src/img/*",
  dest: "./dist/img/",
  responsive: {
    'languages.png': [
      {
        width: 768,
        rename: { suffix: '-768px' }
      },
      {
        width: 520,
        rename: { suffix: '-520' }
      },
      {
        width: 375,
        rename: { suffix: '-375' }
      },
      {
        rename: { suffix: '-original' }
      }
    ],
    '*.png': {
      width: '100%'
    },
    'darth.png':{
      width:'36%'
    },
    'user.jpg':{
      width: '36%'
    }
  }
};

// Definimos la tarea por defecto de gulp
gulp.task("default",[sassConfig.compileSassTaskName,jsConfig.concatJsTaskName,imagesConfig.imagesTaskName],function(){
  notify().write("Iniciando gulp");
  //Cuando haya cambios en cualquier *scss, compila sass
  browserSync.init({
    //server: "./"
    proxy: "127.0.0.1:8000" //Conectar browserSync con sparrest
  });

  //Cuando haya cambios en archivos js, los Concatena
  gulp.watch(sassConfig.watchFiles,[sassConfig.compileSassTaskName]);

  //Cuando haya cambio compila sass
  gulp.watch(jsConfig.watchFiles,[jsConfig.concatJsTaskName]);
  gulp.watch("./*.html",function(){
    browserSync.reload();
    notify().write("Navegador recargado");

  });

});

//Definición de otras tareas de gulp.

gulp.task(sassConfig.compileSassTaskName, function(){
  gulp.src(sassConfig.src)
  .pipe(sourcemaps.init())  //Empezamos a capturar los sourcemaps
  .pipe(sass().on('error',function(error){
    return notify().write(error);
  }))
  .pipe(postcss([autoprefixer(),cssnano()]))  //Autoprefija el css y lo minifica
  .pipe(sourcemaps.write('./')) //Terminamos de capturar los sourcemaps
  .pipe(gulp.dest(sassConfig.dest))
  .pipe(browserSync.stream())  //Recargamos tener el css en el navegador
  .pipe(notify("SASS compilado"))

});

//Concatena JS
gulp.task(jsConfig.concatJsTaskName,function(){
  gulp.src(jsConfig.src)
  .pipe(tap(function(file){ //Para cada archivo seleccionado
    //lo pasamos por browserify
    file.contents = browserify(file.path, {debug:true}).bundle().on('error',function(error){
      notify().write(error); //Si ocurre un error Javascript lanza notificaciones
    });
  }))
  .pipe(buffer()) //Convertimos a buffer para que funcione el siguiente pipe
  //.pipe(concat(jsConfig.concatFile))
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(jsConfig.dest))
  .pipe(notify("JS Concatenado"))
  .pipe(browserSync.stream());
});

gulp.task(uglifyConfig.uglifyTaskName, function(){
  gulp.src(uglifyConfig.src)
  .pipe(uglify())
  .pipe(gulp.dest(uglifyConfig.dest))
  .pipe(notify("JS Minificado"));
});

gulp.task(imagesConfig.imagesTaskName, function(){
  gulp.src(imagesConfig.src)
  .pipe(responsive(imagesConfig.responsive))
  .pipe(imagemin())  //optimiza el tamaño de las imagenes
  .pipe(gulp.dest(imagesConfig.dest));

});
