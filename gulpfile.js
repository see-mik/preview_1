'use strict';
 
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const smartgrid = require('smart-grid');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const fs = require('fs');

sass.compiler = require('node-sass');


// Transpile scss to CSS for development
gulp.task('style:dev', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest('./dist/css'));
});


// Transpile scss to CSS for production
gulp.task('style', () => {
    return gulp.src('./scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          cascade: false,
          grid: true
      }))
      .pipe(gulp.dest('./dist/css'));
});


// Transpile ES6 and more to ES5
gulp.task('js', () => {
    return gulp.src('./js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./dist/js'))
});


// Clean dist folder
gulp.task('clean', () => {
    return del(['./dist/*']);
});


// Create _smart-grid.scss file
gulp.task('smart-grid', (cb) => {
    let dir = './scss/lib';
    !fs.existsSync(dir) && fs.mkdirSync(dir);

    smartgrid('./scss/lib/', {
        outputStyle: 'scss',
        filename: '_smart-grid',
        columns: 12, // number of grid columns
        offset: '1.875rem', // gutter width - 30px
        mobileFirst: true,
        mixinNames: {
            container: 'container'
        },
        container: {
            fields: '0.9375rem' // side fields - 15px
        },
        breakPoints: {
            xs: {
                width: '20rem' // 320px
            },
            sm: {
                width: '36rem' // 576px
            },
            md: {
                width: '48rem' // 768px
            },
            lg: {
                width: '62rem' // 992px
            },
            xl: {
                width: '75rem' // 1200px
            }
        }
    });
    cb();
});


// Watcher
gulp.task('serve', () => {
    gulp.watch('./scss/**/*.scss', gulp.series('style:dev'));
    gulp.watch('./js/**/*.js', gulp.series('js'));
});

// MAIN Task
gulp.task('dev', gulp.series(
    'clean', 'smart-grid', gulp.series(
        gulp.parallel('style:dev', 'js'), 'serve')
    )
);

gulp.task('build', gulp.series(
    'clean', 'smart-grid', gulp.parallel('style', 'js')));
