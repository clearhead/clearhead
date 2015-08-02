import gulp from 'gulp';
import babel from 'babel/register';
import babelify from 'babelify';
import through2 from 'through2';
import browserify from 'browserify';
import del from 'del';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import gulpSequence from 'gulp-sequence';
import mochaPhantomJS from 'gulp-mocha-phantomjs';

const sequence = gulpSequence.use(gulp);

gulp.task('default', sequence('lint', 'test'));

const babelConfig = {
  jsxPragma: 'jsxr',
  plugins: ['object-assign'],
};

// -- Lint ----------
gulp.task('lint', () => {
  return gulp.src([
    './*.js',
    './src/**/*.js',
    './test/**/*.js',
    '!./test/fixtures/lib/**/*.js',
  ]).pipe(eslint())
    .pipe(eslint.format());
});

// -- Test ----------
gulp.task('test', ['test:modules', 'test:browser']);

gulp.task('test:modules', () => {
  return gulp.src(['./test/*.js'])
    .pipe(mocha({
      compilers: {
        js: babel(babelConfig),
      },
    }));
});

gulp.task('test:browser', sequence(
  'test:clean-fixtures',
  'test:compile-scripts',
  'test:phantomjs'
));

gulp.task('test:clean-fixtures', () => {
  del(['./test/fixtures/lib/*.js']);
});

gulp.task('test:compile-scripts', () => {
    return gulp.src('./test/fixtures/src/*.js')
      .pipe(through2.obj((file, enc, next) => {
        browserify(file.path)
          .transform(babelify.configure(babelConfig))
          .bundle((err, res) => {
            if (err) console.log(err);
            file.contents = res;
            next(null, file);
          });
      }))
      .pipe(gulp.dest('./test/fixtures/lib/'));
});

gulp.task('test:phantomjs', () => {
  return gulp
    .src('./test/*.html')
    .pipe(mochaPhantomJS());
});
