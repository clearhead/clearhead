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
import shell from 'gulp-shell';
import pkg from './package.json';
import dateFormat from 'dateFormat';

const sequence = gulpSequence.use(gulp);

gulp.task('default', sequence('lint', 'test'));

const babelConfig = {
  jsxPragma: 'jsxr',
  plugins: ['object-assign'],
};

// -- Lint ----------
gulp.task('lint', () => {
  return gulp.src([
    './**/*.js',
    '!./node_modules/**/*.js',
    '!./test/fixtures/lib/*.js',
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

// -- Package ----------
gulp.task('package', sequence('package:build', 'package:distribute'));

gulp.task('package:build', shell.task([
  'babel -d temp/ src/ && cp package.json temp/',
  'cd temp/ && npm pack && cd ..',
]));

gulp.task('package:distribute', shell.task([
  `mv -f temp/${ pkg.name }-${ pkg.version }.tgz dist/${ pkg.name }.tgz`,
  'rm -rf ./temp/',
  `git add dist/ && git commit -m 'package distro ${ dateFormat(Date.now(), 'isoDateTime') }'`,
]));
