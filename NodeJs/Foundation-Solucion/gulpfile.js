var gulp = require('gulp');
var minjs = require('gulp-uglify');

gulp.task('test', function(){
    console.log("Hola mundo");
});

gulp.task('mainminjs', async function(){
    gulp.src('./src/js/main.js')
    .pipe(minjs())
    .pipe(gulp.dest('./build/js/'));
});