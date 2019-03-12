const gulp = require('gulp');
const del = require('del');
const sourceMaps = require('gulp-sourcemaps');
const tsc = require('gulp-typescript');
const gulpMocha = require('gulp-mocha');

/**
 * Remove dist directory.
 */
gulp.task('clean', (done) => {
    return del(['dist'], done);
});

/**
 * Copy start script.
 */
gulp.task('copy', (done) => {
    return gulp.src('server/src/bin/*')
        .pipe(gulp.dest('dist/bin'));
});

/**
 * Build the server.
 */
gulp.task('build:express', () => {
    const project = tsc.createProject('server/tsconfig.json');
    const result = gulp.src('server/src/**/*.ts')
        .pipe(sourceMaps.init())
        .pipe(project());
    return result.js
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/server'));
});

/**
 * Build the project.
 */
gulp.task('default', gulp.series('clean', 'copy', 'build:express'));